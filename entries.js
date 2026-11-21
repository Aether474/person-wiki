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
    id: "exploration",
    nav: "Exploration Log",
    title: "SCP-PERSON Exploration Log E-1",
    clearance: 3,
    rating: 466,
    sections: [
      { heading: "", body: `Exploration E-1 was authorized to determine how SCP-PERSON leaves Containment Cell 12. SCP-PERSON was confirmed to be absent at the time. Team: Agents ████, ████ and ████ (callsign "Blinkless").` },
      { heading: "Log", table: {
        cols: ["Time", "Entry"],
        rows: [
          ["00:00", "Team enters Cell 12. Cell is empty. Standard."],
          ["00:02", "Cell appears larger than the blueprints. Agent ████: \"It's just a room.\""],
          ["00:05", "Team finds a rug. No rug is on record for Cell 12."],
          ["00:09", "Team finds a door on the back wall. Door is labeled \"NOT AN EXIT.\""],
          ["00:14", "Door opens into the break room. The break room is on the other side of Site-31."],
          ["00:15", "Microwave is running. 0:03 left on the timer. Nobody is there."],
          ["00:18", "Microwave beeps. Food inside is labeled \"PERSON. DO NOT EAT.\" Team does not eat it."],
          ["00:23", "Team goes back through the door. Door now opens into Conference Room B. A meeting about breaches is in progress. SCP-PERSON is taking notes. SCP-PERSON waves."],
          ["00:24", "Agent ████ blinks."],
          ["00:24", "SCP-PERSON is gone. Agent ████ is also gone."],
          ["00:31", "Remaining team returns to Cell 12. Missing agent is sitting in Cell 12. Agent: \"Honestly it's kind of nice in here.\""],
          ["00:40", "Command orders the team out. Team cannot find the door they came in through."],
          ["00:41", "The door is opened from outside by SCP-PERSON. SCP-PERSON: \"You guys good?\""]
        ]
      }},
      { heading: "Note:", body: `Exploration E-2 has been cancelled. The E-2 team went anyway. [[They say it's nice in there.]]` }
    ]
  },

  {
    id: "two-persons",
    nav: "Incident: Two Persons",
    title: "Incident Report PERSON-12: \"The Two Persons\"",
    clearance: 3,
    rating: 433,
    sections: [
      { heading: "Summary:", body: `During the Site-31 holiday party, SCP-PERSON was confirmed to be in Containment Cell 12 (on camera, all night) and at the holiday party (in 41 photos, all night). Both were SCP-PERSON.` },
      { heading: "Details:", body: `The SCP-PERSON at the party took part in Secret Santa, won the ugly sweater contest, and was seen dancing badly near the snack table.

The SCP-PERSON in Cell 12 was seen on camera eating a slice of the holiday party cake. No cake was brought to Cell 12.

Both were interviewed at the same time, in separate rooms, by separate researchers. Both gave identical answers to every question. Both asked if they could have the other one's cake.

When both were escorted into the same room, there was only one SCP-PERSON. SCP-PERSON said "what?"` },
      { heading: "Conclusion:", body: `After a review, Site-31 command has decided not to think about it.` },
      { heading: "Addendum: Secret Santa", collapsed: true, body: `Guard ████, who drew SCP-PERSON in Secret Santa, received a keychain from the city from Breach 007, the one with no record of existing.

The keychain has a key on it. The key fits Cell 12.` }
    ]
  },

  {
    id: "roster",
    nav: "Guard Roster",
    title: "SCP-PERSON Guard Roster",
    clearance: 2,
    rating: 357,
    sections: [
      { heading: "", body: `All guards assigned to SCP-PERSON's cell since containment began. Average time on assignment: 6 days. Turnover is being looked into.` },
      { heading: "Roster", table: {
        cols: ["Guard", "Assigned", "Status", "Reason"],
        rows: [
          ["#1101", "3 days", "Transferred", "Blinked."],
          ["#1102", "11 days", "Transferred", "Saw SCP-PERSON in the mirror. The guard's own mirror. At home."],
          ["#1103", "1 day", "Transferred", "SCP-PERSON said hi."],
          ["#1104", "2 weeks", "Transferred", "SCP-PERSON remembered the guard's birthday. Nobody else did."],
          ["#1105", "4 days", "Transferred", "Asked to be moved to SCP-173 duty. \"At least that one stays put.\""],
          ["#1106", "6 days", "Fired", "Left the guard terminal override password on a sticky note on Cell 12's door. The note said: [[blinkless]]"],
          ["#1107", "9 months", "Still assigned", "Has not reported in for 9 months. Paychecks are still being cashed. By SCP-PERSON."],
          ["#1108", "0 days", "Transferred", "Was assigned, walked to Cell 12, looked in, said \"nope.\""],
          ["████", "████", "[[Is SCP-PERSON]]", "Do not ask about guard ████."]
        ]
      }}
    ]
  },

  {
    id: "person-j",
    nav: "SCP-PERSON-J",
    title: "SCP-PERSON-J",
    item: "SCP-PERSON-J",
    commonName: "\"Person (Behaving)\"",
    objectClass: "Safe",
    facility: "Site-31",
    clearance: 1,
    rating: 611,
    photo: "",
    photoCaption: "SCP-PERSON-J, in its cell, where it is supposed to be. Staff find this photo upsetting.",
    sections: [
      { heading: "Special Containment Procedures:", body: `None required. SCP-PERSON-J stays in its cell.

Staff are asked to remain calm about this.` },
      { heading: "Description:", body: `SCP-PERSON-J looks exactly like SCP-PERSON in every way. Unlike SCP-PERSON, SCP-PERSON-J:

• Stays in its containment cell
• Replies to group chat messages within two (2) minutes
• Shows up ten (10) minutes early to everything
• Has never been found in the break room
• Fills out its own incident reports, correctly, on time

Staff morale has dropped 60% since SCP-PERSON-J appeared. Multiple guards have asked for SCP-PERSON back.` },
      { heading: "Addendum PERSON-J-1:", collapsed: true, body: `After a three-week investigation, it has been confirmed that SCP-PERSON-J is SCP-PERSON doing a bit.

The bit has now lasted four weeks. Nobody knows when the bit ends. [[SCP-PERSON may not know either.]]` }
    ]
  },

  {
    id: "complaints",
    nav: "Other SCPs Complain",
    title: "Statements From Other SCPs Regarding SCP-PERSON",
    clearance: 2,
    rating: 498,
    sections: [
      { heading: "", body: `After repeated incidents involving SCP-PERSON visiting other containment cells (see Breach Log, Breach 004), statements were collected from affected SCPs. Where an SCP cannot speak, its handlers have described its feelings as accurately as possible.` },
      { heading: "SCP-173", body: `Handler statement: "173 moves when you blink. That's its whole thing. Person also disappears when you blink. 173 has been sulking in the corner for two weeks. We think it feels Person stole its gimmick."` },
      { heading: "SCP-999", body: `Handler statement: "999 loves Person, which isn't saying much, because 999 loves everyone. But it gets visibly excited whenever Person shows up, and Person shows up a lot. They have a handshake now."` },
      { heading: "SCP-682", body: `Handler statement: "682 hates everything. It hates Person the most. Person keeps visiting anyway. Last week Person brought it a birthday card. 682 destroyed the card. 682 kept the envelope."` },
      { heading: "SCP-████", collapsed: true, body: `Statement: "[[they keep moving my stuff. not in a bad way. they organized it. it's actually really nice now. please don't tell them I said that.]]"` }
    ]
  },

  {
    id: "tales",
    nav: "Tales",
    title: "SCP-PERSON Tales",
    clearance: 1,
    rating: 384,
    sections: [
      { heading: "", body: `Stories from the staff of Site-31. Most of them are true. Some of them are true twice.` },
      { heading: "A Guard's First Day", collapsed: true, body: `They tell you three things on your first day watching Cell 12: don't blink, don't look away, and don't take it personally.

I didn't blink. I used the eye drops. I stared at that cell for nine straight hours like my life depended on it, because they told me it did. The cell was empty the whole time. I didn't notice until hour eight. I'm still not sure when it became empty.

At the end of my shift, someone tapped me on the shoulder and handed me a coffee. "You were doing great," SCP-PERSON said. Then SCP-PERSON walked back into the cell and closed the door.

It was the right order, too. Oat milk, two sugars. I never told anyone that.` },
      { heading: "The Night Shift", collapsed: true, body: `3:00 AM. The group chat says "Person is typing..."

I watch it for ten minutes. Twenty. Forty. Still typing. Nobody types for forty minutes. I start to wonder what kind of message takes forty minutes.

At 3:41 it finally comes through. One word.

"hey"

I look up from my phone. SCP-PERSON is sitting at the desk across from me, holding a phone, waving.

The cell camera behind me still shows SCP-PERSON asleep in the cell.

I did not reply.` },
      { heading: "Lunch", collapsed: true, body: `The microwave in the break room beeps at 12:03 every day. Nobody sets it. There's always something inside, labeled in neat handwriting: "PERSON. DO NOT EAT."

On my last day at Site-31, the label said something different.

"for you :)"

It was really good. I still think about it.` }
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
      { heading: "Memo from IT Security", body: `Reminder: the Site-31 guard terminal is for authorized guards only. Staff are NOT to access it by tapping the Person Wiki logo five times. We have no idea who set that up.` },
      { heading: "Memo from HR", collapsed: true, body: `SCP-PERSON is not an employee and cannot be put on the schedule, no matter how often SCP-PERSON shows up to shifts. SCP-PERSON has been given Employee of the Month regardless. We did not vote for this. The plaque was just there.` }
    ]
  }
];

