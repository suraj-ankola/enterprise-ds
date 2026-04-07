# Security Audit — enterprise-ds

**Date:** 2026-04-07
**Scope:** `src/` — React + TypeScript component library (client-side only)
**Overall Risk Level:** Low (post-fix)

---

## Summary

This is a UI component library with a small attack surface. No backend calls, no auth flows, no token handling. The audit found two categories of real issues: unsanitized `href` props that could accept `javascript:` or `data:` URLs, and one unsanitized link insertion in the RichTextEditor. Both have been fixed. The `innerHTML` and `dangerouslySetInnerHTML` usages were reviewed and assessed as low-risk in context.

---

## Issues Found

### [MEDIUM] href injection — unsanitized user-controlled hrefs
**Files affected:**
- `src/components/ui/Breadcrumb.tsx` — `href={item.href}`
- `src/components/ui/NotificationsCenter.tsx` — `href={notification.action.href}`
- `src/components/ui/Timeline.tsx` — `href={viewAllHref}`
- `src/components/marketing/Footer.tsx` — `href={s.href}`, `href={link.href}`
- `src/components/marketing/MarketingNav.tsx` — `href={item.href}`, `href={child.href}` (desktop + mobile, 4 callsites)

**Risk:** If a caller passes a `javascript:alert(1)` or `data:text/html,...` string as an href prop, the browser will execute it when the user clicks the link. In a component library this is an indirect risk (the caller controls the data), but the library should not be a passive conduit for this class of attack.

**Status: FIXED** — see "Issues Fixed" below.

---

### [MEDIUM] RichTextEditor — unsanitized user URL passed to execCommand
**File:** `src/components/ui/RichTextEditor.tsx`

**Details:** The `insertLink(url)` function accepted the user-typed URL from the `LinkDialog` input and passed it directly to `document.execCommand('createLink', false, url)` without sanitization. A user could type `javascript:alert(document.cookie)` into the link input, producing a clickable `javascript:` anchor in the editor output (and in any downstream HTML that persists the editor value).

**Status: FIXED** — see "Issues Fixed" below.

---

### [LOW / INFO] RichTextEditor — innerHTML initialization with caller-supplied HTML
**File:** `src/components/ui/RichTextEditor.tsx`, line ~179

**Details:** `el.innerHTML = value` is used once on mount to seed the contentEditable with the `value` prop. This means the caller can inject arbitrary HTML into the editor. This is expected behavior for a rich-text editor that accepts an HTML string as its controlled value — the component's contract is to render HTML. The risk is low because: (a) only trusted application code passes the `value` prop, (b) the editor is sandboxed to user-authored content within the app, and (c) no server-fetched untrusted HTML flows through this path in a design system context.

**Recommendation:** Document in the component's JSDoc that `value` is expected to be sanitized by the caller before being passed in (e.g., via DOMPurify) if the content originates from untrusted sources (e.g., user-submitted data loaded from a database).

**Status: No code change made** — acceptable within a design system; caller responsibility to sanitize.

---

### [LOW / INFO] CodeBlock — dangerouslySetInnerHTML with highlight.js output
**File:** `src/components/ui/CodeBlock.tsx`, line ~219

**Details:** `dangerouslySetInnerHTML={{ __html: hljs.highlight(line, ...).value }}` is used in line-numbers mode to render syntax-highlighted code. The input to `hljs.highlight` is the `code` prop (a string of source code). highlight.js escapes HTML entities in its output, so this is not a meaningful XSS vector in practice. The risk would only arise if highlight.js itself had an output-encoding bug.

**Status: No code change needed** — safe by design.

---

### [INFO] Event handler callback props
Several components accept callback props (`onClick`, `onChange`, `onConfirm`, etc.). These are normal React patterns and do not constitute an injection risk — callbacks are bound at call-site by trusted application code, not derived from user input.

---

### [INFO] src= on img/video elements
- `src/components/ui/Avatar.tsx` — `src={src}` on `<img>`
- `src/components/ui/VideoPlayer.tsx` — `src={src}` on `<video>`
- `src/components/ui/UserManagementPage.tsx` — `src={avatar}` on `<img>`

These do not pose a meaningful XSS risk. `<img src="javascript:...">` does not execute JavaScript in any modern browser. The only concern would be SSRF-style tracking pixels, which is out of scope for a client-side component library.

---

### [INFO] Prototype pollution
No `Object.assign({}, userInput)` patterns found anywhere in `src/`. All prop spreading is from TypeScript-typed interfaces, not arbitrary user-controlled objects. No risk found.

---

### [INFO] Sensitive data in stories
A Storybook story in `Input.stories.tsx` uses `defaultValue: 'sk-live-abc123xyz'` as a placeholder to demo a read-only API key input. This is an obviously fake value — not a real secret. No real API keys, passwords, tokens, or credentials were found in any story files.

---

## Issues Fixed

### sanitizeHref helper added to 6 files

A `sanitizeHref(href: string): string` helper was added to and applied in:

| File | Callsites patched |
|------|-------------------|
| `src/components/ui/Breadcrumb.tsx` | 1 |
| `src/components/ui/NotificationsCenter.tsx` | 1 |
| `src/components/ui/Timeline.tsx` | 1 |
| `src/components/marketing/Footer.tsx` | 2 |
| `src/components/marketing/MarketingNav.tsx` | 4 |
| `src/components/ui/RichTextEditor.tsx` | 1 (insertLink) |

The helper implementation:

```ts
function sanitizeHref(href: string): string {
  if (/^(javascript|data):/i.test(href.trim())) return '#';
  return href;
}
```

This blocks `javascript:` and `data:` URL schemes (both case-insensitive, both trimmed for leading whitespace bypass). All other URLs (http, https, mailto, relative paths, anchors) pass through unchanged.

---

## npm audit

The `npm audit` command could not be executed in this environment (permission denied). Run manually:

```sh
cd /Users/surajnaik/Documents/dev-workspace/Projects/enterprise-ds
npm audit --audit-level=high
```

Key dependencies to watch: `highlight.js` (used in CodeBlock) — verify it is up to date, as older versions had ReDoS vulnerabilities.

---

## Remaining Recommendations

1. **RichTextEditor `value` prop** — Add a JSDoc note that callers must sanitize HTML content from untrusted sources (e.g., with DOMPurify) before passing it as `value`.
2. **npm audit** — Run manually and address any high/critical findings.
3. **Content Security Policy** — When this library is deployed in a host application, configure a CSP that blocks `javascript:` navigation and inline script execution as a defense-in-depth measure.
