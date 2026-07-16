# CISO Open Mic legacy site content

Archived on July 16, 2026, before `index2.html` was unpublished.

This document preserves the substantive content and useful implementation references from the legacy pages:

- `public/index2.html` — unpublished in July 2026
- `public/howitworks.html`
- `public/sponsor.html`
- `public/crew.html`

> Historical-content warning: Event dates, registration links, sponsorship pricing, benefits, contact-sharing language, team roles and city lists below reflect the old site. They should be reviewed before reuse and do not represent current commitments or policy.

## Site identity

**Name:** CISO Open Mic

**Tagline:** A forum for CISOs and security leaders to share, connect, and learn.

**Legacy navigation:** Home, Events, How It Works, Sponsor, Crew.

The legacy pages supported light and dark themes and changed to a collapsed menu on smaller screens.

## Events and registration

### Event calendar

The old home page embedded a Lu.ma calendar in list view with search disabled.

- Calendar: [View all events on Lu.ma](https://lu.ma/cal-hw6M9gTyUBMNupW)
- Calendar ID: `cal-hw6M9gTyUBMNupW`
- Legacy embed URL: `https://lu.ma/embed/calendar/cal-hw6M9gTyUBMNupW/events`
- Fallback copy: “If the calendar doesn’t load, you can open it on Lu.ma.”

The old implementation loaded `https://embed.lu.ma/calendar.js` and displayed an iframe fallback when the calendar script did not render an iframe after two seconds.

### Historical featured event

**Toronto CISO Open Mic**

- Date: October 14, 2025
- Time: 5:00–8:00 PM ET
- Venue: The National Club, Toronto
- Lu.ma event: [Legacy event registration](https://lu.ma/event/evt-tYYm8prjk6J5TjD)
- Event ID: `evt-tYYm8prjk6J5TjD`

Highlights:

- Networking with CISOs and security leaders
- Interactive Open Mic format
- Drinks and light dinner provided

## How CISO Open Mic works

### What this is

Join us for an exclusive evening designed for Canada’s top security leaders.

Like all of our other events, there are no sales pitches, no moderators, and no endless slide decks. Instead, it’s an open space where CISOs and senior security leaders can connect, share insights, and speak freely.

### What to expect

- Exclusive networking with peers at one of Toronto’s premier private clubs
- Drinks and hors d’oeuvres in a relaxed setting
- Open mic sessions and prizes designed to spark real conversations

Attendance is limited to senior security leaders from established organizations. Guests complete a registration form and receive a confirmation when approved. Others may be placed on a waitlist due to limited availability.

### The five-step event format

1. **Register:** Reserve your spot and, if you’d like, submit a topic to take the mic.
2. **Attend:** Join leading security voices at the event venue.
3. **Share or listen:** Step up to the mic for a five-minute talk, or simply listen and learn from your peers.
4. **Connect:** Network with fellow CISOs and senior security leaders, exchange ideas, and strengthen your professional circle.
5. **Recognition and prizes:** Compete for prizes and gain peer recognition in a collaborative, high-impact environment.

The legacy Step 2 specifically referenced the October 14, 2025 event at The National Club in Toronto.

### Photography and video notice

Photos and videos may be taken during an event for promotional and documentation purposes. By attending, guests consent to the use of their image and likeness in such materials.

Guests who do not wish to be photographed or recorded should inform event staff upon arrival so the team can accommodate the request.

## Sponsorship

### About the series

CISO Open Mic is a trusted forum for senior security leaders. There are no sales pitches, no moderators, and no slide decks—just candid perspectives from CISOs and security executives in an intimate setting.

- Audience: 30–50 senior cybersecurity leaders at Director level or above
- Format: networking, hors d’oeuvres, open mic talks, and recognition
- Venues: premium private clubs, such as The National Club in Toronto
- Limited sponsors per event to preserve quality and access

### Historical national sponsorship package

> The amounts and terms in this section are archived from the old page and require commercial and privacy review before reuse.

- List price: **$15,000 CAD**
- Historical preferred-sponsor price: **$14,000 CAD**
- Commitment: Sponsor four events in Canadian cities
- Cities named on the old page: Toronto, Calgary, Montreal, Vancouver, Ottawa, and Halifax

#### Historical benefits

- Opening remarks at each sponsored event by the sponsor’s Field CISO or CTO
- Recognition across events, the website, and social channels
- Ability to select sponsored award categories
- Logo placement at the entrance, on banners, and on stage screens
- Acknowledgement in opening and closing notes and communications
- Present one award at each event
- Attendee contact information provided within five business days
- Priority access to a sponsor lounge, pre-event dinners, and early invitations

The attendee-information benefit must not be reused without confirming current consent language, privacy policy, event registration disclosures, and applicable legal requirements.

#### Historical enhancements and add-ons per event

- Additional event: **$3,500**
- Additional attendee, space permitting: **$1,500**
- Exclusive 45-minute VIP lounge: **$1,500**
- Pre-event VIP dinner, venue dependent: **$2,500**

### Sponsorship contact

The legacy pages used `info@cisocollaboration.ca` with these email subjects:

- `National Sponsorship Inquiry`
- `Sponsorship Enhancements`
- `Sponsor CISO Open Mic`

Legacy closing copy:

> We’ll tailor the experience to your goals while preserving the integrity of the community. Let’s discuss where you can add the most value.

## Crew

Legacy introduction:

> The CISO Open Mic crew is made up of passionate security leaders, organizers, and supporters who make these events possible.

| Name | Legacy role | Image asset |
| --- | --- | --- |
| Brent Thomas | Founder & Host | `public/assets/crew1.jpg` |
| Alex Poizner | Co-Founder | `public/assets/crew2.jpg` |
| Vlad Babiuk | Advisor | `public/assets/crew3.jpg` |
| Dimitra K | Advisor | `public/assets/crew4.jpg` |

The legacy profile links were placeholders (`#`) and did not point to external biographies or social profiles.

## Sponsors section on the old home page

The legacy home page displayed three unnamed placeholder sponsor images:

- `public/assets/sponsor1.png`
- `public/assets/sponsor2.png`
- `public/assets/sponsor3.png`

Current and past sponsor names and logos are now maintained on the dedicated Sponsors page rather than in these placeholders.

## Legacy newsletter copy

**Heading:** Join Our Newsletter

**Description:** Get invites, recaps, and city announcements — powered by our Lu.ma calendar.

The legacy signup sent visitors to the Lu.ma calendar and explained:

> Subscribing adds you to our Lu.ma mailing list. You’ll get event invites and newsletters directly from us.

The current site now uses its own consent-based newsletter form and delivery workflow, so this Lu.ma signup copy is retained only for reference.

## Implementation references worth preserving

- Lu.ma calendar integration with a visible fallback link and a no-JavaScript fallback
- Lu.ma checkout-button integration for individual event registration
- Light/dark theme support
- Mobile navigation with an accessible `aria-expanded` state
- Clear eligibility and waitlist language
- Five-step explanation of the event experience
- Photography and video notice
- Sponsor-capacity language intended to preserve event quality and community access

