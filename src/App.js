import { useState , useEffect} from "react";
import React from "react";
import ContentBody from "./components/ContentBody";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import moment from "moment";

import { db } from "./firebase-config.js";
import { collection, getDocs } from "firebase/firestore"; 

import { doc, setDoc } from "firebase/firestore";

function App(){

    async function runOnece()  {
            var unknown = '-';
    
            // browser
            var nVer = window.navigator.appVersion;
            var nAgt = window.navigator.userAgent;
            // var browser = window.navigator.appName;
            // var version = '' + parseFloat(window.navigator.appVersion);
            // var majorVersion = parseInt(navigator.appVersion, 10);
            // var nameOffset, verOffset, ix;
    
            // Opera
            // if ((verOffset = nAgt.includes('Opera'))) {
            //     browser = 'Opera';
            //     version = nAgt.substring(verOffset + 6);
            //     if ((verOffset = nAgt.includes('Version'))) {
            //         version = nAgt.substring(verOffset + 8);
            //     }
            // }
            // // Opera Next
            // if ((verOffset = nAgt.includes('OPR')) != -1) {
            //     browser = 'Opera';
            //     version = nAgt.substring(verOffset + 4);
            // }
            // // Legacy Edge
            // else if ((verOffset = nAgt.includes('Edge')) != -1) {
            //     browser = 'Microsoft Legacy Edge';
            //     version = nAgt.substring(verOffset + 5);
            // } 
            // // Edge (Chromium)
            // else if ((verOffset = nAgt.includes('Edg')) != -1) {
            //     browser = 'Microsoft Edge';
            //     version = nAgt.substring(verOffset + 4);
            // }
            // // MSIE
            // else if ((verOffset = nAgt.includes('MSIE')) != -1) {
            //     browser = 'Microsoft Internet Explorer';
            //     version = nAgt.substring(verOffset + 5);
            // }
            // Chrome
            // else if ((verOffset = nAgt.includes('Chrome')) != -1) {
            //     browser = 'Chrome';
            //     version = nAgt.substring(verOffset + 7);
            // }
            // // Safari
            // else if ((verOffset = nAgt.includes('Safari')) != -1) {
            //     browser = 'Safari';
            //     version = nAgt.substring(verOffset + 7);
            //     if ((verOffset = nAgt.includes('Version')) != -1) {
            //         version = nAgt.substring(verOffset + 8);
            //     }
            // }
            // // Firefox
            // else if ((verOffset = nAgt.includes('Firefox')) != -1) {
            //     browser = 'Firefox';
            //     version = nAgt.substring(verOffset + 8);
            // }
            // // MSIE 11+
            // else if (nAgt.includes('Trident/') != -1) {
            //     browser = 'Microsoft Internet Explorer';
            //     version = nAgt.substring(nAgt.includes('rv:') + 3);
            // }
            // // Other browsers
            // else if ((nameOffset = nAgt.includes(' ') + 1) < (verOffset = nAgt.includes('/'))) {
            //     browser = nAgt.substring(nameOffset, verOffset);
            //     version = nAgt.substring(verOffset + 1);
            //     if (browser.toLowerCase() == browser.toUpperCase()) {
            //         browser = navigator.appName;
            //     }
            // }
            // // trim the version string
            // if ((ix = version.includes(';')) != -1) version = version.substring(0, ix);
            // if ((ix = version.includes(' ')) != -1) version = version.substring(0, ix);
            // if ((ix = version.includes(')')) != -1) version = version.substring(0, ix);
    
            // majorVersion = parseInt('' + version, 10);
            // if (isNaN(majorVersion)) {
            //     version = '' + parseFloat(navigator.appVersion);
            //     majorVersion = parseInt(navigator.appVersion, 10);
            // }
    
            // mobile version
            var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);
    
            // system
            var os = unknown;
            var clientStrings = [
                {s:'Windows 10', r:/(Windows 10.0|Windows NT 10.0)/},
                {s:'Windows 8.1', r:/(Windows 8.1|Windows NT 6.3)/},
                {s:'Windows 8', r:/(Windows 8|Windows NT 6.2)/},
                {s:'Windows 7', r:/(Windows 7|Windows NT 6.1)/},
                {s:'Windows Vista', r:/Windows NT 6.0/},
                {s:'Windows Server 2003', r:/Windows NT 5.2/},
                {s:'Windows XP', r:/(Windows NT 5.1|Windows XP)/},
                {s:'Windows 2000', r:/(Windows NT 5.0|Windows 2000)/},
                {s:'Windows ME', r:/(Win 9x 4.90|Windows ME)/},
                {s:'Windows 98', r:/(Windows 98|Win98)/},
                {s:'Windows 95', r:/(Windows 95|Win95|Windows_95)/},
                {s:'Windows NT 4.0', r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
                {s:'Windows CE', r:/Windows CE/},
                {s:'Windows 3.11', r:/Win16/},
                {s:'Android', r:/Android/},
                {s:'Open BSD', r:/OpenBSD/},
                {s:'Sun OS', r:/SunOS/},
                {s:'Chrome OS', r:/CrOS/},
                {s:'Linux', r:/(Linux|X11(?!.*CrOS))/},
                {s:'iOS', r:/(iPhone|iPad|iPod)/},
                {s:'Mac OS X', r:/Mac OS X/},
                {s:'Mac OS', r:/(Mac OS|MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
                {s:'QNX', r:/QNX/},
                {s:'UNIX', r:/UNIX/},
                {s:'BeOS', r:/BeOS/},
                {s:'OS/2', r:/OS\/2/},
                {s:'Search Bot', r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
            ];
            for (var id in clientStrings) {
                var cs = clientStrings[id];
                if (cs.r.test(nAgt)) {
                    os = cs.s;
                    break;
                }
            }
    
            var osVersion = unknown;
    
            if (/Windows/.test(os)) {
                osVersion = /Windows (.*)/.exec(os)[1];
                os = 'Windows';
            }
    
            switch (os) {
                case 'Mac OS':
                case 'Mac OS X':
                case 'Android':
                    osVersion = /(?:Android|Mac OS|Mac OS X|MacPPC|MacIntel|Mac_PowerPC|Macintosh) ([\.\_\d]+)/.exec(nAgt)[1];
                    break;
    
                case 'iOS':
                    osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
                    osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
                    break;
            }
    
        window.jscd = {
            // browser: browser,
            // browserVersion: version,
            // browserMajorVersion: majorVersion,
            mobile: mobile,
            os: os,
            osVersion: osVersion,
        };
    }
    runOnece()
    console.log(window.jscd)

    const stories = [
        {
            page: 1,
            title : "Raman Kumar",
            text :
            `
            I have written some stories. Read📖 and Enjoy🍟🍧.
            
            If you don't like any story then blame me.

            Tap the titles to read the story and it's scrollable
            
            This website is built in react with 🌹
            and
            Design is my imagination only.

            Know me more from twitter.com/KRaman1998


            `
        },
        {
            page: 2,
            title : "7 Rats in Castel",
            text : `
            There are 7 rats. 
            One Rat is very very lazy, 
            others six are active ones. 
            other rat says to this lazy rat that you eat more 
            than I bring food from the field. 

            They find a very big castle of a queen of bhopal, 
            Rani Kamlapati. The castle has plenty of food storage. 
            So rats think that why should we go to farmers' fields. 

            We will go to the castle and will enjoy food grains. 
            So, they go inside the castle and find a nice place to live. 
            And after that, they start living luxurious life.
            
            Commander informs Rani Kamlapati that 
            our food storage area is getting dirty. 
            Queen orders for investigation. 
            
            Commander finds these rats and arrests them. 
            And notice that one Rat is very lazy. 
            And tells it to the queen. After knowing that one rat is lazy. 

            Queen gives a challenge to 7 rats that in a room there are enough food grains and 
            if all 7 rats work hard they can empty the room in a certain time. 
            If failed They will get punishment or they will not return here forever.`
        }
        ,
        {
            page: 3,
            title : "Lion's Pizza",
            text : `
            A short story of Lion's family.
            Father, Mother, and their son Lio (cute lion)
            They are moving to City.
            
            Lio admits to new school "Royal Lions Academy".
            Today It's Lio first day. Her mother gives him tiffin
            
            Lio loves juicy soft rabbits so, today he got this for lunch.
            In the classroom, Teacher lioness comes and says
            "Today We will study our food
            ...
            will learn what is healthier for ourselves.
            We eat dear, good for our eyes.
            We eat zebra, good for our growth.
            ... etc "
            
            In school, there is a club which does some interesting activities and sports.
            and Lio tries to meet members of club.
            But there is a bulling Lion named Zar in school.
            
            During Lunch time,
            Lio is eating his favorite rabbits from his tiffin.
            Zar comes to Lio and threats and advise to not join that they are my rivals.
            Zar roars on face of Lio and eats away one of his rabbits in tiffin.
            
            Lio comes home not very happy.
            Mom ask Lio on dinner table "What happened in school? Did you enjoy rabbits?"
            Lio says "Everything is good. Yea, those were tasty."
His Father comes to dinner. Mom and Father serve Giraffe.
Father says "Hi, Lio eat this, How was your school today?"
Lio says "It's fine."
Next Day,
Lio goes to school
In the classroom, Teacher lioness comes and says
"Today We will study our culture
We roar every day and loud
We are Brave. That's why the Brave browser uses our face in icon. (But don't pay us royalty)
We are aggressive
... etc"
Lio joins the club as a member and now He got buddies. 
The Zar only seems to give a threatening look from a distance.
Lio comes home very happy with some special plans.
Lio come to dinner table,
Mom and dad is there, serving Camel meat.
Everyone is eating and after finishing dinner.
Lio says "Wait I have a treat for you. I have ordered three Monkey's Kidney Pizza Special from Zomato, with 30% off"
Delivery Tiger comes and knocks the door and hands over Pizzas to Lio.
Lio serves Pizza. His Father and Mother are eating slices. Lio says "Take this"
His Father says "What is this?"
Lio says "It's ketchup, mixture of animal blood. Let me apply"
Lio is putting ketchup over pizzas.
Now everyone is eating Pizza.
`
        },
        {
            page: 4,
            title : "Elon's Holiday on Mars",
            text : `
            Elon Musk tweets that “I am going to mars on a holiday”.
            Dozzy, a friend of Elon is a brand ambassador for dogecoin
            and got a Neuralink chip in its body, it can talk to people and use devices like phones.

            Dozzy has a Tesla car with a fully self-driving mode.
            Dozzy sees the elon tweet and sits in the back seat of car and drives to elon office.
            and says "Well my birthday is coming. let's do party on mars"
            Elon says "Oh Great and let's go for shopping"

            Meanwhile Jeff Bezos sees the elon tweet, he feels FOMO fear of missing out.
            He also plans to visit mars with his Blue Origin Spaceship.
            He quickly sits in his spaceship with his partner Lauren and starts to launch.
            Well, Bezos spaceship is slow, large and very heavy. Elon has best technology with light, fast spaceship.
            Elon is shopping with dozzy in physical Walmart store not using amazon .com

            He buys cake, balloons and a lot of ice-creams.
            After shopping, Elon has a remote control and he presses button and SpaceX ship lands in front of them. both elon and dozzy sits in spaceship and launch at very high speed.
            after some time and Elon's ship, moves at very high speed and comes near jeff's ship and dozzy and elon waves hand past jeff's ship.
            Elon and dozzy lands on mars, comes out and take a walk.

            Dozzy is eating ice cream and walking behind the Elon just following Elon. On some distance, there is a very wide ( around 2 to 3 km ) wide crater. It is a deep depression on a flat surface on mars. The bottom of the crater is flat.
            Elon goes to the edge of the crater and stops.
            Dozzy is entirely focused on eating icecream and does not realize where to stop and goes to very edge of the crater, Elon shouts "dozzy" but its too late dozzy fall and slides on steep parabolic slope of crater edge area to the bottom of crater.
            Elon asks "Are you okay?" (they are talking using Neuralink chip of dozzy)

            Dozzy says "yep absolutely fine, now How to climb up, it's too steep"
            Elon says "have fun and walk around and look for some way"

            Well, crater is very wide few kilometers, dozzy walks and finds a cave. Dozzy says "I found a cave but I don't know where it ends"
            Elon runs around the crater and after sometime finds a cave far from the crater. 
            
            Elon asks dozzy to bark to confirm the cave has a passage. and it does. Elon says "Hi, dozzy stay there. I also want to see crater from inside bottom. Let me come".
            Elon reaches inside the crater bottom and enjoys the view and shares ice-cream with dozzy.
            
            Now Jeff Bezos Spaceship has arrived and lands very near to the outside opening of cave from which elon has entered into cave.
            Bezos Spaceship is very heavy and large. 
            
            Due to this it brings little marsquake (earthquake) and some rocks breaks and slide to close the opening of cave.
            
            When elon and dozzy returns to cave. they finds cave is closed.`
        }
       
        ,
       
        {
            page: 5,
            title : "Elephant's Garden",
            text : `
            Vayu is a young strong and fully grown elephant.
He has a nice family Mom and Dad and siblings.
All Elephants live in the forest near a wide river.

Since childhood, he cultivated his own very large garden.
He has planted a lot of trees of Mango, Banana, and Sugarcane.
also have Coconut and other trees.
His garden is very big to have thousands of trees spreading in a larger area very near the bank of the river.
He is very possessive about his trees and
don't let other elephants or siblings enter into his large garden.

On another side of the river, other animals live.
and they cannot reach to this side of the river bank.
So, river separates both sides of the Forest area.

He spends less time with his herd of elephnats.
Vayu mostly live away from his group and spends time in garden.
He goes to the river and enjoys a good bath daily.
He then fills water in his trunk and waters his garden trees

Vayu lives a very sweet life.

On both sides of the river, there are some big very old-grown long high trees.
and branches of these trees have spread out over the water of river.
Same case on other side of river, because of this
Over the years as time spent
some branches of this side of old trees and other side of old trees
grows and now have very little distance between them.

Recently, some group of monkeys arrive on the other side of the forest to live there and make their living place.
monkeys climb on big trees on other side river and through branches
They jump to branches of this side big trees.

Now monkeys climbs Vayu's trees and eat his fruits.
Vayu comes to see his garden.
Vayu see half-eaten fruits are thrown here are there.
He gets shock and his head spins.

He tries to repel monkeys but monkeys are up in trees.
He sakes trees to fall monkeys but monkeys jump here and there.

Till evening, monkeys go away.
Vayu is very sad, super sad ... super super sad ... super super super sad ...

He figures out how these monkeys reached here.
He finds out that these old tree branches over river water helps them to cross river by jumping from other side big trees.

Now, Vayu calls his family.
His mom dad and siblings help Vayu to break the extended branches of old trees.
They break all branches.
Clean and again decorates the garden.

From onwards days, monkeys can't jump if they did they will fall into river water and flow away.

Now Vayu is again happy.
and take a bath in the river.
He is sprinkling water over him.
`
        } ,
        {
            page: 6,
            title : "Elon's Holiday on Mars 2.0",
            text : `
            Upcoming story...`
        }
    ]

    const [currentStory, setCurrentStory] = useState(stories[0])
    const [currentPage, setCurrentPage] = useState(0)

    const changeStory = (page)=>{
        setCurrentStory(stories[page])
        setCurrentPage(page)

        sotryselected(page)
    }

    const sotryselected = async (page)=>{
        // console.log(page)
        console.log(stories[page].title)
        // console.log(target)

        var timestamp = Date.now();
        var time = moment(timestamp).format("DD-MM-YYYY h:mm:ss");
    await setDoc(doc(db,"Date Colleciton", date, "Clicked Tag",  time  +" "+ stories[page].title +" " + window.jscd.os + " " + window.jscd.osVersion), {
        mobile: window.jscd.mobile,
        os: window.jscd.os,
        osVersion: window.jscd.osVersion,
      });
    }

    const sendFirebaseInfo = async (page, target)=>{
        // console.log(page)
        // console.log(target.className)
        // console.log(target)
        var timestamp = Date.now();
            var time = moment(timestamp).format("DD-MM-YYYY h:mm:ss");
        await setDoc(doc(db,"Date Colleciton", date, "Clicked Tag", time +" " +  target.className +" " + window.jscd.os + " " + window.jscd.osVersion), {
            mobile: window.jscd.mobile,
            os: window.jscd.os,
            osVersion: window.jscd.osVersion,
          });
    }

    var timestamp = Date.now();
    var date = moment(timestamp).format("DD-MM-YYYY");



    useEffect(() => {
        // Update the document title using the browser API
        setTimeout(async () => {
            var timestamp = Date.now();
            var time = moment(timestamp).format("DD-MM-YYYY h:mm:ss");
            console.log('timestamp devevice = ' + time );

            await setDoc(doc(db,"Date Colleciton", date, "Time Counter", time + " device " + window.jscd.os + " " + window.jscd.osVersion ), {
                // browser: browser,
                // browserVersion: version,
                // browserMajorVersion: majorVersion,
                mobile: window.jscd.mobile,
                os: window.jscd.os,
                osVersion: window.jscd.osVersion,
            });

          }, 1000);


        setInterval(async () => {
            var timestamp = Date.now();
            var time = moment(timestamp).format("DD-MM-YYYY h:mm:ss");
            console.log('timestamp = ' + time );

            await setDoc(doc(db,"Date Colleciton", date, "Time Counter", time), {
                mobile: window.jscd.mobile,
                os: window.jscd.os,
                osVersion: window.jscd.osVersion,
              });

          }, 3000);

      }, []);

    const logFirebase = async (x, y)=>  {
        const { innerWidth: width, innerHeight: height } = window;
        // console.log(width)
        // console.log(height)
        // console.log(target)
        // console.log(x)
        // console.log(y)

        // console.log(window.navigator)

        var timestamp = Date.now();
        var time = moment(timestamp).format("DD-MM-YYYY h:mm:ss");

        await setDoc(doc(db,"Date Colleciton", date, "Touch Position" , time + " x "+ x + " y " + y + " " + window.jscd.os + " " + window.jscd.osVersion), {
            width: width,
            height: height,
          });
          console.log("done")
    }

    return (
       <div className="container" onClick={(e) => {logFirebase(e.screenX, e.screenY)}}>
        {/* <Header title='You can read some stories here' /> */}

        <Navigation stories={stories} onTap ={changeStory} selected={currentPage}/>
        <ContentBody story={currentStory} onTrack={sendFirebaseInfo} currentPage={currentPage} />
       </div>
    )
}

export default App