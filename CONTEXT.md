# CONTEXT.md — Alex Rivera Studio

## Milestone: Your Company's Public Website

This document is the source of truth for the Alex Rivera studio website. The
landing page and enquiry form must use the company identity, field names, and
domain values below.

## Company

Alex Rivera is a Miami-based contemporary visual artist specializing in modern
abstract painting, acrylic and mixed-media work, and digital or physical
installations. The studio works with private collectors, designers, cultural
spaces, and exhibition partners.

The public website must present Alex's work, explain the studio's commission
and installation services, and capture qualified enquiries. It must be
responsive, accessible, SEO-friendly, and styled with Tailwind CSS utilities.

## Landing page requirements

Use the following sections:

- Header with navigation links to About, Selected work, and Contact.
- Hero describing Alex as a contemporary abstract artist based in Miami.
- About section explaining the studio's acrylic, mixed-media, and installation
  practice.
- Selected work or studio benefits section.
- Contact call to action linking to `application.html`.
- Footer with the studio email `studio@alexrivera.art` and Miami, Florida.

Include Schema.org JSON-LD for Alex as a `Person` with the name
`Alex Rivera`, job title `Visual Artist`, and a description of the practice.

## Enquiry form contract

The form is an enquiry form with `id="application-form"`. The following
controls and names are required:

| Label | `id` and `name` | Type | Required |
| --- | --- | --- | --- |
| Full name | `full_name` | text | Yes |
| Email address | `email` | email | Yes |
| Phone number | `phone` | tel | No |
| Project type | `project_type` | select | Yes |
| Estimated budget (USD) | `budget` | select | Yes |
| Ideal completion date | `completion_date` | date | No |
| Project details | `project_details` | textarea | Yes |
| Consent to respond | `consent` | checkbox | Yes |

Allowed `project_type` values are:

- `original-artwork`
- `private-commission`
- `installation`
- `exhibition`

Allowed `budget` values are:

- `under-2500`
- `2500-5000`
- `5000-10000`
- `over-10000`

## Validation rules

- Full name, email, project type, budget, project details, and consent are
  required.
- Email must be a valid email address.
- If supplied, phone must contain 7–20 digits, spaces, parentheses, a plus
  sign, or hyphens.
- Project type and budget must use one of the allowed values above.
- Completion date is optional, but when supplied it must be today or a future
  date.
- Project details must contain at least 20 characters.
- Every invalid control must expose a clear error message and
  `aria-invalid="true"`. The form must not submit until all rules pass.
- On valid submission, show an accessible confirmation message; no backend
  connection is required for this milestone.
