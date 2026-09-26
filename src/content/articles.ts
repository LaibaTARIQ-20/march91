// ─────────────────────────────────────────────────────────────
// ARTICLE DATA — add a new article by copying an object below.
// No coding knowledge needed beyond editing text between quotes.
//
// section: one of "samaj" | "karobaar" | "opinion" | "lifestyle" | "sports" | "nust-boxd"
// isCoverStory: set true on exactly ONE article — it becomes the homepage hero
// heroImage: leave as null until a real photo exists (renders a placeholder)
// ─────────────────────────────────────────────────────────────

export type Section =
  | "samaj"
  | "karobaar"
  | "opinion"
  | "lifestyle"
  | "sports"
  | "nust-boxd";

export type Article = {
  slug: string;
  section: Section;
  title: string;
  author: string;
  excerpt: string;
  body: string[];
  heroImage: string | null;
  articleImage?: string | null; // optional — different photo for the article page itself
  isPlaceholderImage?: boolean;
  photoCredit?: string;
  isCoverStory?: boolean;
  isFeatured?: boolean;
};

export const sectionLabels: Record<Section, string> = {
  samaj: "Samaj",
  karobaar: "Karobaar",
  opinion: "Opinion",
  lifestyle: "Lifestyle",
  sports: "Sports",
  "nust-boxd": "NUST Box'd",
};

