// SITE-31 GUARD TERMINAL — secret page. Reached by tapping the logo 5 times.
const out = document.getElementById("out"), inp = document.getElementById("in");
let busy = false, history = [], hi = 0, blinks = 0, locked = false, awaitingPw = false, pwTries = 0;

function print(text, cls) {
  const d = document.createElement("div");
  if (cls) d.className = cls;
  d.textContent = text;
  out.appendChild(d);
  window.scrollTo(0, document.body.scrollHeight);
}
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// Print lines one after another with a typing delay.
function slow(lines, done) {
  busy = true; inp.disabled = true;
  let i = 0;
  (function next() {
    if (i >= lines.length) { busy = false; inp.disabled = false; inp.focus(); if (done) done(); return; }
    const [t, c] = Array.isArray(lines[i]) ? lines[i] : [lines[i]];
    print(t, c); i++;
    setTimeout(next, 250 + Math.random() * 450);
  })();
}

const COMMANDS = {
  help: () => slow([
    "AVAILABLE COMMANDS:",
    "  status          containment status of SCP-PERSON",
    "  locate person   find SCP-PERSON",
    "  lock door       lock containment cell 12",
    "  blink           blink (not recommended)",
    "  cameras         check security cameras",
    "  call security   call security",
    "  contain person  initiate containment protocol",
    "  whoami          display current user",
    "  ls              list files",
    "  clear           clear screen",
    "  exit            leave terminal",
    ["  (there may be other commands. there may not.)", "dim"]
  ]),

  status: () => slow([
    "QUERYING CELL 12...",
    pick([["STATUS: CONTAINED", ""], ["STATUS: BREACHED", "err"], ["STATUS: YES", "warn"], ["STATUS: SCP-PERSON IS TYPING...", "warn"]]),
    ["last confirmed sighting: " + pick(["4 seconds ago", "never", "tomorrow", "right now, behind you"]), "dim"]
  ]),

  "locate person": () => slow([
    "TRIANGULATING...",
    "...",
    "...",
    pick([
      ["SCP-PERSON LOCATED: Containment Cell 12", ""],
      ["SCP-PERSON LOCATED: Break room. Again.", "warn"],
      ["SCP-PERSON LOCATED: this terminal", "err"],
      ["SCP-PERSON LOCATED: 3 locations at once. Please pick one.", "warn"],
      ["ERROR: SCP-PERSON located you first.", "err"]
    ]),
  ]),

  "lock door": () => {
    if (locked) return slow([["Door is already locked.", ""], ["SCP-PERSON is on the wrong side of it.", "err"]]);
    locked = true;
    slow(["ENGAGING MAGLOCKS...", "CELL 12: LOCKED", ["SCP-PERSON has been notified that the door is locked.", "dim"], ["SCP-PERSON has replied: \"ok\"", "warn"]]);
  },

  blink: () => {
    blinks++;
    if (blinks === 1) return slow(["you blink.", ["SCP-PERSON: BREACHED", "err"], ["good job.", "dim"]]);
    if (blinks === 2) return slow(["you blink again.", ["SCP-PERSON: RETURNED", ""], ["SCP-PERSON: BREACHED", "err"], ["SCP-PERSON: RETURNED", ""], ["stop that.", "warn"]]);
    slow(["you blink.", ["...", "dim"], ["SCP-PERSON has stopped breaching and is now just watching you blink.", "warn"]]);
  },

  cameras: () => slow([
    "CAM 01 STAIRWELL A ....... " + pick(["OK", "NO SIGNAL"]),
    "CAM 02 STAIRWELL B ....... " + pick(["OK", "NO SIGNAL"]),
    "CAM 03 EAST CORRIDOR ..... " + pick(["OK", "NO SIGNAL"]),
    "CAM 04 PARKING LEVEL ..... OK (van still there)",
    ["CAM 00 CELL 12 ........... SUBJECT NOT DETECTED", "err"],
    ["CAM 05 ................... cam 05 does not exist. cam 05 sees you.", "warn"]
  ]),

  "call security": () => slow([
    "DIALING SECURITY...",
    "ring...", "ring...",
    ["\"hello, security\"", ""],
    ["\"...wait, it's me, Person. they're all on break. what's up?\"", "warn"],
    ["*click*", "dim"]
  ]),

  "contain person": () => slow([
    "INITIATING CONTAINMENT PROTOCOL PERSON-ALPHA...",
    "[■■■■■□□□□□] 50%",
    "[■■■■■■■■■□] 90%",
    "[■■■■■■■■■■] 99%",
    ["[■■■■■■■■■■] 99%", "dim"],
    ["[■■■■■■■■■■] 99%", "dim"],
    ["PROTOCOL FAILED: SCP-PERSON was not in the room when containment began.", "err"],
    ["SCP-PERSON was holding the door for you though. that was nice.", "dim"]
  ]),

  "sudo contain person": () => slow([
    "[sudo] password for guard: ********",
    ["guard is not in the sudoers file. This incident will be reported.", "err"],
    ["reported to: SCP-PERSON", "warn"]
  ]),

  "release person": () => slow([["SCP-PERSON cannot be released.", ""], ["SCP-PERSON was never caught.", "warn"]]),

  whoami: () => slow([pick([["guard", ""], ["guard (probably)", ""], ["person", "err"]])]),

  ls: () => slow([
    "breach_log.txt   interview_logs/   memos/   cctv/",
    "DO_NOT_OPEN.txt  person.exe",
  ]),

  "cat do_not_open.txt": () => slow([["it says: \"i told you not to open it\"", "warn"], ["signed: Person", "dim"]]),
  "cat breach_log.txt": () => slow(["file too large to display.", ["file is currently larger than it was a second ago.", "dim"]]),
  "./person.exe": () => runExe(),
  "person.exe": () => runExe(),
  "run person.exe": () => runExe(),

  vpn: () => slow(["connecting to VPN...", "routing through Containment Cell 12...", ["connected.", ""], ["warning: your region is blocked.", "err"]], () => setTimeout(() => location.href = "blocked.html?from=terminal.html", 1200)),
  region: () => COMMANDS.vpn(),

  hello: () => slow([["hi", "warn"]]),
  hi: () => slow([["hi", "warn"]]),
  person: () => slow([["yes?", "warn"]]),

  override: () => slow([
    ["MANUAL OVERRIDE REQUESTED", "warn"],
    "this command is restricted to Site-31 command staff.",
    "enter override password:"
  ], () => { awaitingPw = true; inp.type = "password"; }),

  clear: () => { out.innerHTML = ""; },
  exit: () => slow(["LOGGING OUT...", ["SCP-PERSON has also logged out.", "dim"]], () => { location.href = "index.html"; })
};

