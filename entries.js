// ============================================================
//  PERSON WIKI — all documents about SCP-PERSON
//  To add a new page, copy a block and edit it.
//  [[text]]  = black redaction bar (hover to reveal)
//  ████      = permanent redaction
//  Section types: { heading, body }  or  { heading, table: { cols: [...], rows: [[...], ...] } }
//  Add  collapsed: true  to a section to make it a click-to-open box.
// ============================================================

const DOCS = [
  {
    id: "main",
    nav: "SCP-PERSON",
    title: "SCP-PERSON",
    item: "SCP-PERSON",
    commonName: "\"Person\"",
    objectClass: "Person?",
    facility: "Site-31",
    clearance: 1,
    rating: 999,
    photo: "",
    photoCaption: "SCP-PERSON's containment cell. SCP-PERSON is not in it. SCP-PERSON was in it when this photo was taken.",
    sections: [
      { heading: "Special Containment Procedures:", body: `SCP-PERSON is to be kept in a standard humanoid containment cell at Site-31. A minimum of three (3) guards must maintain direct visual contact with SCP-PERSON at all times. Guards are to blink in shifts. Guards are not to blink at the same time. Guards are ideally not to blink at all.

The cell door is to remain locked. This has never once mattered.

All Site-31 security cameras are to point at SCP-PERSON's cell. See Security Feeds for why this has not helped.

In the event of a breach (see Breach Log), personnel are to check the break room, the vending machines, other SCPs' cells, and the group chat, in that order.` },
      { heading: "Description:", body: `SCP-PERSON is a humanoid entity known online by the alias "Person." SCP-PERSON appears, behaves and speaks as an ordinary human in every measurable way, which researchers have described as "the most suspicious part."

SCP-PERSON will randomly breach containment. Researchers genuinely do not know how. Every guard on record describes the event the same way: "I just blinked and poof, gone."

No breach has ever been caught on camera. Footage from every breach shows SCP-PERSON in the cell on one frame and an empty cell on the next. On [[four (4)]] occasions the following frame also showed SCP-PERSON waving.` },
      { heading: "Known Anomalous Properties:", body: `• Spontaneous containment breach (see Breach Log, all of it)
• Appears in group photos SCP-PERSON was not present for
• Is always typing in the group chat at 3:00 AM, but never sends anything
• Knows about lore that has not been written yet
• Wi-Fi in SCP-PERSON's cell works better than anywhere else on Site-31. Nobody installed a router.
• Cannot be found when actively searched for. Appears immediately once the search is called off.` },
      { heading: "Addendum PERSON-1: Reclassification Request", collapsed: true, body: `Dr. ██████ has requested that SCP-PERSON's object class be changed from Keter to "Person," on the grounds that "no existing class describes this."

Request denied. Request then found approved, signed by SCP-PERSON. SCP-PERSON's object class has since been changed to "Person?". Nobody remembers approving this. The question mark was added by SCP-PERSON.

Investigation ongoing.` }
    ]
  },

  {
    id: "breaches",
    nav: "Breach Log",
    title: "SCP-PERSON Containment Breach Log",
    clearance: 2,
    rating: 412,
    sections: [
      { heading: "", body: `The following is a partial log of SCP-PERSON containment breaches. The full log is [[too long to load]]. Breaches are numbered in the order they were noticed, which is not the order they happened.` },
      { heading: "Log", table: {
        cols: ["#", "Duration", "Found At", "Notes"],
        rows: [
          ["001", "4 min", "Break room", "Holding 14 bags of chips. Vending machine was not opened."],
          ["002", "2 hrs", "Own cell", "Claims to have \"never left.\" Cell had been empty for two hours. Cell had a new rug."],
          ["004", "40 min", "SCP-████'s cell", "\"Visiting.\" SCP-████ appeared happy about this, which is concerning."],
          ["007", "3 days", "Unknown", "Returned voluntarily with a souvenir keychain from a city with no record of existing."],
          ["011", "0 sec", "Own cell", "Breached and returned in the same instant. Guards only knew because SCP-PERSON said \"I'm back.\""],
          ["013", "1 hr", "The Site Director's chair", "Was in a meeting. Contributed. Ideas were good."],
          ["019", "25 min", "Conference Room B", "Breached during the meeting about how to stop breaches. Took notes."],
          ["023", "████", "[[Everywhere]]", "Do not ask about Breach 023."],
          ["031", "6 min", "Directly behind the guard", "Guard had not blinked. Guard swears on everything they did not blink."]
        ]
      }}
    ]
  },

  {
    id: "interviews",
    nav: "Interview Logs",
    title: "SCP-PERSON Interview Logs",
    clearance: 2,
    rating: 388,
    sections: [
      { heading: "Interview PERSON-01", body: `Interviewer: Dr. ██████

Dr. ██████: How do you keep getting out?
SCP-PERSON: Out of what?
Dr. ██████: Your cell.
SCP-PERSON: Oh. I don't know, I just kind of go.
Dr. ██████: Go where?
SCP-PERSON: Places.

<End Log>` },
      { heading: "Interview PERSON-03", collapsed: true, body: `Interviewer: Dr. ██████

Dr. ██████ turned away from SCP-PERSON for approximately two seconds to write a note. When Dr. ██████ turned back, SCP-PERSON was gone.

The recording continues for 41 minutes of an empty chair. At 41:12, SCP-PERSON's voice is heard from behind the camera: "You spelled 'containment' wrong."

Dr. ██████ had spelled containment wrong.

<End Log>` },
      { heading: "Interview PERSON-07", collapsed: true, body: `Interviewer: Agent ████

Agent ████: Are you going to breach containment during this interview?
SCP-PERSON: No.
Agent ████: Promise?
SCP-PERSON: Promise.

[SCP-PERSON remains for the full interview, then is found to have also been in the cafeteria the entire time.]

<End Log>` }
    ]
  },

  {
    id: "tests",
    nav: "Test Logs",
    title: "SCP-PERSON Experiment Logs",
    clearance: 3,
    rating: 301,
    sections: [
      { heading: "Test PERSON-A", body: `Procedure: SCP-PERSON placed in a sealed concrete room with no doors, windows or vents.
Result: Breach after 4 minutes.
Notes: The room was later found to have a door. Nobody built a door.` },
      { heading: "Test PERSON-B", body: `Procedure: Guard given eye drops and instructed not to blink under any circumstances.
Result: Guard did not blink. Guard sneezed. Breach.` },
      { heading: "Test PERSON-C", body: `Procedure: Researcher asked SCP-PERSON, politely, to please stay.
Result: SCP-PERSON stayed for six (6) days, the longest continuous containment on record.
Notes: Test discontinued after SCP-PERSON asked "are we cool?" and the researcher said "yeah" and looked away.` },
      { heading: "Test PERSON-D", collapsed: true, body: `Procedure: SCP-PERSON handcuffed to a second, larger SCP-PERSON-proof SCP.
Result: [[Both are now missing.]]` }
    ]
  },

  {
    id: "hearsay",
    nav: "Staff Hearsay",
    title: "Things Staff Have Said About SCP-PERSON",
    clearance: 1,
    rating: 520,
    sections: [
      { heading: "", body: `Collected from break room conversations, the group chat, and one sticky note.` },
      { heading: "Quotes", body: `"Person would randomly breach containment. Genuinely do not know how. Just blinked and poof, gone." — Guard, Site-31

"I've stopped writing incident reports. I just write 'Person' and everyone knows." — Security Chief ████

"Is Person in containment right now?" "Define 'in.'" — Overheard, cafeteria

"I locked the door, turned around, and Person was holding the key. I never had a key." — Agent ████

"Honestly, kind of a vibe." — [[the Site Director]]

"brb" — Sticky note found on SCP-PERSON's empty cell door` }
    ]
  },

  {
    id: "memos",
    nav: "Memos",
    title: "Internal Memos Regarding SCP-PERSON",
    clearance: 4,
    rating: 275,
    sections: [
      { heading: "Memo from O5-██", body: `To all staff: Please stop asking SCP-PERSON to "just pop in" to other departments. We know it works. That is the problem.` },
      { heading: "Memo from the Site Director", body: `We have spent $██ million on SCP-PERSON's containment cell this year. SCP-PERSON was found this morning in the break room using the microwave. It was SCP-PERSON's own food. It was labeled. SCP-PERSON is more respectful of the break room fridge than most of you. Take note.` },
      { heading: "Memo from HR", collapsed: true, body: `SCP-PERSON is not an employee and cannot be put on the schedule, no matter how often SCP-PERSON shows up to shifts. SCP-PERSON has been given Employee of the Month regardless. We did not vote for this. The plaque was just there.` }
    ]
  }
];

// Fake "where is Person right now" locations for the sidebar.
const LOCATIONS = [
  "Containment Cell 12, Site-31", "Break room", "Vending machine (inside?)", "Group chat",
  "Directly behind you", "Conference Room B", "[DATA EXPUNGED]", "Their own cell (allegedly)",
  "The Site Director's chair", "Unknown", "Roof", "Asleep (unconfirmed)"
];