export const articles: Article[] = [
  // ── COVER STORY (still placeholder — swap for the real Rector interview once it arrives) ──
  {
    slug: "the-new-class-rewriting-nusts-social-scene",
    section: "samaj",
    title: "The new class rewriting NUST's social scene",
    author: "TBD",
    excerpt:
      "A look at the students, clubs, and quiet rebellions shaping campus life this term.",
    body: [
      "Placeholder cover story text. Replace with the Rector interview once it arrives per the SOP, the first issue's cover story features NUST's Rector, his journey to becoming the university's person in charge, along with a photoshoot for the debut issue.",
    ],
    heroImage: "https://picsum.photos/seed/march91-cover/1400/1000",
    isPlaceholderImage: true,
    photoCredit: "Photographed by [Name] for March '91",
    isCoverStory: true,
  },

  // ── REAL: Samaj section intro/prologue ──
  {
    slug: "samaj-this-happened-we-watched-youre-reading",
    section: "samaj",
    title: "This happened. We watched. You're reading.",
    author: "TBD",
    excerpt:
      "SAMAAJ is March '91's feature section on campus events first act to final scoreboard, on the record.",
    body: [
      "\u201cAll the world's a stage, and all the men and women merely players; they have their exits and their entrances, and one man in his time plays many parts.\u201d William Shakespeare, As You Like It",
      "Two hundred people packed into an auditorium. A debater drops one line and the room's thundering with applause before she's even finished. A judge's pen doesn't stop moving. An archery target gets hit dead center, twice. A robotics demo fails once, fails twice, then just works. A stall runs out of samples an hour before it was supposed to close. A mic cuts out mid-sentence and the crowd fills in the silence anyway. Sounds like a dozen different movies  but this is just a month at NUST, where societies are stepping up and breathing life into the university.",
      "This is where SAMAAJ, our feature section on campus events, comes in. We're putting NUST's events where they actually belong not only buried in someone's camera roll but on the record as well. First act to final scoreboard, the raw reactions of the crowd, the results nobody called and the wins that deserve louder applause than they got.",
      "Consider this your front-row recap of what just went down on campus.",
      "We're SAMAAJ This happened. We watched. You're reading.",
    ],
    heroImage: "https://picsum.photos/seed/march91-samaj/1200/900",
    isPlaceholderImage: true,
    isFeatured: true,
  },

  // ── REAL: Brand Launch event coverage, for Samaj ──
  {
    slug: "before-the-chaos-begins",
    section: "samaj",
    title: "Before the chaos begins",
    author: "TBD",
    excerpt:
      "NUST's Orientation Week Brand Launch went full \"Titanic\" this year. Bold choice, considering how these things usually end.",
    body: [
      "Every year, NUST opens its gates to a new batch of students fresh off their first boss battle (the entrance exam) leaving them clinging to what's left of their sanity. Then comes Orientation Week, NUST's annual attempt to convince you that university will be all fun and games. Spoiler: it's not.",
      "And one of the events in preparation for the orientation week is the Brand launch.",
      "This year, NUST took things to the high seas with a \u201cTitanic\u201d inspired theme. Bold choice. Let's hope it's not foreshadowing (gulp). After all, freshmen do board with optimism, only to meet their iceberg in the form of a 9 a.m. quiz they forgot existed.",
      "The Brand Launch kicked off with an address by the Director Student Affairs, followed by speeches from the office bearers and enough wing chanting to fill the room. For now, the chants filled the hall with excitement. In a few weeks, they will likely be replaced by the sound of keyboards, sighs, and someone asking, \u201cQuiz hai kal?\u201d",
      "After a perfectly decorated cake was sacrificed for the greater good, the Orientation website, logo, and sponsors were unveiled. And, of course, the night ended with a photo frenzy at the brand wall. Because memories fade, but the Instagram dump is forever.",
      "Yet beneath all the blue lights, chants, branding, and cake lies something more sentimental: a passing of the torch. The Brand Launch is more than the beginning of the Orientation; it is a reminder of how quickly the roles change. The freshmen being welcomed today will, before they know it, be the ones standing on the other side, welcoming the next batch.",
      "And perhaps, years from now, when another batch walks through those gates and another Brand Launch sets the stage, they too will look back and realise that they weren't just watching a university tradition; they were becoming a part of it.",
      "This year's voyage is officially underway! And with any luck, this ship ends up more floating than the one in the film.",
    ],
    heroImage: "/images/samaj-brandlaunch.jpg",
  },

  // ── REAL: Sports cover story, written by Anusha Khan — now with a real photo ──
  {
    slug: "inside-nusts-athletic-entrance",
    section: "sports",
    title: "Sports",
    author: "Anusha Khan",
    excerpt:
      "From goalposts to tracks, we're putting NUST's campus athletes where they belong: in the spotlight.",
    body: [
      "Adrenaline coursing through their veins; nerves threatening to spiral into chaos, as they battle it out on the field, each one chasing the same goal: victory. But don't go confusing this with the Battle of Thermopylae and the legendary 300 Spartans, we're talking about the sportsmen and women of NUST.",
      "Their battlefield just happens to have goalposts, courts, tracks, and a very unforgiving clock, because while some people simply go to the university, others make an athletic entrance.",
      "In this section, we're putting our campus athletes where they belong: in the spotlight. From the sports news that have the university buzzing, to recruitment, schedules, competitions, and the people behind the plays, we're covering it all.",
      "Trust me, there's so much more to university sports than sweat, sore muscles, and suspiciously damp tank tops.",
      "We'll also be getting the inside scoop from the coaches who know exactly what it takes to turn a good player into a great one. Consider this your front row seat to the coolest people on campus and a guide on who to graciously avoid picking fights with (on the fields of course).",
    ],
    heroImage: "/images/sports-court.png",
    isFeatured: true,
  },
  {
    slug: "why-even-do-sports",
    section: "sports",
    title: "Why Even Do Sports?",
    author: "TBD",
    excerpt:
      "You don't grow when it's easy; you grow when you show up anyway.",
    body: [
      "Ah! That day when I ran THE 400m race. The referee blew his whistle and off I went. A surge of emotion filled me with joy, and for those first few moments, victory felt almost within my grasp. But a 400m race doesn't hand you the finish line so easily now, does it? Before long, one runner after another passed me, disappearing further into the distance. I watched the hopes of my team slip away, mixed with the embarrassment of losing. And in that moment, I hated myself. Why did I agree to compete? Why did I put myself in this position of failure?",
      "WHY EVEN DO SPORTS?",
      "I could ramble on about all the health benefits of sports, but honestly, we already know them. Otherwise, we wouldn't be eating all that tail mein libra hua junk food from the canteen.",
      "The real reason you should do sports is simple:",
      "\u201cYou don't grow when it's easy; you grow when you show up anyway.\u201d",
      "I know, I know, it sounds like something printed on a gym wall in an obnoxiously large font. But hear me out.",
      "Life will put you under pressure whether you're ready or not: exams you didn't prepare for, interviews where your mind goes blank, presentations where your rehearsed words suddenly disappear. And that is where sports comes in, it gives you a place to practise being uncomfortable.",
      "Because sometimes, you fail. Not the cute \u201cI tried my best!\u201d kind of failure. The kind where everyone is watching and you genuinely question whether you're even capable.",
      "And that's okay.",
      "Because those moments challenge you, humble you, and force you to discover what you're made of. So yes, do sports for your heart and your muscles. But more importantly, do them for the moments when you don't know if you can. Because those moments have a funny way of teaching you exactly who you are.",
      "And if by the end of this article, I was able to convince you to do sports, consider coming back to this page to stay updated on all things related to sports around NUST, and also so I can keep my job. (advertisement toh dalni thi)",
    ],
    heroImage: "/images/sports-court.png",
  },

  // ── REAL: SCME x Zong seminar feature — filed under Opinion ──
  {
    slug: "why-students-prefer-torture-over-teamwork",
    section: "opinion",
    title: "Why students prefer torture over teamwork",
    author: "Sarah Rameen Qureshi",
    excerpt:
      "A guest talk on leadership at SCME makes the case for why group projects fail and how to actually lead one.",
    body: [
      "Ahh teamwork. (sighs), a default procedural vice where one individual does all the work, while the other members idly watch their project go from a passionate group learning opportunity to a private tutoring lesson. For those unfortunate enough to miss the seminar held on the 8th of August, a practical explanation of why this happens so often was given by guest speaker Syed Naveed Akhtar in the School of Chemical and Materials Engineering (SCME) at NUST Islamabad. Oh, and how to fix it.",
      "\u201cFinishing last in a relay race is a given when the baton, held by one team member, is never passed.\u201d",
      "Before you set out to defend the heroic actions of the individual in the 'group' project who technically 'saved everyone,' think of it as so: an act of selfish interests blindly fueled by passion and a dignified work ethic, stoically accepting all circumstances involving failure and lack of commitment. Doesn't exactly sound like a leader, does he?",
      "Well, considering the numerous lackeys and buzzkills in every lecture room, petrified of boring presentations, I don't really blame either. The system is flawed internally, chucking flavorless topics over a variety of opinionated individuals. But that's exactly where creativity breeds and blooms.",
      "By default, the leader, according to Mr Akhtar, is an extroverted, emotionally intelligent, observing problem-solver. He or she makes the goal interesting enough to achieve. Smartly so, they divide the workload not evenly but proportionately, giving a healthy challenge to each member involved. That's where we dive into what defines the term 'leader.'",
      "Courageous enough to state the obvious, Mr Akhtar, a Corporate Affairs Director at Zong, agreed with John C. Maxwell: \u201cLeadership is Influence, nothing more, nothing less.\u201d The concept was torn apart into captivating bits, each focusing on the traits of a good leader. The depth of such a philosophical course was delivered with intensified brevity, making it intriguing for all those in attendance.",
      "Presenting a melting pot of personal experiences, data, and anecdotes of businessmen and women, Mr Akhtar had everyone engaged throughout. \u201cIt was pretty interactive, which is rare for seminars\u2026kept me on the edge of my seat,\u201d says Hafsa Obaid, an attendee, while another describes the experience as simply their \u201cvery first monologue that didn't trigger sleep.\u201d",
      "Pretty impressive for a white-collar employee that is.",
      "In the duration of his speech, aided by elaborative hand gestures, I was reminded of how certain people exude authority: It's the peer who, out of the blue, starts dividing tasks between his group members without anyone questioning his stance. The teammate that you dm when you're a bit dubious about a decision your team leader made. We don't know why or when 'leadership' happens, but somehow we all know who to go to when 'it' hits the fan.",
      "'It has absolutely nothing to do with position or rank; rather, it's the potential to influence that decides your status.'",
      "Even if the goal is puny like deciding a hangout location, subtly, a leader emerges; Without needing anyone to overtly proclaim their loyalty to his decisions or authority, he simultaneously has his friends agree to whatever plans he's making. Simply because he has their vote: whether by kindness, gratitude, favor, or support. That man has people willing to follow him.",
      "So the next time you're stuck in a group project or contemplating what to order, be considerate. The person who takes accountability, values potential, and shares success is deemed to inspire and influence people: A power much stronger and worthy of respect than mere alms; the power to lead.",
    ],
    heroImage: "/images/opinion-scme.jpg",
    articleImage: "/images/opinion-scme-article.jpg",
    isFeatured: true,
  },
  {
    slug: "mom-i-dont-need-an-internship",
    section: "karobaar",
    title: "Mom, I Don't Need an Internship, My GPA is 3.8",
    author: "TBD",
    excerpt:
      "Degree gives you the vocabulary, but practical experience gives you the instinct.",
    body: [
      "\u201cAnd there it was, the crisp, neatly printed certificate that guaranteed I knew everything about navigating the real world, until the real world actually showed up.\u201d",
      "We live in an age obsessed with collecting badges.",
      "One's intellect is catalogued by online certifications; one's ambition measured by LinkedIn banners; and one's prowess defined by a glowing GPA. It's almost funny, really, how easily we convince ourselves that knowing how something works in theory is the same as surviving it when the stakes are real.",
      "Dare I say, pure academic skill without mileage has created a generation of theoretical experts.",
      "So why wait for a textbook or a lecture slide to tell you how business actually operates? You can memorize every framework from Harvard Business Review, rehearse your elevator pitch in front of the mirror until your jaw aches, and memorize every cash-flow formula ever printed and still choke the moment a real client pushes back on your pricing. By this, I don't mean to disregard the immense value of sharp technical skills or academic grounding.",
      "Think of your degree as the entry ticket, the baseline requirement that gets you invited into the room \u2014 now, whether you deserve to be in the room depends solely on your practical knowledge and experience.",
      "If you want my blunt and honest advice on the matter?? \u201cFind out what happens when your plan falls apart at 3:00 AM. That is the real curriculum. Something no book can ever teach you.\u201d",
      "Today, everyone has an impressive resume, but hand them a live crisis, and you get second-hand embarrassment watching the theoretical knowledge evaporate in real time. Theory and practical experience used to be partners before everyone decided that collecting certificates was easier than getting their hands dirty. And yes, that shiny new resume template looks great, those polished pitch decks look slick, and those buzzwords sound impressive in classroom presentations. But these should be the last things on your mind if you can't navigate an angry customer or a problem that wasn't taught to you beforehand so now you're just as important as a reliable paper weight to your employer.",
      "You're sitting in one of the most dynamic university environments in the country; opportunities to build, fail, and execute surround you every single day. Make it count.",
      "And remember: Degree gives you the vocabulary, but practical experience gives you the instinct. Experience is the bruise you get from a failed launch, the awkward silence after a botched pitch, and the muscle memory that kicks in when everything goes wrong.",
      "You initially started reading this to figure out why your degree set hasn't landed you the big break yet. I hope, by the end of reading this, you'll realize that degree and theoretical knowledge is just potential energy, experience is what turns it into power. Stop collecting blueprints. Go build something, mess it up, fix it, and wear those battle scars proudly. There is no other substitute.",
    ],
    heroImage: "https://picsum.photos/seed/march91-internship/1200/900",
    isPlaceholderImage: true,
  },

  // ── REAL: Karobaar section intro/prologue, by Sarim Khan Lodhi ──
  {
    slug: "karobaar-navigating-innovation-enterprise-and-opportunity",
    section: "karobaar",
    title: "Karobaar: Navigating Innovation, Enterprise, and Opportunity",
    author: "Sarim Khan Lodhi",
    excerpt:
      "Your front row seat to NUST's economic theatre, business, innovation, and the high-stakes hustle shaping campus.",
    body: [
      "Empty bank accounts, high stakes pitch decks slapped together at 3:00 AM, corporate seminars boasting free refreshments, and a collective dream of landing high paying offers before graduation. From cafeteria budgeting to launching startups at NSTP, we aren't talking about running a hedge fund on Wall Street, we're talking about the economic ecosystem running like a finely oiled machine right here at NUST.",
      "Welcome to Karobaar, your front row seat to this economic theatre, focusing on business, innovation, and the high stakes hustle shaping our campus.",
      "We're tracking emerging industry trends and bringing you insider access to NSTP startup stories (because someone has to document the next million dollar idea born in a hostel room). We showcase inspiring alumni who somehow managed to make it big into the real world, alongside direct insights through exclusive faculty interviews.",
      "From corporate seminar updates and competitive projects to job openings and employment opportunities we'll keep you updated while keeping an eye out for any major financial activity happening around NUST.",
      "Whether you're an aspiring entrepreneur running on instant noodles and dreams, hunting for a job to fund your coffee addiction, or simply curious about the economic pulse of our community, Karobaar has you covered.",
      "Karobaar, connecting student ambition with real world opportunity.",
    ],
    heroImage: "https://picsum.photos/seed/march91-karobaar/1200/900",
    isPlaceholderImage: true,
    isFeatured: true,
  },

  // ── REAL: PottersWheelDesignHouse founder interview, for Karobaar ──
  {
    slug: "why-you-should-be-your-own-boss",
    section: "karobaar",
    title: "Why You Should Be Your Own Boss",
    author: "TBD",
    excerpt:
      "A guide by PottersWheelDesignHouse's CEO, Asma Akhtar, on choosing art, liberty, and building a life on your own terms.",
    body: [
      "They say success is three meals a day, an air-conditioned workplace, and a Mercedes. For some, yes; For others like Ms Asma, their hunger for growth and learning is only satiated once they're brain-dead. In simpler terms, success is liberty.",
      "Art, often mistaken for unsupervised freedom, has never been a popular choice in Pakistan, at least statistically. With students aiming for either a corporate 9-5 or medicine, the originating subject of creative expression was a slander: a complete waste of time. Ms Asma thinks differently:",
      "\u201cI can do whatever I want with my life, and that is the greatest gift.\u201d",
      "This blessing isn't simply given; every one of us has to fight for it. By this statement, I don't mean to say to trash your ex's house or to run away from your parents. I mean to stand up for your ideas when no one else does: to live your dream before it materializes.",
      "Rejection's such a humorous word; it's only kindling for the fire within. Ms Asma's office was nothing short of extraordinary: a petite apartment in the heart of G-7 Islamabad, adorned with passion and care. 'Adorable' would be the right word for her dainty and surprisingly charming crockery, with color decorating every corner of the space. Even the old tissue holder on her desk had its very own personality: 'It's respected,' she says; 'respect makes one bloom.' So even the oldest of books was dusted off and taken care of, having their very own place in a dignified rack beside her chunky beige couch.",
      "Standing right behind the cameraman, her expressions reminded me of a carefully put-together outfit. Not performative, no, but an amalgam of various decisions at display; Chic and amicably professional.",
      "With her skills in interior, graphic designing, photography and every other media relevant talent your parents refuse to recognize, I have no doubt she'll revive a torn notebook into an eye-catching masterpiece on your bedside table. Notable restaurants such as Ginyaki, 1969, and corporations like Nayatel have had the honor of designing their spaces using her impeccable taste in placement and color. How does she do it?",
      "\u201cIf you are a woman or man with an idea, preserve it.\u201d",
      "Make do of what you have, she voices. Start by ornamenting your space, no matter how big or small. Use pieces that you love, putting them in rooms you most visit. Tidiness is the very beginning of art. No one, absolutely no one, is willing to work on a dirty canvas. Make your bed. That is how you take control of your life. That is how you become your own boss.",
    ],
    heroImage: "/images/karobaar-pottersw.jpeg",
  },

  // ── REAL: NUST Box'd section intro/prologue, by Hadeed ──
  {
    slug: "nust-boxd-intro",
    section: "nust-boxd",
    title: "NUST Box'd",
    author: "Hadeed",
    excerpt:
      "March '91's own space for insight and updates on acclaimed films, books, and what's topping the music charts.",
    body: [
      "This section brings you reviews, recommendations and the latest in film, literature and music from someone whose crowning achievements growing up included dropping out and watching 350 films per year till falling back into a media degree here at NUST. That is what brings us to NUST Box'd, March '91's very own space for insight and updates on acclaimed films, books and what's topping the music charts.",
      "Check in every semester for at times witty, at times pretentious, and at times solemn discussion around the new indie darling of the year, the album you'll have on repeat, or the book you won't be able to put down. We'll talk about and analyze works of art from around the world from and for all kinds of people, reviewing a diverse range of media be it universally loved or entrenched in a quirky, unheard-of niche.",
      "Next time your friend asks for a cool new movie or song to check out, hear it first from NUST Box'd, so you have someone to blame if they don't like it, or of course claim credit for if they do!",
    ],
    heroImage: "https://picsum.photos/seed/march91-boxd/1200/900",
    isPlaceholderImage: true,
    isFeatured: true,
  },

  // ── REAL: Lifestyle section intro/prologue — "The Unedited Life" ──
  {
    slug: "the-unedited-life",
    section: "lifestyle",
    title: "The Unedited Life",
    author: "TBD",
    excerpt:
      "From a freshman's enthusiasm to a senior's sigh at the monotony of life, campus is a rollercoaster of emotions. That's the beauty of it.",
    body: [
      "From an enthusiastic freshman to a senior buried in assignments, accompanied by the bittersweet realization that time is passing, life on campus is a rollercoaster of emotions. But that's the beauty of it. Four years, and you get to experience the whole spectrum of human emotions, feeling everything all at once and in just a few short years.",
      "There is a specific kind of emotion that comes with being on campus: being surrounded by new people, starting as strangers, growing closer with each passing day, and perhaps even drifting apart. Going back home can feel heavy at times. You wish time would spare you and your friends for a little longer. But how deep does an ambition have to run for someone to leave the comfort of home, the laughter of their friends, the feeling of belonging, the familiarity of it all, and everything else hundreds of miles away?",
      "You trade the warmth of your bed for a single bed in a room shared with strangers. Yet there is a real sense of camaraderie in it. Sharing a life with people you didn't choose, but whom you might choose all over again given the chance. It would be a shame not to admit that it is chaotic, certainly, and apprehensive at times. But hey, time passes, right? And as it does, the chaos starts to feel like company, like comfort. You begin to feel as though you wouldn't want to be anywhere else. Somehow, this becomes home.",
      "Every corner of the campus holds a memory, marking milestones and witnessing growth that we often fail to notice ourselves. This section is for those who resonate with it, and for those who want to understand their friends living far from home. It is difficult to explain the intricacies of the feeling to someone who has never been in your place. Nevertheless, why bother explaining?",
      "Find it out for yourself.",
    ],
    heroImage: "https://picsum.photos/seed/march91-lifestyle/1200/900",
    isPlaceholderImage: true,
    isFeatured: true,
  },

  // ── REAL: "How to wear yourself" — second Lifestyle piece ──
  {
    slug: "how-to-wear-yourself",
    section: "lifestyle",
    title: "How to wear yourself: A necessary reminder before fall",
    author: "Sarah Rameen Qureshi",
    excerpt:
      "External validation has ruined the significance of self-image. A necessary reminder to stop performing and start living.",
    body: [
      "\u201cAnd there it was, the feeling that no compliment, no poetry or prose, no smile or good gesture was needed to remind me of how valuable I was as a person.\u201d",
      "We often forget that as human beings, we are all worth a price.",
      "One's loyalty can be bought with a few loving texts; one's happiness with roses (red ones); one's work with time; and one's hope with deceit. It's laughable, really, knowing how we willingly set our value so low, handing over everything until time tells and regret consumes us.",
      "Dare I say, external validation has ruined the significance of self-image.",
      "So why wait for the next ThewizardLiz or David Goggins video? Put on your favorite color, the one that your mom says makes your eyes pop, and stop thinking that everyone notices your odd pair of socks.",
      "By this, I don't mean to disregard the joy that comes from a friend's genuine smile or a teacher's appreciation of your assignment. I want you to think of it as bonuses, or even better, brownie points that you receive for being you. No get-ready-with-me or lousy vlogging should distract you from paying attention to yourself.",
      "Find out what works best for you. It is the best gift you could ever give to yourself. Creativity and originality were best friends before everyone decided on their newly founded animosity. Today, everyone is 'giving copycat'. See what I did there. I got second-hand embarrassment just from typing it.",
      "And yes, that old sweater looks great on you, those worn Levi's, and that two-piece shalwar kameez from Ethnc. These should be the last things on your mind, for god's sake. You're in one of the largest universities in Pakistan; people yearn for this quality of education. Make it count. With that said, I'd love to quote an interview clip I found of Emma Thompson, a British actress, on Instagram where she frustratingly exclaimed:",
      "\u201cI'm going to waste my passion, my energy, my curiosity, my money and my life's purpose worrying about my body. That's what I'll do. What a good idea!\u201d",
      "Perfect use of sarcasm, I'll add.",
      "You initially clicked on this page to find out how to wear yourself. I hope, by the end of reading this you'll realize you already know how. Your best smile is the one with crooked teeth and wrinkles. Wear it and wear it proudly. There is no other substitute.",
    ],
    heroImage: "https://picsum.photos/seed/march91-wearyourself/1200/900",
    isPlaceholderImage: true,
  },
];

export function getArticlesBySection(section: Section) {
  return articles.filter((a) => a.section === section);
}

export function getArticleBySlug(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export function getCoverStory() {
  return articles.find((a) => a.isCoverStory) ?? articles[0];
}

export function getFeaturedGrid() {
  return articles.filter((a) => a.isFeatured);
}