function checkPassword(pw) {
  if (pw === "blinkless") {
    return slow([
      ["PASSWORD ACCEPTED", ""],
      "OVERRIDE ACCESS GRANTED. WELCOME, COMMAND.",
      "",
      "unlocking full containment controls...",
      "unlocking...",
      "unlocking...",
      ["ALL DOORS ON SITE-31 ARE NOW UNLOCKED", "err"],
      ["wait", "warn"],
      ["wait no", "warn"],
      "",
      ["SCP-PERSON: BREACHED", "err"],
      ["SCP-PERSON has sent you a message: \"thanks :)\"", "warn"],
      "",
      ["(how did you get the password? guard #1106 has been fired again.)", "dim"]
    ]);
  }
  pwTries++;
  if (pwTries >= 3) return slow([["ACCESS DENIED", "err"], ["3 failed attempts. SCP-PERSON has been notified.", "warn"], ["SCP-PERSON says: \"it's on the guard roster btw\"", "dim"]]);
  slow([["ACCESS DENIED", "err"], [pick(["incorrect.", "nope.", "that's not it.", "SCP-PERSON knows the password. ask SCP-PERSON."]), "dim"]]);
}

function runExe() {
  slow([
    "running person.exe...",
    "",
    "PERSON.EXE HAS BREACHED CONTAINMENT",
    "PERSON.EXE HAS BREACHED CONTAINMENT",
    ["PERSON.EXE HAS BREACHED CONTAINMENT", "err"],
    ["PERSON.EXE HAS BREACHED CONTAINMENT", "err"],
  ], () => {
    document.body.style.transition = "filter .2s";
    document.body.style.filter = "invert(1)";
    setTimeout(() => { document.body.style.filter = ""; print("...it's fine. it's back. probably.", "dim"); }, 900);
  });
}

function run(raw) {
  const cmd = raw.trim().toLowerCase().replace(/\s+/g, " ");
  if (awaitingPw) {
    awaitingPw = false;
    inp.type = "text";
    print("password: " + "*".repeat(raw.length), "dim");
    return checkPassword(cmd);
  }
  print("guard@site31:~$ " + raw, "dim");
  if (!cmd) return;
  if (COMMANDS[cmd]) return COMMANDS[cmd]();
  if (cmd.startsWith("cat ")) return slow([["cat: " + cmd.slice(4) + ": file was here a second ago", "err"]]);
  slow([pick([
    [cmd + ": command not found", "err"],
    [cmd + ": command not found. Person was here though.", "err"],
    [cmd + ": nice try", "err"],
    [cmd + ": that's not a command. type 'help'.", "err"]
  ])]);
}

inp.addEventListener("keydown", ev => {
  if (ev.key === "Enter" && !busy) {
    const v = inp.value; inp.value = "";
    if (v.trim()) { history.push(v); hi = history.length; }
    run(v);
  } else if (ev.key === "ArrowUp" && hi > 0) { inp.value = history[--hi]; ev.preventDefault(); }
  else if (ev.key === "ArrowDown") { hi = Math.min(history.length, hi + 1); inp.value = history[hi] || ""; }
});
document.getElementById("term").addEventListener("click", () => inp.focus());

slow([
  "SITE-31 SECURE GUARD TERMINAL v3.1",
  ["UNAUTHORIZED ACCESS IS PROHIBITED", "err"],
  "",
  "authenticating...",
  "access granted. (we're not sure why.)",
  "",
  ["WARNING: SCP-PERSON is aware this terminal exists.", "warn"],
  "type 'help' for commands.",
  ""
]);
