// ============================================================
//  PERSON-WIKI ENTRIES
//  To add a new person SCP, copy one block below and edit it.
//  Wrap text in [[ ]] to make a black redaction bar (hover to reveal).
//  Write ████ for permanent redactions.
// ============================================================

const ENTRIES = [
  {
    id: "SCP-PERSON-001",
    name: "The One Who Is Always \"Five Minutes Away\"",
    objectClass: "Euclid",
    clearance: 2,
    rating: 142,
    photo: "",               // optional: put an image file name here, e.g. "img/001.jpg"
    photoCaption: "SCP-PERSON-001, photographed allegedly \"on the way.\"",
    containment: `SCP-PERSON-001 is to be told all meeting times 45 minutes earlier than the actual time. Personnel are not to ask SCP-PERSON-001 "where are you?" as this triggers the response "pulling up now," which has never once been true.

Under no circumstances should SCP-PERSON-001 be designated as the driver.`,
    description: `SCP-PERSON-001 is a human male of average height who exhibits a persistent spacetime anomaly centered on the phrase "five minutes away." When SCP-PERSON-001 states that he is five minutes away, his actual distance from the destination is measured at between 20 minutes and [[still at home, not wearing shoes]].

Attempts to track SCP-PERSON-001 via location sharing have resulted in the location being "off for battery reasons."`,
    addenda: [
      { title: "Addendum 001-A: Incident Log", body: `On ██/██/20██, SCP-PERSON-001 arrived on time. All personnel present experienced mild existential distress. The event is not believed to be repeatable.` }
    ]
  },
  {
    id: "SCP-PERSON-002",
    name: "\"I'm Not Even Hungry\"",
    objectClass: "Safe",
    clearance: 1,
    rating: 98,
    photo: "",
    photoCaption: "SCP-PERSON-002 near a plate that is not theirs.",
    containment: `SCP-PERSON-002 is to be ordered their own fries at all times, regardless of verbal confirmation that they "don't want any."

Personnel should keep their own food at a minimum distance of 1.5 meters from SCP-PERSON-002.`,
    description: `SCP-PERSON-002 is a human who claims, upon being asked, to not be hungry. Within 4–6 minutes of food arriving, SCP-PERSON-002 will begin consuming the food of nearby subjects, typically opening with the phrase "can I just have one."

Testing has confirmed SCP-PERSON-002 has never had just one.`,
    addenda: []
  },
  {
    id: "SCP-PERSON-003",
    name: "The Group Chat Ghost",
    objectClass: "Keter",
    clearance: 4,
    rating: 207,
    photo: "",
    photoCaption: "No known photograph of SCP-PERSON-003 exists. Image depicts the \"read\" receipt.",
    containment: `SCP-PERSON-003 cannot currently be contained, as SCP-PERSON-003 does not respond to messages.

All plans requiring SCP-PERSON-003's input are to be finalized without it. SCP-PERSON-003 will then appear and say "wait what's the plan."`,
    description: `SCP-PERSON-003 is a member of the group chat who has read every message since its creation and replied to [[four (4) of them]]. SCP-PERSON-003 manifests only when:

• Someone posts an embarrassing photo of another member
• A plan has already been finalized
• It is between 2:00 and 4:00 AM

During manifestation, SCP-PERSON-003 may send between 30 and 60 consecutive messages before vanishing for a period of ████ weeks.`,
    addenda: [
      { title: "Addendum 003-B: Interview Log", body: `Interviewer: Why don't you ever respond?
SCP-PERSON-003: I did respond.
Interviewer: You reacted with a thumbs up to a message asking if you were alive.
SCP-PERSON-003: Yeah.

<End Log>` }
    ]
  }
];
