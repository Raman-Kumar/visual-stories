import { useState } from "react";
import React from "react";
import ContentBody from "./components/ContentBody";
import Header from "./components/Header";
import Navigation from "./components/Navigation";

function App(){

    const stories = [
        {
            page: 1,
            title : "Raman Kumar",
            text :
            `
            Tap the titles to read the story and it's scrollable
            
            This website is built in react with 🌹
            and
            Design is my imagination only.

            I am Raman kumar😎
            who can write some program and have a degree in it.

            Know me more from twitter.com/KRaman1998


            `
        },
        {
            page: 2,
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
            page: 3,
            title : "Elon's Holiday on Mars",
            text : `I am Raman kumar`
        }
       
        ,
        {
            page: 5,
            title : "7 Rats in Castel",
            text : "I am Raman kumar"
        }
        ,
        {
            page: 6,
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
            page: 4,
            title : "Elon's Holiday on Mars 2.0",
            text : "I am Raman kumar"
        }
    ]

    const [currentStory, setCurrentStory] = useState(stories[0])
    const [currentPage, setCurrentPage] = useState(0)

    const changeStory = (page)=>{
        setCurrentStory(stories[page])
        setCurrentPage(page)
    }

    return (
       <div className="container">
        {/* <Header title='You can read some stories here' /> */}

        <Navigation stories={stories} onTap ={changeStory} selected={currentPage}/>
        <ContentBody story={currentStory} currentPege={2} />
       </div>
    )
}

export default App