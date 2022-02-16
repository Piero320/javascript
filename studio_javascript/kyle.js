const dayStart = "07:30";
const dayEnd = "17:45";
function scheduleMeeting(startTime,durationMinutes) {
let start = new String(startTime)
if (start.length== 4) {
    startTime = "0" + startTime
}
let End =   dayEnd.replace("45","0045")
let fine = startTime + durationMinutes
console.log(End>=fine&&dayStart<=startTime)
 
}
//scheduleMeeting("7:00",15); // false
//scheduleMeeting("07:15",30); // false
//scheduleMeeting("7:30",30); // true
//scheduleMeeting("11:30",60); // true
//scheduleMeeting("17:00",45); // true
 //scheduleMeeting("17:30",30); // false
//scheduleMeeting("18:00",15); // false
//scheduleMeeting("09:00",60); // false
function range(start,end=null) {

     if (end==null) {
         return r
     }
    function r(end) {
        let result = []
     for (let index = start; index < end+1; index++) {
          result.push(index)
     }
     return result
    }
return r(end)
     
    }
   // range(3,3); // [3]
   // range(3,8); // [3,4,5,6,7,8]
  //  range(3,0); // []
  //  var start3 = range(3);
  //  var start4 = range(4);
     //start3(3)); // [3]
    //start3(8); // [3,4,5,6,7,8]
    //start3(0); // []
   // start4(6); // [4,5,6
   // console.log(range(3,0))
 //  console.log(start3(3)); // [3]
  // console.log(start3(8)); // [3]
  function randMax(max) {
    return Math.trunc(1E9 * Math.random()) % max;
    }
    var reel = {
    symbols: [
    "♠", "♥", "♦", "♣", "☺", "★", "☾", "☀"
    ],
    spin() {
    if (this.position == null) {
    this.position = randMax(
    this.symbols.length - 1
    );
    }
    this.position = (
    this.position + 100 + randMax(100)
    ) % this.symbols.length;
    },
    display() {
    if (this.position == null) {
    this.position = randMax(
    this.symbols.length - 1
    );
    }
    return this.symbols[this.position];
    }
    };
  
  
  
    var slotMachine = {
    reels: [Object.create(reel),Object.create(reel),Object.create(reel)],
     
    // this slot machine needs 3 separate reels
    // hint: Object.create(..)
    
    spin() {
    this.reels.forEach(function spinReel(reel){
        reel.spin();
    });
    },
    display() {
    // TODO
    console.log(this.reels[0].display(),this.reels[1].display(),this.reels[2].display())
    }
    };
    slotMachine.spin();
    slotMachine.display();
    // ☾ | ☀ | ★
    // ☀ | ♠ | ☾
    // ♠ | ♥ | ☀
     
    