// Missing poster: put a photo in the img/ folder and set its path here, e.g. "img/person.jpg"
const POSTER_PHOTO = "";

// Headlines for the scrolling news ticker.
const HEADLINES = [
  "BREAKING: SCP-PERSON spotted in the break room",
  "UPDATE: SCP-PERSON not spotted in the break room",
  "UPDATE: SCP-PERSON was the one who reported the sighting",
  "Site-31 Days Since Last Breach counter reaches new record of 0",
  "Guard #1109 starts today. Guard #1109 has been told not to blink",
  "Gift shop restocks Person-Proof Door Locks. Locks have since breached containment",
  "Conference Room B meeting on breaches postponed. SCP-PERSON already took notes",
  "SCP-173 still sulking",
  "SCP-PERSON-J continues to behave. Staff remain concerned",
  "Vending machine reports missing chips. Vending machine was not opened",
  "UPDATE: SCP-PERSON was the one who wrote this ticker"
];

// Fake "where is Person right now" locations for the sidebar.
const LOCATIONS = [
  "Containment Cell 12, Site-31", "Break room", "Vending machine (inside?)", "Group chat",
  "Directly behind you", "Conference Room B", "[DATA EXPUNGED]", "Their own cell (allegedly)",
  "The Site Director's chair", "Unknown", "Roof", "Asleep (unconfirmed)"
];
