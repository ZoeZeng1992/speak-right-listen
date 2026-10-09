/* ============================================================
   DATA — one unit per grammar trap the learner struggles with.
   focus[] marks the "trap words" that get checked & highlighted.
   ============================================================ */
const UNITS = [
  {
    id:"be", tag:"be", title:"The Verb Be", cn:"be 动词 am / is / are",
    cnDesc:"表示“是 / 在”。句子里没有动作动词时，必须有 be：I am、you are、he is。",
    rule:"Use <b>am / is / are</b> to link the subject to what it is or where it is. Never drop it.",
    hint:"Don't drop am/is/are", watch:"am / is / are",
    listen:[
      {en:"I am a UI designer.", cn:"我是 UI 设计师。", focus:["am"], note:"I <b>am</b> …", scene:"UX/UI"},
      {en:"The button is too small.", cn:"这个按钮太小了。", focus:["is"], note:"button <b>is</b> too small", scene:"UX/UI"},
      {en:"The icons are unclear.", cn:"这些图标不清楚。", focus:["are"], note:"icons <b>are</b> unclear", scene:"UX/UI"},
      {en:"We are at the airport.", cn:"我们在机场。", focus:["are"], note:"We <b>are</b> at …", scene:"旅行"},
      {en:"The coffee is cold.", cn:"这杯咖啡凉了。", focus:["is"], note:"coffee <b>is</b> cold", scene:"生活"}
    ],
    speak:[
      {en:"She is my design manager.", cn:"她是我的设计经理。", focus:["is"], note:"She <b>is</b> …", scene:"UX/UI"},
      {en:"The layout is clean.", cn:"这个布局很干净。", focus:["is"], note:"layout <b>is</b> clean", scene:"UX/UI"},
      {en:"I am ready for feedback.", cn:"我准备好听反馈了。", focus:["am"], note:"I <b>am</b> ready", scene:"UX/UI"},
      {en:"The hotel is near the metro.", cn:"这家酒店在地铁附近。", focus:["is"], note:"hotel <b>is</b> near …", scene:"旅行"},
      {en:"You are muted.", cn:"你静音了。", focus:["are"], note:"You <b>are</b> muted", scene:"UX/UI"}
    ]
  },
  {
    id:"plural", tag:"复数", title:"Singular & Plural", cn:"名词单复数",
    cnDesc:"不止一个就用复数：一般加 -s / -es；有不规则（child→children、person→people）。",
    rule:"More than one → add <b>-s / -es</b>. Some nouns are irregular (child→children).",
    hint:"Plural nouns take -s", watch:"noun + -s",
    listen:[
      {en:"I have two monitors.", cn:"我有两台显示器。", focus:["monitors"], note:"two monitor<b>s</b>", scene:"UX/UI"},
      {en:"There are many bugs in this version.", cn:"这个版本有很多 bug。", focus:["bugs"], note:"many bug<b>s</b>", scene:"UX/UI"},
      {en:"We booked three nights.", cn:"我们订了三晚。", focus:["nights"], note:"three night<b>s</b>", scene:"旅行"},
      {en:"The buttons are too small.", cn:"这些按钮太小了。", focus:["buttons","are"], note:"button<b>s</b> · <b>are</b>", scene:"UX/UI"},
      {en:"I need some batteries.", cn:"我需要一些电池。", focus:["batteries"], note:"battery → batter<b>ies</b>", scene:"生活"}
    ],
    speak:[
      {en:"She has five projects.", cn:"她有五个项目。", focus:["projects"], note:"five project<b>s</b>", scene:"UX/UI"},
      {en:"There are two elevators here.", cn:"这里有两部电梯。", focus:["elevators","are"], note:"elevator<b>s</b> · <b>are</b>", scene:"旅行"},
      {en:"The children love this app.", cn:"孩子们喜欢这个应用。", focus:["children"], note:"child → <b>children</b>（不规则）", scene:"UX/UI"},
      {en:"I bought two tickets.", cn:"我买了两张票。", focus:["tickets"], note:"two ticket<b>s</b>", scene:"旅行"},
      {en:"We have a lot of meetings.", cn:"我们有很多会。", focus:["meetings"], note:"a lot of meeting<b>s</b>", scene:"UX/UI"}
    ]
  },
  {
    id:"article", tag:"a/the", title:"Articles", cn:"冠词 a / an / the",
    cnDesc:"可数名词前别漏冠词：a / an 泛指“一个”（元音前用 an），the 特指“那个”。",
    rule:"Count nouns usually need <b>a/an</b> (one, general) or <b>the</b> (specific). Use <b>an</b> before a vowel sound.",
    hint:"Don't drop a / an / the", watch:"a · an · the",
    listen:[
      {en:"I have a question.", cn:"我有个问题。", focus:["a"], note:"<b>a</b> question", scene:"UX/UI"},
      {en:"She is an expert.", cn:"她是专家。", focus:["an"], note:"<b>an</b> expert（元音前）", scene:"UX/UI"},
      {en:"Can you close the window?", cn:"帮我关一下窗户？", focus:["the"], note:"<b>the</b> window（特指）", scene:"生活"},
      {en:"He wants an upgrade.", cn:"他想升级一下。", focus:["an"], note:"<b>an</b> upgrade", scene:"UX/UI"},
      {en:"The taxi is here.", cn:"这辆出租车到了。", focus:["The"], note:"<b>The</b> taxi", scene:"旅行"}
    ],
    speak:[
      {en:"I need a break.", cn:"我需要休息一下。", focus:["a"], note:"<b>a</b> break", scene:"生活"},
      {en:"She sent me an email.", cn:"她给我发了封邮件。", focus:["an"], note:"<b>an</b> email", scene:"UX/UI"},
      {en:"Can you fix the layout?", cn:"你能修一下这个布局吗？", focus:["the"], note:"<b>the</b> layout", scene:"UX/UI"},
      {en:"This is an important feature.", cn:"这是个重要的功能。", focus:["an"], note:"<b>an</b> important …", scene:"UX/UI"},
      {en:"Where is the exit?", cn:"出口在哪？", focus:["the"], note:"<b>the</b> exit", scene:"旅行"}
    ]
  },
  {
    id:"present-s", tag:"-s", title:"Present Simple & -s", cn:"一般现在时 & 第三人称 -s",
    cnDesc:"习惯和事实用一般现在时；主语是 他 / 她 / 它 时，动词要加 -s / -es。",
    rule:"Habits &amp; facts use the present simple. With <b>he / she / it</b>, add <b>-s / -es</b> to the verb.",
    hint:"Add -s for he/she/it", watch:"verb + -s",
    listen:[
      {en:"She works from home on Fridays.", cn:"她周五在家办公。", focus:["works"], note:"work → work<b>s</b>", scene:"UX/UI"},
      {en:"The app supports dark mode.", cn:"这个应用有深色模式。", focus:["supports"], note:"support → support<b>s</b>", scene:"UX/UI"},
      {en:"He drinks coffee every morning.", cn:"他每天早上喝咖啡。", focus:["drinks"], note:"drink → drink<b>s</b>", scene:"生活"},
      {en:"This bus goes to the city center.", cn:"这趟公交去市中心。", focus:["goes"], note:"go → go<b>es</b>", scene:"旅行"},
      {en:"The system sends a daily report.", cn:"系统每天会发一份报告。", focus:["sends"], note:"send → send<b>s</b>", scene:"UX/UI"}
    ],
    speak:[
      {en:"She designs mobile apps.", cn:"她设计手机应用。", focus:["designs"], note:"design → design<b>s</b>", scene:"UX/UI"},
      {en:"He usually takes the train.", cn:"他通常坐火车。", focus:["takes"], note:"take → take<b>s</b>", scene:"旅行"},
      {en:"The store opens at nine.", cn:"商店九点开门。", focus:["opens"], note:"open → open<b>s</b>", scene:"生活"},
      {en:"Our team meets every Monday.", cn:"我们团队每周一开会。", focus:["meets"], note:"meet → meet<b>s</b>", scene:"UX/UI"},
      {en:"She always replies quickly.", cn:"她总是回复很快。", focus:["replies"], note:"reply → repl<b>ies</b>（y→ies）", scene:"UX/UI"}
    ]
  },
  {
    id:"present-neg", tag:"do/does", title:"Negatives & Questions", cn:"现在时 否定与疑问",
    cnDesc:"否定用 don't / doesn't + 动词原形；疑问用 Do / Does 开头，动词也回原形。",
    rule:"Negative: <b>don't / doesn't</b> + base verb. Question: <b>Do / Does</b> + subject + base verb. The verb drops its -s.",
    hint:"do/does + base verb", watch:"don't / doesn't / Do / Does",
    listen:[
      {en:"I don't use that tool.", cn:"我不用那个工具。", focus:["don't","use"], note:"don't + <b>use</b>（原形）", scene:"UX/UI"},
      {en:"She doesn't like the new design.", cn:"她不喜欢新设计。", focus:["doesn't","like"], note:"doesn't + <b>like</b>（不是 likes）", scene:"UX/UI"},
      {en:"Do you have Wi-Fi here?", cn:"这里有 Wi-Fi 吗？", focus:["Do","have"], note:"<b>Do</b> you have …?", scene:"旅行"},
      {en:"Does this train stop at the airport?", cn:"这趟车在机场停吗？", focus:["Does","stop"], note:"<b>Does</b> … <b>stop</b>（原形）", scene:"旅行"},
      {en:"He doesn't work on weekends.", cn:"他周末不上班。", focus:["doesn't","work"], note:"doesn't + <b>work</b>", scene:"UX/UI"}
    ],
    speak:[
      {en:"I don't understand this error.", cn:"我看不懂这个报错。", focus:["don't","understand"], note:"don't + <b>understand</b>", scene:"UX/UI"},
      {en:"She doesn't need any help.", cn:"她不需要任何帮助。", focus:["doesn't","need"], note:"doesn't + <b>need</b>", scene:"生活"},
      {en:"Do you accept cards?", cn:"你们收卡吗？", focus:["Do","accept"], note:"<b>Do</b> you accept …?", scene:"旅行"},
      {en:"Does he speak English?", cn:"他会说英语吗？", focus:["Does","speak"], note:"<b>Does</b> he <b>speak</b>?", scene:"生活"},
      {en:"We don't have a deadline yet.", cn:"我们还没定 deadline。", focus:["don't","have"], note:"don't + <b>have</b>", scene:"UX/UI"}
    ]
  },
  {
    id:"present-cont", tag:"be+ing", title:"Present Continuous", cn:"现在进行时 be + V-ing",
    cnDesc:"此刻正在做的事：am / is / are + 动词-ing。be 和 -ing 一个都不能少。",
    rule:"Action happening right now: <b>am / is / are</b> + verb<b>-ing</b>.",
    hint:"be + verb-ing", watch:"am/is/are + -ing",
    listen:[
      {en:"I am working on the homepage.", cn:"我在做首页。", focus:["am","working"], note:"<b>am</b> + work<b>ing</b>", scene:"UX/UI"},
      {en:"She is testing the prototype.", cn:"她在测原型。", focus:["is","testing"], note:"<b>is</b> + test<b>ing</b>", scene:"UX/UI"},
      {en:"We are boarding now.", cn:"我们正在登机。", focus:["are","boarding"], note:"<b>are</b> + board<b>ing</b>", scene:"旅行"},
      {en:"He is fixing the colors.", cn:"他在改颜色。", focus:["is","fixing"], note:"<b>is</b> + fix<b>ing</b>", scene:"UX/UI"},
      {en:"The page is loading.", cn:"页面正在加载。", focus:["is","loading"], note:"<b>is</b> + load<b>ing</b>", scene:"UX/UI"}
    ],
    speak:[
      {en:"I am waiting for feedback.", cn:"我在等反馈。", focus:["am","waiting"], note:"<b>am</b> + wait<b>ing</b>", scene:"UX/UI"},
      {en:"They are having lunch.", cn:"他们在吃午饭。", focus:["are","having"], note:"<b>are</b> + hav<b>ing</b>", scene:"生活"},
      {en:"She is presenting her design.", cn:"她正在讲她的设计。", focus:["is","presenting"], note:"<b>is</b> + present<b>ing</b>", scene:"UX/UI"},
      {en:"We are looking for a taxi.", cn:"我们在找出租车。", focus:["are","looking"], note:"<b>are</b> + look<b>ing</b>", scene:"旅行"},
      {en:"The file is uploading.", cn:"文件正在上传。", focus:["is","uploading"], note:"<b>is</b> + upload<b>ing</b>", scene:"UX/UI"}
    ]
  },
  {
    id:"past", tag:"过去", title:"Past Simple", cn:"一般过去时",
    cnDesc:"已经发生的事用过去式：规则动词加 -ed，不规则要单独记（make→made）；be 动词过去式是 was / were（I/he/she/it → was；you/we/they → were）。",
    rule:"Finished past actions: regular verbs add <b>-ed</b>; common verbs are irregular (make→made). Be verb past: <b>was / were</b> (I/he/she/it → was; you/we/they → were).",
    hint:"Use the past form · was / were", watch:"-ed / 不规则 / was·were",
    listen:[
      {en:"I finished the design yesterday.", cn:"我昨天完成了设计。", focus:["finished"], note:"finish → finish<b>ed</b>", scene:"UX/UI"},
      {en:"She made a great point.", cn:"她说得很有道理。", focus:["made"], note:"make → <b>made</b>（不规则）", scene:"UX/UI"},
      {en:"We arrived late.", cn:"我们到晚了。", focus:["arrived"], note:"arrive → arrive<b>d</b>", scene:"旅行"},
      {en:"He sent the file this morning.", cn:"他今早发了文件。", focus:["sent"], note:"send → <b>sent</b>（不规则）", scene:"UX/UI"},
      {en:"I lost my charger.", cn:"我把充电器弄丢了。", focus:["lost"], note:"lose → <b>lost</b>（不规则）", scene:"生活"},
      {en:"I was in a design meeting yesterday.", cn:"我昨天在开设计会。", focus:["was"], note:"I → <b>was</b>（be 过去式）", scene:"UX/UI"},
      {en:"We were almost done.", cn:"我们当时快做完了。", focus:["were"], note:"we → <b>were</b>", scene:"UX/UI"}
    ],
    speak:[
      {en:"I updated the app last night.", cn:"我昨晚更新了应用。", focus:["updated"], note:"update → update<b>d</b>", scene:"UX/UI"},
      {en:"She left an hour ago.", cn:"她一小时前走了。", focus:["left"], note:"leave → <b>left</b>（不规则）", scene:"UX/UI"},
      {en:"We took the wrong bus.", cn:"我们坐错车了。", focus:["took"], note:"take → <b>took</b>（不规则）", scene:"旅行"},
      {en:"He fixed the issue.", cn:"他修好了这个问题。", focus:["fixed"], note:"fix → fix<b>ed</b>", scene:"UX/UI"},
      {en:"I bought a new phone.", cn:"我买了个新手机。", focus:["bought"], note:"buy → <b>bought</b>（不规则）", scene:"生活"},
      {en:"She was late for the review.", cn:"她评审迟到了。", focus:["was"], note:"she → <b>was</b>", scene:"UX/UI"},
      {en:"The icons were unclear.", cn:"那些图标当时不清楚。", focus:["were"], note:"icons（复数）→ <b>were</b>", scene:"UX/UI"}
    ]
  },
  {
    id:"past-neg", tag:"did", title:"Past Neg. & Questions", cn:"过去时 否定与疑问",
    cnDesc:"过去否定用 didn't + 动词原形；疑问用 Did 开头，动词也回原形（不再是过去式）。",
    rule:"Negative: <b>didn't</b> + base verb. Question: <b>Did</b> + subject + base verb. The verb returns to base form.",
    hint:"did + base verb", watch:"didn't / Did",
    listen:[
      {en:"I didn't get your message.", cn:"我没收到你的消息。", focus:["didn't","get"], note:"didn't + <b>get</b>（不是 got）", scene:"UX/UI"},
      {en:"She didn't join the meeting.", cn:"她没参加会议。", focus:["didn't","join"], note:"didn't + <b>join</b>", scene:"UX/UI"},
      {en:"Did you book the hotel?", cn:"你订酒店了吗？", focus:["Did","book"], note:"<b>Did</b> you <b>book</b> …?", scene:"旅行"},
      {en:"He didn't finish on time.", cn:"他没按时完成。", focus:["didn't","finish"], note:"didn't + <b>finish</b>", scene:"UX/UI"},
      {en:"Did the update work?", cn:"更新成功了吗？", focus:["Did","work"], note:"<b>Did</b> … <b>work</b>?", scene:"UX/UI"}
    ],
    speak:[
      {en:"I didn't save the file.", cn:"我没保存文件。", focus:["didn't","save"], note:"didn't + <b>save</b>", scene:"UX/UI"},
      {en:"She didn't call back.", cn:"她没回电话。", focus:["didn't","call"], note:"didn't + <b>call</b>", scene:"生活"},
      {en:"Did you try again?", cn:"你又试了一次吗？", focus:["Did","try"], note:"<b>Did</b> you <b>try</b>?", scene:"UX/UI"},
      {en:"We didn't miss the flight.", cn:"我们没误机。", focus:["didn't","miss"], note:"didn't + <b>miss</b>", scene:"旅行"},
      {en:"Did he reply?", cn:"他回复了吗？", focus:["Did","reply"], note:"<b>Did</b> he <b>reply</b>?", scene:"UX/UI"}
    ]
  },
  {
    id:"future", tag:"will", title:"Future", cn:"将来时 will / be going to",
    cnDesc:"计划好的事用 be going to + 原形；临时决定或预测用 will + 原形。",
    rule:"Plans: <b>be going to</b> + base verb. Decisions / predictions: <b>will</b> + base verb.",
    hint:"will / be going to", watch:"will / going to",
    listen:[
      {en:"I am going to redesign the page.", cn:"我打算重新设计这个页面。", focus:["am","going"], note:"<b>am going to</b> + 原形", scene:"UX/UI"},
      {en:"She will send it later.", cn:"她待会儿会发。", focus:["will"], note:"<b>will</b> + send（原形）", scene:"UX/UI"},
      {en:"We are going to launch next week.", cn:"我们下周要上线。", focus:["are","going"], note:"<b>are going to</b> launch", scene:"UX/UI"},
      {en:"It will rain tomorrow.", cn:"明天会下雨。", focus:["will"], note:"<b>will</b> rain", scene:"生活"},
      {en:"They are going to travel to Japan.", cn:"他们打算去日本旅行。", focus:["are","going"], note:"<b>are going to</b> travel", scene:"旅行"}
    ],
    speak:[
      {en:"I will fix it now.", cn:"我现在就修。", focus:["will"], note:"<b>will</b> fix", scene:"UX/UI"},
      {en:"She is going to present tomorrow.", cn:"她明天要做演示。", focus:["is","going"], note:"<b>is going to</b> present", scene:"UX/UI"},
      {en:"We will take a taxi.", cn:"我们会打车。", focus:["will"], note:"<b>will</b> take", scene:"旅行"},
      {en:"He is going to update the app.", cn:"他打算更新这个应用。", focus:["is","going"], note:"<b>is going to</b> update", scene:"UX/UI"},
      {en:"I will call you back.", cn:"我会给你回电话。", focus:["will"], note:"<b>will</b> call", scene:"生活"}
    ]
  },
  {
    id:"present-perfect", tag:"have/had done", title:"Perfect Tenses", cn:"完成时 have/has/had + 过去分词",
    cnDesc:"现在完成时 have/has + 过去分词（已经…了，影响现在）；过去完成时 had + 过去分词（在过去某时之前就已经…）。中文出现「…之前」「…的时候」这类过去时间点，就用 had。",
    rule:"<b>have / has</b> + p.p. = done, and it matters now. <b>had</b> + p.p. = it was already done before another past moment.",
    hint:"have/has/had + p.p.", watch:"have/has/had + done",
    listen:[
      {en:"I have finished the report.", cn:"我已经完成报告了。", focus:["have","finished"], note:"<b>have</b> + finish<b>ed</b>", scene:"UX/UI"},
      {en:"She has just left.", cn:"她刚走。", focus:["has","left"], note:"<b>has</b> + <b>left</b>（leave 的分词）", scene:"UX/UI"},
      {en:"We have booked the flight.", cn:"我们已经订好机票了。", focus:["have","booked"], note:"<b>have</b> + book<b>ed</b>", scene:"旅行"},
      {en:"He has fixed the bug.", cn:"他已经把 bug 修好了。", focus:["has","fixed"], note:"<b>has</b> + fix<b>ed</b>", scene:"UX/UI"},
      {en:"I have seen this design before.", cn:"我以前见过这个设计。", focus:["have","seen"], note:"<b>have</b> + <b>seen</b>（see 的分词）", scene:"UX/UI"}
    ],
    speak:[
      {en:"I have sent the invite.", cn:"我已经把邀请发出去了。", focus:["have","sent"], note:"<b>have</b> + <b>sent</b>", scene:"UX/UI"},
      {en:"She has updated the file.", cn:"她已经更新了文件。", focus:["has","updated"], note:"<b>has</b> + update<b>d</b>", scene:"UX/UI"},
      {en:"They have arrived.", cn:"他们已经到了。", focus:["have","arrived"], note:"<b>have</b> + arrive<b>d</b>", scene:"旅行"},
      {en:"He has done it.", cn:"他已经做完了。", focus:["has","done"], note:"<b>has</b> + <b>done</b>（do 的分词）", scene:"UX/UI"},
      {en:"I have booked a table.", cn:"我已经订好一个位子了。", focus:["have","booked"], note:"<b>have</b> + book<b>ed</b>", scene:"生活"}
    ]
  },
  {
    id:"modals", tag:"can/should", title:"Modal Verbs", cn:"情态动词 can / should / must…",
    cnDesc:"情态动词后面直接加动词原形（不加 -s，也不加 to）：can / could / should / must / may / might / would。",
    rule:"Modal + <b>base verb</b> (no -s, no to): can, could, should, must, may, might, would.",
    hint:"modal + 动词原形", watch:"modal + 原形",
    listen:[
      {en:"You should take a break.", cn:"你应该休息一下。", focus:["should","take"], note:"should + <b>take</b>（原形）", scene:"生活"},
      {en:"I can share the Figma link.", cn:"我可以分享 Figma 链接。", focus:["can","share"], note:"can + <b>share</b>（原形）", scene:"UX/UI"},
      {en:"We must make the button bigger.", cn:"我们必须把按钮做大一点。", focus:["must","make"], note:"must + <b>make</b>（原形）", scene:"UX/UI"},
      {en:"She might join later.", cn:"她可能晚点加入。", focus:["might","join"], note:"might + <b>join</b>（原形）", scene:"UX/UI"},
      {en:"Could you say that again?", cn:"你能再说一遍吗？", focus:["Could","say"], note:"Could + <b>say</b>（原形）", scene:"生活"}
    ],
    speak:[
      {en:"You must try this cafe.", cn:"你一定要试试这家咖啡馆。", focus:["must","try"], note:"must + <b>try</b>（原形）", scene:"生活"},
      {en:"I should fix the spacing now.", cn:"我现在应该修好间距。", focus:["should","fix"], note:"should + <b>fix</b>（原形）", scene:"UX/UI"},
      {en:"We can meet tomorrow.", cn:"我们明天可以见面。", focus:["can","meet"], note:"can + <b>meet</b>（原形）", scene:"UX/UI"},
      {en:"He may be late.", cn:"他可能会迟到。", focus:["may","be"], note:"may + <b>be</b>（原形）", scene:"生活"},
      {en:"Would you help me find the gate?", cn:"你能帮我找登机口吗？", focus:["Would","help"], note:"Would + <b>help</b>（原形）", scene:"旅行"}
    ]
  },
  {
    id:"verb-prep", tag:"动词+介词", title:"Verb + Preposition", cn:"动词固定搭配 arrive at / listen to…",
    cnDesc:"这些动词后面必须带介词才能接宾语：arrive <b>at</b> the hotel、listen <b>to</b> me、wait <b>for</b> you。中文里没有这个介词，所以最容易漏掉。",
    rule:"Some verbs need a preposition before the object: arrive <b>at</b>, listen <b>to</b>, wait <b>for</b>, look <b>at</b>. Dropping it is the classic slip.",
    hint:"别漏掉介词", watch:"动词后的介词",
    listen:[
      {en:"We arrived at the office early.", cn:"我们很早就到办公室了。", focus:["arrived","at"], note:"固定搭配 <b>arrived at</b>", scene:"UX/UI"},
      {en:"I listened to the user carefully.", cn:"我认真听了用户说的。", focus:["listened","to"], note:"固定搭配 <b>listened to</b>", scene:"UX/UI"},
      {en:"He waited for my reply.", cn:"他在等我回复。", focus:["waited","for"], note:"固定搭配 <b>waited for</b>", scene:"UX/UI"},
      {en:"Please look at this screen.", cn:"请看一下这个页面。", focus:["look","at"], note:"固定搭配 <b>look at</b>", scene:"UX/UI"},
      {en:"She is looking for a new tool.", cn:"她在找一个新工具。", focus:["looking","for"], note:"固定搭配 <b>looking for</b>", scene:"UX/UI"}
    ],
    speak:[
      {en:"She arrived at the meeting late.", cn:"她开会迟到了。", focus:["arrived","at"], note:"固定搭配 <b>arrived at</b>", scene:"UX/UI"},
      {en:"We listened to their feedback.", cn:"我们听取了他们的反馈。", focus:["listened","to"], note:"固定搭配 <b>listened to</b>", scene:"UX/UI"},
      {en:"We are waiting for approval.", cn:"我们在等审批。", focus:["waiting","for"], note:"固定搭配 <b>waiting for</b>", scene:"UX/UI"},
      {en:"I looked at the data again.", cn:"我又看了一遍数据。", focus:["looked","at"], note:"固定搭配 <b>looked at</b>", scene:"UX/UI"},
      {en:"We searched for a better layout.", cn:"我们找了个更好的布局。", focus:["searched","for"], note:"固定搭配 <b>searched for</b>", scene:"UX/UI"}
    ]
  },
  {
    id:"prepositions", tag:"in/on/at", title:"Prepositions", cn:"介词 in / on / at / to…",
    cnDesc:"时间、地点、固定搭配常用介词：at 3 pm、on Monday、in May；at the office、to the airport。",
    rule:"Time/place/collocation: <b>at</b> 3 pm, <b>on</b> Monday, <b>in</b> May; <b>at</b> the office, <b>to</b> the airport.",
    hint:"选对介词", watch:"in / on / at / to",
    listen:[
      {en:"The design review is at three.", cn:"设计评审在三点。", focus:["at"], note:"具体时刻用 <b>at</b>", scene:"UX/UI"},
      {en:"I'll see you on Monday.", cn:"我周一见你。", focus:["on"], note:"星期几用 <b>on</b>", scene:"生活"},
      {en:"She works in UI design.", cn:"她做 UI 设计。", focus:["in"], note:"领域用 <b>in</b>", scene:"UX/UI"},
      {en:"We're going to the airport.", cn:"我们要去机场。", focus:["to"], note:"去某地用 <b>to</b>", scene:"旅行"},
      {en:"The file is on my desktop.", cn:"文件在我桌面上。", focus:["on"], note:"在表面上用 <b>on</b>", scene:"UX/UI"}
    ],
    speak:[
      {en:"Let's meet at the cafe.", cn:"我们在咖啡馆见吧。", focus:["at"], note:"具体地点用 <b>at</b>", scene:"生活"},
      {en:"The demo is on Friday.", cn:"演示在周五。", focus:["on"], note:"星期几用 <b>on</b>", scene:"UX/UI"},
      {en:"I work in a design team.", cn:"我在设计团队工作。", focus:["in"], note:"组织用 <b>in</b>", scene:"UX/UI"},
      {en:"Send it to my manager.", cn:"发给我的经理。", focus:["to"], note:"给某人用 <b>to</b>", scene:"UX/UI"},
      {en:"It's in the Figma file.", cn:"它在 Figma 文件里。", focus:["in"], note:"在里面用 <b>in</b>", scene:"UX/UI"}
    ]
  },
  {
    id:"comparatives", tag:"-er/more", title:"Comparatives", cn:"比较级 -er / more / than",
    cnDesc:"两者比较：短词加 -er，长词用 more…，后面接 than；最高级用 the -est / the most。",
    rule:"Comparing two: short adj + <b>-er</b>, long adj + <b>more</b>…, then <b>than</b>. Best = the -est / the most.",
    hint:"-er / more … than", watch:"-er / more … than",
    listen:[
      {en:"This layout is cleaner than the old one.", cn:"这个布局比旧的更干净。", focus:["cleaner","than"], note:"clean → clean<b>er</b> … <b>than</b>", scene:"UX/UI"},
      {en:"This screen is more useful than before.", cn:"这个页面比以前更有用。", focus:["more","than"], note:"长词用 <b>more</b> … <b>than</b>", scene:"UX/UI"},
      {en:"Figma is easier than PowerPoint for design.", cn:"做设计时 Figma 比 PPT 更容易。", focus:["easier","than"], note:"easy → eas<b>ier</b> … <b>than</b>", scene:"UX/UI"},
      {en:"The train is faster than the bus.", cn:"火车比公交快。", focus:["faster","than"], note:"fast → fast<b>er</b> … <b>than</b>", scene:"旅行"},
      {en:"This is the best option.", cn:"这是最好的选择。", focus:["best"], note:"good → <b>best</b>（最高级）", scene:"生活"}
    ],
    speak:[
      {en:"This cafe is quieter than the lobby.", cn:"这家咖啡馆比大堂更安静。", focus:["quieter","than"], note:"quiet → quiet<b>er</b> … <b>than</b>", scene:"生活"},
      {en:"This page is simpler now.", cn:"现在这个页面更简单了。", focus:["simpler"], note:"simple → simpl<b>er</b>", scene:"UX/UI"},
      {en:"This ticket is more expensive than I thought.", cn:"这张票比我想的贵。", focus:["more","than"], note:"长词用 <b>more</b> … <b>than</b>", scene:"旅行"},
      {en:"The new icons are clearer than the old ones.", cn:"新图标比旧的更清楚。", focus:["clearer","than"], note:"clear → clear<b>er</b> … <b>than</b>", scene:"UX/UI"},
      {en:"This is the biggest screen.", cn:"这是最大的屏幕。", focus:["biggest"], note:"big → <b>biggest</b>（最高级）", scene:"UX/UI"}
    ]
  },
  {
    id:"patterns", tag:"句型", title:"Core Patterns", cn:"高频句型 · 学一个用一片",
    cnDesc:"每个句型配 5 个例句，横跨工作、生活、旅行。练的是框架不是句子：看到中文句式（如「你能…吗？」）就要反射出英文框架（Could you + 动词？）。揭晓后备注里会写明是哪个句型。",
    rule:"One frame, many sentences. Learn the frame (<b>Could you</b> + verb?) and swap the rest. Forty frames cover most of daily, work and travel talk.",
    hint:"认句型不认句子", watch:"句型框架词",
    listen:[
      {en:"Could you send me the Figma link?", cn:"你能把 Figma 链接发我吗？", focus:["could","you"], note:"句型：Could you + 动词？（请求）", scene:"UX/UI"},
      {en:"Could you pass me the salt?", cn:"你能把盐递给我吗？", focus:["could","you"], note:"句型：Could you + 动词？（请求）", scene:"生活"},
      {en:"Could you show me the way to the station?", cn:"你能告诉我去车站怎么走吗？", focus:["could","you"], note:"句型：Could you + 动词？（请求）", scene:"旅行"},
      {en:"Would you mind moving the meeting to three?", cn:"你介意把会议挪到三点吗？", focus:["would","you","mind"], note:"句型：Would you mind + 动词ing？（客气请求）", scene:"UX/UI"},
      {en:"Would you mind waiting a few minutes?", cn:"你介意等几分钟吗？", focus:["would","you","mind"], note:"句型：Would you mind + 动词ing？（客气请求）", scene:"生活"}
    ],
    speak:[
      {en:"Could you check the spacing again?", cn:"你能再检查一下间距吗？", focus:["could","you"], note:"句型：Could you + 动词？（请求）", scene:"UX/UI"},
      {en:"Could you call me back tonight?", cn:"你今晚能给我回个电话吗？", focus:["could","you"], note:"句型：Could you + 动词？（请求）", scene:"生活"},
      {en:"Would you mind reviewing my design?", cn:"你介意帮我看一下设计吗？", focus:["would","you","mind"], note:"句型：Would you mind + 动词ing？（客气请求）", scene:"UX/UI"},
      {en:"Would you mind closing the window?", cn:"你介意把窗关一下吗？", focus:["would","you","mind"], note:"句型：Would you mind + 动词ing？（客气请求）", scene:"生活"},
      {en:"Would you mind taking a photo of us?", cn:"你介意帮我们拍张照吗？", focus:["would","you","mind"], note:"句型：Would you mind + 动词ing？（客气请求）", scene:"旅行"}
    ]
  }
];

/* ============================================================
   EXTRA practice bank — compact tuples [en, cn, focus[], scene].
   Merged into the units above so each unit has ~25 listen + ~25 speak.
   Listen and Speak stay different sets.
   ============================================================ */
const EXTRA = {
  "be": {
    listen:[
      ["She is in a design meeting.","她在开设计会。",["is"],"UX/UI"],
      ["We are almost done.","我们快做完了。",["are"],"UX/UI"],
      ["The layout is clean.","布局很干净。",["is"],"UX/UI"],
      ["I am ready for feedback.","我准备好听反馈了。",["am"],"UX/UI"],
      ["The colors are too bright.","这些颜色太亮了。",["are"],"UX/UI"],
      ["He is my design manager.","他是我的设计经理。",["is"],"UX/UI"],
      ["The prototype is ready.","原型准备好了。",["is"],"UX/UI"],
      ["You are muted.","你静音了。",["are"],"UX/UI"],
      ["I am hungry.","我饿了。",["am"],"生活"],
      ["The coffee is cold.","咖啡凉了。",["is"],"生活"],
      ["We are at the airport.","我们在机场。",["are"],"旅行"],
      ["The hotel is near the metro.","酒店在地铁附近。",["is"],"旅行"],
      ["The flight is late.","航班晚点了。",["is"],"旅行"],
      ["My bag is heavy.","我的包很重。",["is"],"旅行"],
      ["The seats are comfortable.","这些座位很舒服。",["are"],"旅行"],
      ["I am free after lunch.","我午饭后有空。",["am"],"生活"],
      ["The cafe is quiet.","这家咖啡馆很安静。",["is"],"生活"]
    ],
    speak:[
      ["I am working on the homepage.","我在做首页。",["am"],"UX/UI"],
      ["The text is too small.","字太小了。",["is"],"UX/UI"],
      ["These screens are simple.","这些页面很简单。",["are"],"UX/UI"],
      ["She is open to feedback.","她愿意听反馈。",["is"],"UX/UI"],
      ["We are good with this design.","这个设计我们挺满意。",["are"],"UX/UI"],
      ["The menu is hard to find.","菜单不好找。",["is"],"UX/UI"],
      ["He is new to the team.","他是新来的。",["is"],"UX/UI"],
      ["I am okay with this color.","我觉得这个颜色可以。",["am"],"UX/UI"],
      ["The spacing is wrong.","间距不对。",["is"],"UX/UI"],
      ["This app is easy to use.","这个应用很好用。",["is"],"UX/UI"],
      ["The homepage is almost ready.","首页快好了。",["is"],"UX/UI"],
      ["My Figma file is open.","我的 Figma 文件开着。",["is"],"UX/UI"],
      ["The search button is missing.","搜索按钮不见了。",["is"],"UX/UI"],
      ["Our designs are ready to share.","我们的设计可以分享了。",["are"],"UX/UI"],
      ["You are early today.","你今天来早了。",["are"],"生活"],
      ["I am tired.","我累了。",["am"],"生活"],
      ["The food is good here.","这里的食物不错。",["is"],"生活"],
      ["I am almost there.","我快到了。",["am"],"生活"],
      ["They are helpful.","他们很热心。",["are"],"生活"],
      ["We are on the way.","我们在路上。",["are"],"旅行"],
      ["The gate is this way.","登机口在这边。",["is"],"旅行"],
      ["My seat is by the window.","我的座位靠窗。",["is"],"旅行"],
      ["The Wi-Fi is slow.","Wi-Fi 很慢。",["is"],"旅行"],
      ["The room is ready.","房间准备好了。",["is"],"旅行"],
      ["The taxi is here.","出租车到了。",["is"],"旅行"],
      ["She is on the call.","她在会上。",["is"],"UX/UI"],
      ["The icons are too small.","这些图标太小了。",["are"],"UX/UI"],
      ["I am in a meeting.","我在开会。",["am"],"UX/UI"],
      ["The link is broken.","链接坏了。",["is"],"UX/UI"],
      ["We are in the same room.","我们在同一个房间。",["are"],"UX/UI"],
      ["The form is too long.","表单太长了。",["is"],"UX/UI"],
      ["He is out of office today.","他今天不在办公室。",["is"],"UX/UI"],
      ["The price is on the page.","价格在页面上。",["is"],"UX/UI"],
      ["I am at the gate.","我在登机口。",["am"],"旅行"],
      ["The map is helpful.","地图很有用。",["is"],"旅行"],
      ["They are at the hotel.","他们在酒店。",["are"],"旅行"],
      ["The bus is full.","公交车满了。",["is"],"旅行"],
      ["I am at the cafe.","我在咖啡馆。",["am"],"生活"],
      ["The soup is hot.","汤很烫。",["is"],"生活"],
      ["The password is wrong.","密码错了。",["is"],"UX/UI"],
      ["I am on mute.","我静音了。",["am"],"UX/UI"],
      ["The draft is ready.","草稿准备好了。",["is"],"UX/UI"],
      ["We are remote today.","我们今天远程办公。",["are"],"UX/UI"],
      ["She is offline now.","她现在离线。",["is"],"UX/UI"],
      ["I am at Terminal 2.","我在 2 号航站楼。",["am"],"旅行"],
      ["The platform is crowded.","站台很挤。",["is"],"旅行"],
      ["Our seats are together.","我们的座位在一起。",["are"],"旅行"],
      ["The luggage is missing.","行李不见了。",["is"],"旅行"],
      ["I am free now.","我现在有空。",["am"],"生活"],
      ["The office is empty.","办公室空了。",["is"],"生活"],
      ["This ticket is cheap.","这张票很便宜。",["is"],"旅行"],
      ["The upload is done.","上传完成了。",["is"],"UX/UI"],
      ["The border is too thick.","边框太粗了。",["is"],"UX/UI"]
    ]
  },
  "plural": {
    listen:[
      ["There are three buttons here.","这里有三个按钮。",["buttons"],"UX/UI"],
      ["I have two screens to finish.","我有两个页面要做完。",["screens"],"UX/UI"],
      ["We need more icons.","我们需要更多图标。",["icons"],"UX/UI"],
      ["There are many colors on this page.","这个页面颜色很多。",["colors"],"UX/UI"],
      ["She has five meetings today.","她今天有五个会。",["meetings"],"UX/UI"],
      ["The users like these designs.","用户喜欢这些设计。",["designs"],"UX/UI"],
      ["I bought two tickets.","我买了两张票。",["tickets"],"旅行"],
      ["We booked three nights.","我们订了三晚。",["nights"],"旅行"],
      ["There are two elevators.","有两部电梯。",["elevators"],"旅行"],
      ["I need some batteries.","我需要一些电池。",["batteries"],"生活"],
      ["There are many cafes nearby.","附近有很多咖啡馆。",["cafes"],"生活"],
      ["He has two monitors.","他有两台显示器。",["monitors"],"UX/UI"],
      ["We tried three layouts.","我们试了三个布局。",["layouts"],"UX/UI"],
      ["The icons need labels.","图标需要文字说明。",["labels"],"UX/UI"],
      ["I have two interviews next week.","我下周有两场面试。",["interviews"],"UX/UI"],
      ["There are four steps.","有四个步骤。",["steps"],"UX/UI"],
      ["We ordered two coffees.","我们点了两杯咖啡。",["coffees"],"生活"],
      ["She packed two bags.","她带了两个包。",["bags"],"旅行"],
      ["There are many restaurants here.","这里有很多餐厅。",["restaurants"],"旅行"],
      ["The pages load slowly.","这些页面加载很慢。",["pages"],"UX/UI"]
    ],
    speak:[
      ["There are too many buttons.","按钮太多了。",["buttons"],"UX/UI"],
      ["I have three design ideas.","我有三个设计想法。",["ideas"],"UX/UI"],
      ["We need clearer icons.","我们需要更清楚的图标。",["icons"],"UX/UI"],
      ["She has two projects.","她有两个项目。",["projects"],"UX/UI"],
      ["There are five colors in this set.","这套里有五种颜色。",["colors"],"UX/UI"],
      ["I like simple menus.","我喜欢简单的菜单。",["menus"],"UX/UI"],
      ["We visited two cities.","我们去了两个城市。",["cities"],"旅行"],
      ["I need new shoes.","我需要新鞋。",["shoes"],"生活"],
      ["There are two exits.","有两个出口。",["exits"],"旅行"],
      ["He sent two files.","他发了两个文件。",["files"],"UX/UI"],
      ["We tested three versions.","我们测了三个版本。",["versions"],"UX/UI"],
      ["She has two cats.","她有两只猫。",["cats"],"生活"],
      ["There are many users.","有很多用户。",["users"],"UX/UI"],
      ["I bought two chargers.","我买了两个充电器。",["chargers"],"生活"],
      ["The hotels have pools.","这些酒店有泳池。",["pools"],"旅行"],
      ["We have a lot of meetings.","我们有很多会。",["meetings"],"UX/UI"],
      ["There are six steps.","有六个步骤。",["steps"],"UX/UI"],
      ["I need some snacks.","我需要些零食。",["snacks"],"生活"],
      ["The screens look clean.","这些页面看起来很干净。",["screens"],"UX/UI"],
      ["We found some problems.","我们发现了一些问题。",["problems"],"UX/UI"]
    ]
  },
  "article": {
    listen:[
      ["I need a bigger button.","我需要一个更大的按钮。",["a"],"UX/UI"],
      ["Can you open the Figma file?","帮我打开 Figma 文件？",["the"],"UX/UI"],
      ["She is a UI designer.","她是 UI 设计师。",["a"],"UX/UI"],
      ["I have a question.","我有个问题。",["a"],"UX/UI"],
      ["Can you fix the layout?","你能修一下布局吗？",["the"],"UX/UI"],
      ["He wants a cleaner design.","他想要更干净的设计。",["a"],"UX/UI"],
      ["Can you close the tab?","帮我把这个标签页关一下？",["the"],"UX/UI"],
      ["This is an easy change.","这是个简单的修改。",["an"],"UX/UI"],
      ["I need a short break.","我得歇一会儿。",["a"],"生活"],
      ["Where is the exit?","出口在哪？",["the"],"旅行"],
      ["He booked a room.","他订了个房间。",["a"],"旅行"],
      ["Can I get a receipt?","能给我张收据吗？",["a"],"旅行"],
      ["I'd like a coffee.","我想要杯咖啡。",["a"],"生活"],
      ["Take the elevator.","坐电梯。",["the"],"旅行"],
      ["She sent an email.","她发了封邮件。",["an"],"UX/UI"],
      ["I want a window seat.","我想要靠窗座位。",["a"],"旅行"],
      ["Open the prototype.","打开原型。",["the"],"UX/UI"],
      ["This is an old icon.","这是个旧图标。",["an"],"UX/UI"],
      ["We need a plan.","我们得有个计划。",["a"],"UX/UI"],
      ["Where is the gate?","登机口在哪？",["the"],"旅行"]
    ],
    speak:[
      ["I have a deadline today.","我今天有个 deadline。",["a"],"UX/UI"],
      ["Can you check the colors?","帮我看一下颜色？",["the"],"UX/UI"],
      ["She is a UX designer.","她是 UX 设计师。",["a"],"UX/UI"],
      ["I need a quieter place.","我需要个更安静的地方。",["a"],"生活"],
      ["Can you save the draft?","帮我存一下草稿？",["the"],"UX/UI"],
      ["He drew an icon.","他画了个图标。",["an"],"UX/UI"],
      ["Can I have a menu?","能给我份菜单吗？",["a"],"旅行"],
      ["Follow the signs.","跟着标志走。",["the"],"旅行"],
      ["I made a mistake.","我犯了个错。",["a"],"生活"],
      ["This is an important screen.","这是个重要页面。",["an"],"UX/UI"],
      ["Let's book a table.","我们订个桌吧。",["a"],"旅行"],
      ["Can you read the message?","帮我看一下这条消息？",["the"],"生活"],
      ["I want a simple design.","我想要简单的设计。",["a"],"UX/UI"],
      ["Can you open the homepage?","帮我打开首页？",["the"],"UX/UI"],
      ["She needs a charger.","她需要个充电器。",["a"],"生活"],
      ["Where is the bathroom?","洗手间在哪？",["the"],"旅行"],
      ["It was an early flight.","那是早班飞机。",["an"],"旅行"],
      ["I found an issue.","我发现了个问题。",["an"],"UX/UI"],
      ["Can you close the window?","帮我关一下窗户？",["the"],"生活"],
      ["He wants an upgrade.","他想升级一下。",["an"],"旅行"]
    ]
  },
  "present-s": {
    listen:[
      ["She designs mobile apps.","她设计手机应用。",["designs"],"UX/UI"],
      ["He uses Figma every day.","他每天用 Figma。",["uses"],"UX/UI"],
      ["The app looks clean.","这个应用看起来很干净。",["looks"],"UX/UI"],
      ["She likes simple layouts.","她喜欢简单布局。",["likes"],"UX/UI"],
      ["He starts work at nine.","他九点开始工作。",["starts"],"UX/UI"],
      ["She checks email early.","她很早查邮件。",["checks"],"UX/UI"],
      ["The train leaves at nine.","火车九点开。",["leaves"],"旅行"],
      ["He drinks coffee every morning.","他每天早上喝咖啡。",["drinks"],"生活"],
      ["She speaks English in meetings.","她开会时说英语。",["speaks"],"UX/UI"],
      ["The store closes at ten.","商店十点关门。",["closes"],"生活"],
      ["He takes the metro to work.","他坐地铁上班。",["takes"],"生活"],
      ["She cooks simple dinners.","她做简单晚饭。",["cooks"],"生活"],
      ["The flight lands at noon.","航班中午降落。",["lands"],"旅行"],
      ["He sends designs on Friday.","他周五发设计稿。",["sends"],"UX/UI"],
      ["She meets the team on Mondays.","她周一和团队开会。",["meets"],"UX/UI"],
      ["The hotel offers breakfast.","酒店有早餐。",["offers"],"旅行"],
      ["He travels for work sometimes.","他有时出差。",["travels"],"旅行"],
      ["She replies quickly.","她回复很快。",["replies"],"UX/UI"],
      ["The page needs more space.","这个页面需要更多空间。",["needs"],"UX/UI"],
      ["He orders coffee before meetings.","他开会前点咖啡。",["orders"],"生活"]
    ],
    speak:[
      ["She draws icons carefully.","她仔细画图标。",["draws"],"UX/UI"],
      ["He likes this color.","他喜欢这个颜色。",["likes"],"UX/UI"],
      ["The button works well.","这个按钮好用。",["works"],"UX/UI"],
      ["She reviews designs every week.","她每周评审设计。",["reviews"],"UX/UI"],
      ["He walks to the office.","他走路上班。",["walks"],"生活"],
      ["The cafe opens early.","咖啡馆开得早。",["opens"],"生活"],
      ["She reads design books.","她看设计书。",["reads"],"UX/UI"],
      ["He fixes small UI problems.","他修小的界面问题。",["fixes"],"UX/UI"],
      ["The bus stops here.","公交在这儿停。",["stops"],"旅行"],
      ["She teaches new designers.","她带新设计师。",["teaches"],"UX/UI"],
      ["He joins calls on time.","他准时进会。",["joins"],"UX/UI"],
      ["The museum opens at nine.","博物馆九点开门。",["opens"],"旅行"],
      ["She changes colors often.","她经常改颜色。",["changes"],"UX/UI"],
      ["He packs light for trips.","他旅行轻装。",["packs"],"旅行"],
      ["The app supports dark mode.","这个应用支持深色模式。",["supports"],"UX/UI"],
      ["She always asks for feedback.","她总是要反馈。",["asks"],"UX/UI"],
      ["He books hotels early.","他很早订酒店。",["books"],"旅行"],
      ["The taxi waits outside.","出租车在外面等。",["waits"],"旅行"],
      ["She makes clean screens.","她做出干净的页面。",["makes"],"UX/UI"],
      ["He needs more time.","他需要更多时间。",["needs"],"生活"]
    ]
  },
  "present-neg": {
    listen:[
      ["I don't like this color.","我不喜欢这个颜色。",["don't","like"],"UX/UI"],
      ["She doesn't need more icons.","她不需要更多图标。",["doesn't","need"],"UX/UI"],
      ["Do you use Figma?","你用 Figma 吗？",["Do","use"],"UX/UI"],
      ["Does this button work?","这个按钮能用吗？",["Does","work"],"UX/UI"],
      ["He doesn't like busy pages.","他不喜欢花哨的页面。",["doesn't","like"],"UX/UI"],
      ["I don't have time today.","我今天没时间。",["don't","have"],"生活"],
      ["We don't work on weekends.","我们周末不上班。",["don't","work"],"生活"],
      ["Do you have Wi-Fi here?","这里有 Wi-Fi 吗？",["Do","have"],"旅行"],
      ["Does this train stop at the airport?","这趟车在机场停吗？",["Does","stop"],"旅行"],
      ["She doesn't mind a window seat.","她不介意靠窗座位。",["doesn't","mind"],"旅行"],
      ["I don't drink coffee at night.","我晚上不喝咖啡。",["don't","drink"],"生活"],
      ["He doesn't understand this feedback.","他没听懂这个反馈。",["doesn't","understand"],"UX/UI"],
      ["Do you want tea?","你想喝茶吗？",["Do","want"],"生活"],
      ["Does she speak English?","她会说英语吗？",["Does","speak"],"UX/UI"],
      ["We don't change colors lightly.","我们不随便改颜色。",["don't","change"],"UX/UI"],
      ["I don't know the gate number.","我不知道登机口号。",["don't","know"],"旅行"],
      ["She doesn't join late calls.","她不参加很晚的会。",["doesn't","join"],"UX/UI"],
      ["Do you accept cards?","你们收卡吗？",["Do","accept"],"旅行"],
      ["He doesn't use that old style.","他不用那种旧风格。",["doesn't","use"],"UX/UI"],
      ["We don't need a dark background.","我们不需要深色背景。",["don't","need"],"UX/UI"]
    ],
    speak:[
      ["I don't want a complex layout.","我不想要复杂布局。",["don't","want"],"UX/UI"],
      ["She doesn't like small text.","她不喜欢小字。",["doesn't","like"],"UX/UI"],
      ["Do you need help?","你需要帮忙吗？",["Do","need"],"生活"],
      ["Does the menu look clear?","菜单看起来清楚吗？",["Does","look"],"UX/UI"],
      ["He doesn't skip design reviews.","他不跳过设计评审。",["doesn't","skip"],"UX/UI"],
      ["I don't book late flights.","我不订很晚的航班。",["don't","book"],"旅行"],
      ["We don't present without a prototype.","我们没有原型就不演示。",["don't","present"],"UX/UI"],
      ["Do you prefer aisle seats?","你更喜欢靠过道座位吗？",["Do","prefer"],"旅行"],
      ["She doesn't drink tea.","她不喝茶。",["doesn't","drink"],"生活"],
      ["I don't mind a short walk.","我不介意走一小段路。",["don't","mind"],"旅行"],
      ["He doesn't send unfinished work.","他不发没做完的稿。",["doesn't","send"],"UX/UI"],
      ["Do you have a quieter table?","有更安静的桌子吗？",["Do","have"],"旅行"],
      ["We don't launch without feedback.","我们没有反馈就不上线。",["don't","launch"],"UX/UI"],
      ["Does the hotel have breakfast?","酒店有早餐吗？",["Does","have"],"旅行"],
      ["I don't check Slack at night.","我晚上不看 Slack。",["don't","check"],"生活"],
      ["She doesn't like nested menus.","她不喜欢多层菜单。",["doesn't","like"],"UX/UI"],
      ["Do you need a charger?","你需要充电器吗？",["Do","need"],"生活"],
      ["He doesn't leave early.","他不早退。",["doesn't","leave"],"生活"],
      ["We don't use too many colors.","我们不用太多颜色。",["don't","use"],"UX/UI"],
      ["I don't understand this note.","我看不懂这条备注。",["don't","understand"],"UX/UI"]
    ]
  },
  "present-cont": {
    listen:[
      ["I am working on the homepage.","我在做首页。",["am","working"],"UX/UI"],
      ["She is fixing the colors.","她在改颜色。",["is","fixing"],"UX/UI"],
      ["We are making the buttons bigger.","我们在把按钮做大。",["are","making"],"UX/UI"],
      ["He is checking the spacing.","他在看间距。",["is","checking"],"UX/UI"],
      ["They are drawing new icons.","他们在画新图标。",["are","drawing"],"UX/UI"],
      ["I am waiting for feedback.","我在等反馈。",["am","waiting"],"UX/UI"],
      ["She is presenting her design.","她在讲她的设计。",["is","presenting"],"UX/UI"],
      ["We are testing the prototype.","我们在测原型。",["are","testing"],"UX/UI"],
      ["He is talking to users.","他在和用户聊。",["is","talking"],"UX/UI"],
      ["I am packing for my trip.","我在收拾旅行行李。",["am","packing"],"旅行"],
      ["She is looking for the gate.","她在找登机口。",["is","looking"],"旅行"],
      ["We are ordering coffee.","我们在点咖啡。",["are","ordering"],"生活"],
      ["He is booking a hotel.","他在订酒店。",["is","booking"],"旅行"],
      ["I am sharing the Figma link.","我在发 Figma 链接。",["am","sharing"],"UX/UI"],
      ["She is changing the text size.","她在改字号。",["is","changing"],"UX/UI"],
      ["We are reviewing the screens.","我们在看这些页面。",["are","reviewing"],"UX/UI"],
      ["He is having lunch now.","他在吃午饭。",["is","having"],"生活"],
      ["I am checking in online.","我在网上值机。",["am","checking"],"旅行"],
      ["They are joining the call.","他们在进会。",["are","joining"],"UX/UI"],
      ["The page is loading.","页面正在加载。",["is","loading"],"UX/UI"]
    ],
    speak:[
      ["I am updating the icons.","我在更新图标。",["am","updating"],"UX/UI"],
      ["She is cleaning up the layout.","她在整理布局。",["is","cleaning"],"UX/UI"],
      ["We are preparing for the design review.","我们在准备设计评审。",["are","preparing"],"UX/UI"],
      ["He is writing design notes.","他在写设计备注。",["is","writing"],"UX/UI"],
      ["I am trying a simpler version.","我在试更简单的版本。",["am","trying"],"UX/UI"],
      ["She is asking for feedback.","她在要反馈。",["is","asking"],"UX/UI"],
      ["We are looking for a taxi.","我们在找出租车。",["are","looking"],"旅行"],
      ["He is buying a ticket.","他在买票。",["is","buying"],"旅行"],
      ["I am cooking dinner.","我在做晚饭。",["am","cooking"],"生活"],
      ["They are walking to the station.","他们正走去车站。",["are","walking"],"旅行"],
      ["She is saving the file.","她在保存文件。",["is","saving"],"UX/UI"],
      ["We are choosing a color.","我们在选颜色。",["are","choosing"],"UX/UI"],
      ["He is moving the button.","他在移动按钮。",["is","moving"],"UX/UI"],
      ["I am reading your notes.","我在看你的备注。",["am","reading"],"UX/UI"],
      ["She is resting after the flight.","她下飞机后在休息。",["is","resting"],"旅行"],
      ["We are finding a quiet cafe.","我们在找安静的咖啡馆。",["are","finding"],"生活"],
      ["He is sending the design now.","他正在发设计稿。",["is","sending"],"UX/UI"],
      ["I am learning new English words.","我在学新英语单词。",["am","learning"],"生活"],
      ["They are waiting at the gate.","他们在登机口等。",["are","waiting"],"旅行"],
      ["The file is uploading.","文件正在上传。",["is","uploading"],"UX/UI"]
    ]
  },
  "past": {
    listen:[
      ["I finished the homepage yesterday.","我昨天做完了首页。",["finished"],"UX/UI"],
      ["She changed the button color.","她改了按钮颜色。",["changed"],"UX/UI"],
      ["We sent the Figma link.","我们发了 Figma 链接。",["sent"],"UX/UI"],
      ["He got good feedback.","他收到了不错的反馈。",["got"],"UX/UI"],
      ["I made the text bigger.","我把字放大了。",["made"],"UX/UI"],
      ["She fixed the spacing.","她修好了间距。",["fixed"],"UX/UI"],
      ["We showed three design ideas.","我们展示了三个设计想法。",["showed"],"UX/UI"],
      ["He talked to two users.","他和两位用户聊了。",["talked"],"UX/UI"],
      ["I booked a hotel near the station.","我订了车站附近的酒店。",["booked"],"旅行"],
      ["She missed the morning flight.","她错过了早班飞机。",["missed"],"旅行"],
      ["We bought a new charger.","我们买了个新充电器。",["bought"],"生活"],
      ["He ordered lunch for the team.","他给团队点了午饭。",["ordered"],"生活"],
      ["I updated the icons last night.","我昨晚更新了图标。",["updated"],"UX/UI"],
      ["She left early yesterday.","她昨天早走了。",["left"],"生活"],
      ["We took a taxi to the hotel.","我们打车去了酒店。",["took"],"旅行"],
      ["He joined the design review.","他参加了设计评审。",["joined"],"UX/UI"],
      ["I liked the second version.","我喜欢第二版。",["liked"],"UX/UI"],
      ["She packed her bag.","她收拾好了包。",["packed"],"旅行"],
      ["We arrived on time.","我们准时到了。",["arrived"],"旅行"],
      ["He tried a new layout.","他试了新布局。",["tried"],"UX/UI"],
      ["I was busy yesterday.","我昨天很忙。",["was"],"生活"],
      ["She was on a call.","她当时在通话。",["was"],"UX/UI"],
      ["He was late this morning.","他今早迟到了。",["was"],"生活"],
      ["The button was too small.","那个按钮当时太小了。",["was"],"UX/UI"],
      ["The cafe was quiet.","那家咖啡馆当时很安静。",["was"],"生活"],
      ["It was a long flight.","那是趟长途航班。",["was"],"旅行"],
      ["We were at the airport early.","我们很早就到机场了。",["were"],"旅行"],
      ["They were in the workshop.","他们当时在工作坊。",["were"],"UX/UI"],
      ["You were muted.","你当时静音了。",["were"],"UX/UI"],
      ["The colors were too bright.","那些颜色当时太亮了。",["were"],"UX/UI"]
    ],
    speak:[
      ["I cleaned up the homepage.","我整理了首页。",["cleaned"],"UX/UI"],
      ["She moved the search button.","她移动了搜索按钮。",["moved"],"UX/UI"],
      ["We chose a simpler color.","我们选了更简单的颜色。",["chose"],"UX/UI"],
      ["He saved the file.","他保存了文件。",["saved"],"UX/UI"],
      ["I asked for more feedback.","我要了更多反馈。",["asked"],"UX/UI"],
      ["She drew three icons.","她画了三个图标。",["drew"],"UX/UI"],
      ["We checked in online.","我们网上值机了。",["checked"],"旅行"],
      ["He found the gate.","他找到了登机口。",["found"],"旅行"],
      ["I paid the bill.","我付了账。",["paid"],"生活"],
      ["She called her manager.","她给经理打了电话。",["called"],"UX/UI"],
      ["We tested the prototype.","我们测了原型。",["tested"],"UX/UI"],
      ["He changed the menu.","他改了菜单。",["changed"],"UX/UI"],
      ["I lost my ticket at the station.","我在车站把票弄丢了。",["lost"],"旅行"],
      ["She bought two coffees.","她买了两杯咖啡。",["bought"],"生活"],
      ["We stayed near the metro.","我们住在地铁附近。",["stayed"],"旅行"],
      ["He opened the Figma file.","他打开了 Figma 文件。",["opened"],"UX/UI"],
      ["I closed the extra tabs.","我关掉了多余标签页。",["closed"],"生活"],
      ["She replied to my notes.","她回复了我的备注。",["replied"],"UX/UI"],
      ["We walked to the cafe.","我们走到了咖啡馆。",["walked"],"生活"],
      ["He started a new screen.","他开始做新页面了。",["started"],"UX/UI"],
      ["I was ready for feedback.","我当时准备好听反馈了。",["was"],"UX/UI"],
      ["She was in Shanghai last week.","她上周在上海。",["was"],"旅行"],
      ["He was new to the team.","他当时是新来的。",["was"],"UX/UI"],
      ["The meeting was useful.","那次会议很有用。",["was"],"UX/UI"],
      ["The hotel was near the metro.","那家酒店在地铁附近。",["was"],"旅行"],
      ["We were good with the design.","我们当时觉得设计可以。",["were"],"UX/UI"],
      ["They were almost ready.","他们当时快准备好了。",["were"],"UX/UI"],
      ["You were right about the layout.","布局那件事你说对了。",["were"],"UX/UI"],
      ["The screens were simple.","那些页面当时很简单。",["were"],"UX/UI"],
      ["My notes were unclear.","我的备注当时不清楚。",["were"],"UX/UI"]
    ]
  },
  "past-neg": {
    listen:[
      ["I didn't finish the icons.","我没做完图标。",["didn't","finish"],"UX/UI"],
      ["She didn't send the design.","她没发设计稿。",["didn't","send"],"UX/UI"],
      ["Did you join the design review?","你参加设计评审了吗？",["Did","join"],"UX/UI"],
      ["We didn't like the first version.","我们不喜欢第一版。",["didn't","like"],"UX/UI"],
      ["He didn't change the layout.","他没改布局。",["didn't","change"],"UX/UI"],
      ["I didn't book a hotel.","我没订酒店。",["didn't","book"],"旅行"],
      ["She didn't pack her charger.","她没带充电器。",["didn't","pack"],"旅行"],
      ["Did you find the gate?","你找到登机口了吗？",["Did","find"],"旅行"],
      ["We didn't get the email.","我们没收到邮件。",["didn't","get"],"生活"],
      ["He didn't see your message.","他没看到你的消息。",["didn't","see"],"生活"],
      ["I didn't understand the feedback.","我没听懂那个反馈。",["didn't","understand"],"UX/UI"],
      ["Did they share the Figma link?","他们发了 Figma 链接吗？",["Did","share"],"UX/UI"],
      ["She didn't make the text bigger.","她没把字放大。",["didn't","make"],"UX/UI"],
      ["We didn't miss the flight.","我们没误机。",["didn't","miss"],"旅行"],
      ["He didn't join the call.","他没进会。",["didn't","join"],"UX/UI"],
      ["I didn't buy a ticket yet.","我还没买票。",["didn't","buy"],"旅行"],
      ["Did you save the file?","你保存文件了吗？",["Did","save"],"UX/UI"],
      ["She didn't leave early.","她没有早走。",["didn't","leave"],"生活"],
      ["We didn't change the color.","我们没改颜色。",["didn't","change"],"UX/UI"],
      ["He didn't open your note.","他没打开你的备注。",["didn't","open"],"UX/UI"]
    ],
    speak:[
      ["I didn't finish last night.","我昨晚没做完。",["didn't","finish"],"UX/UI"],
      ["She didn't reply yet.","她还没回复。",["didn't","reply"],"生活"],
      ["Did you see my design?","你看了我的设计吗？",["Did","see"],"UX/UI"],
      ["We didn't come to lunch.","我们没来吃午饭。",["didn't","come"],"生活"],
      ["He didn't save the draft.","他没保存草稿。",["didn't","save"],"UX/UI"],
      ["I didn't call back.","我没回电话。",["didn't","call"],"生活"],
      ["Did you get my email?","你收到我的邮件了吗？",["Did","get"],"生活"],
      ["She didn't book a window seat.","她没订靠窗座位。",["didn't","book"],"旅行"],
      ["We didn't test the prototype.","我们没测原型。",["didn't","test"],"UX/UI"],
      ["He didn't like that icon.","他不喜欢那个图标。",["didn't","like"],"UX/UI"],
      ["I didn't pack enough clothes.","我带的衣服不够。",["didn't","pack"],"旅行"],
      ["Did they approve the design?","他们批准设计了吗？",["Did","approve"],"UX/UI"],
      ["She didn't ignore my notes.","她没有忽视我的备注。",["didn't","ignore"],"UX/UI"],
      ["We didn't ship without a review.","没有评审我们没上线。",["didn't","ship"],"UX/UI"],
      ["He didn't miss the meeting.","他没错过会议。",["didn't","miss"],"UX/UI"],
      ["I didn't update the icons.","我没更新图标。",["didn't","update"],"UX/UI"],
      ["Did you confirm the gate?","你确认登机口了吗？",["Did","confirm"],"旅行"],
      ["She didn't present without slides.","她没有演示稿就不讲。",["didn't","present"],"UX/UI"],
      ["We didn't leave the bag.","我们没把包落下。",["didn't","leave"],"旅行"],
      ["He didn't check in online.","他没网上值机。",["didn't","check"],"旅行"]
    ]
  },
  "future": {
    listen:[
      ["I will send the design today.","我今天会发设计稿。",["will"],"UX/UI"],
      ["She is going to make the button bigger.","她打算把按钮做大。",["is","going"],"UX/UI"],
      ["We will share the Figma link.","我们会分享 Figma 链接。",["will"],"UX/UI"],
      ["He is going to ask for feedback.","他打算要反馈。",["is","going"],"UX/UI"],
      ["I will join the design review.","我会参加设计评审。",["will"],"UX/UI"],
      ["She is going to try a simpler layout.","她打算试试更简单的布局。",["is","going"],"UX/UI"],
      ["We will book a flight tomorrow.","我们明天会订机票。",["will"],"旅行"],
      ["He is going to check in online later.","他打算稍后网上值机。",["is","going"],"旅行"],
      ["I will take a short break.","我会休息一下。",["will"],"生活"],
      ["She is going to call you after lunch.","她打算午饭后给你打电话。",["is","going"],"生活"],
      ["We will change the color.","我们会改颜色。",["will"],"UX/UI"],
      ["He is going to update the icons.","他打算更新图标。",["is","going"],"UX/UI"],
      ["I will meet you at the gate.","我会在登机口见你。",["will"],"旅行"],
      ["She is going to pack tonight.","她打算今晚收拾行李。",["is","going"],"旅行"],
      ["We will finish this screen tomorrow.","我们明天会做完这个页面。",["will"],"UX/UI"],
      ["He is going to show three ideas.","他打算展示三个想法。",["is","going"],"UX/UI"],
      ["I will order coffee for us.","我会给我们点咖啡。",["will"],"生活"],
      ["She is going to stay near the metro.","她打算住在地铁附近。",["is","going"],"旅行"],
      ["We will talk to users next week.","我们下周会和用户聊。",["will"],"UX/UI"],
      ["He is going to clean up the page.","他打算整理这个页面。",["is","going"],"UX/UI"]
    ],
    speak:[
      ["I will send my notes tonight.","我今晚会发备注。",["will"],"UX/UI"],
      ["She is going to fix the spacing.","她打算修好间距。",["is","going"],"UX/UI"],
      ["We will join the call at three.","我们三点会进会。",["will"],"UX/UI"],
      ["He is going to draw new icons.","他打算画新图标。",["is","going"],"UX/UI"],
      ["I will take a break after this.","做完这个我会休息一下。",["will"],"生活"],
      ["She is going to save the file.","她打算保存文件。",["is","going"],"UX/UI"],
      ["We will check the gate again.","我们会再看一眼登机口。",["will"],"旅行"],
      ["He is going to help with the review.","他打算帮忙做评审。",["is","going"],"UX/UI"],
      ["I will try a quieter cafe.","我会试一家更安静的咖啡馆。",["will"],"生活"],
      ["She is going to rewrite the text.","她打算重写文案。",["is","going"],"UX/UI"],
      ["We will decide tomorrow.","我们明天决定。",["will"],"UX/UI"],
      ["He is going to travel next month.","他打算下个月旅行。",["is","going"],"旅行"],
      ["I will make the menu clearer.","我会把菜单做得更清楚。",["will"],"UX/UI"],
      ["She is going to collect feedback.","她打算收集反馈。",["is","going"],"UX/UI"],
      ["We will pack light.","我们会轻装出行。",["will"],"旅行"],
      ["He is going to move the button.","他打算移动按钮。",["is","going"],"UX/UI"],
      ["I will ask for edit access.","我会要编辑权限。",["will"],"UX/UI"],
      ["She is going to test the prototype.","她打算测原型。",["is","going"],"UX/UI"],
      ["We will land before dinner.","我们会在晚饭前落地。",["will"],"旅行"],
      ["He is going to present on Friday.","他打算周五演示。",["is","going"],"UX/UI"]
    ]
  },
  "present-perfect": {
    listen:[
      ["I have finished the new screen.","我已经做完新页面了。",["have","finished"],"UX/UI"],
      ["She has sent the Figma file.","她已经发了 Figma 文件。",["has","sent"],"UX/UI"],
      ["We have changed the colors.","我们已经改了颜色。",["have","changed"],"UX/UI"],
      ["He has talked to the users.","他已经和这些用户聊过了。",["has","talked"],"UX/UI"],
      ["I have seen your design notes.","我看过你的设计备注了。",["have","seen"],"UX/UI"],
      ["They have booked the hotel.","他们已经订了酒店。",["have","booked"],"旅行"],
      ["She has packed her bag.","她已经收拾好行李了。",["has","packed"],"旅行"],
      ["We have checked in already.","我们已经值机了。",["have","checked"],"旅行"],
      ["He has made a simpler version.","他已经做了一个更简单的版本。",["has","made"],"UX/UI"],
      ["I have received feedback from my manager.","我已经收到经理的反馈了。",["have","received"],"UX/UI"],
      ["She has finished the icons.","她已经做完这些图标了。",["has","finished"],"UX/UI"],
      ["We have tested the prototype.","我们已经测过原型了。",["have","tested"],"UX/UI"],
      ["He has fixed the spacing.","他已经修好间距了。",["has","fixed"],"UX/UI"],
      ["I have seen this design before.","我以前见过这个设计。",["have","seen"],"UX/UI"],
      ["She has read your message.","她读过你的消息了。",["has","read"],"生活"],
      ["We have met before.","我们以前见过。",["have","met"],"生活"],
      ["He has done the homepage.","他已经做完首页了。",["has","done"],"UX/UI"],
      ["I have lost my key.","我把钥匙丢了。",["have","lost"],"生活"],
      ["They have arrived at the hotel.","他们到酒店了。",["have","arrived"],"旅行"],
      ["She has joined the team.","她已经加入团队了。",["has","joined"],"UX/UI"]
    ],
    speak:[
      ["I have finished the design.","我已经完成设计了。",["have","finished"],"UX/UI"],
      ["She has sent the file.","她已经发了文件。",["has","sent"],"UX/UI"],
      ["We have booked the flight.","我们已经订了机票。",["have","booked"],"旅行"],
      ["He has fixed the button.","他已经修好按钮了。",["has","fixed"],"UX/UI"],
      ["I have seen the demo.","我看过演示了。",["have","seen"],"UX/UI"],
      ["They have arrived.","他们到了。",["have","arrived"],"旅行"],
      ["She has updated the app design.","她已经更新了应用设计。",["has","updated"],"UX/UI"],
      ["We have tried that layout.","我们试过那个布局了。",["have","tried"],"UX/UI"],
      ["He has left the office.","他已经离开办公室了。",["has","left"],"生活"],
      ["I have made a decision.","我已经做了一个决定。",["have","made"],"生活"],
      ["She has done the user interviews.","她已经做完用户访谈了。",["has","done"],"UX/UI"],
      ["We have shared the prototype.","我们已经分享了原型。",["have","shared"],"UX/UI"],
      ["He has read your notes.","他已经看了你那些备注。",["has","read"],"UX/UI"],
      ["I have packed my bag.","我已经收拾好包了。",["have","packed"],"旅行"],
      ["They have started already.","他们已经开始了。",["have","started"],"UX/UI"],
      ["She has called the hotel.","她已经给酒店打过电话了。",["has","called"],"旅行"],
      ["We have paid the bill.","我们已经付了账。",["have","paid"],"旅行"],
      ["He has joined the call.","他已经进会了。",["has","joined"],"UX/UI"],
      ["I have forgotten my password.","我把密码忘了。",["have","forgotten"],"生活"],
      ["She has chosen a new color.","她已经选了一个新颜色。",["has","chosen"],"UX/UI"]
    ]
  }
};
UNITS.forEach(u=>{
  const ex = EXTRA[u.id]; if(!ex) return;
  ["listen","speak"].forEach(m=>{
    const seen=new Set((u[m]||[]).map(s=>normEn(s&&s.en)).filter(Boolean));
    (ex[m]||[]).forEach(t=>{
      const en=t[0], n=normEn(en);
      if(!en||!n||seen.has(n)) return; // 跳过与单元原句重复的 EXTRA
      seen.add(n);
      u[m].push({en, cn:t[1], focus:t[2], scene:t[3], note:t[4]||u.cnDesc});
    });
  });
});

/* ============================================================
   SENTENCE GENERATOR — composes endless fresh, grammatically-correct
   sentences from a shared subject pool + per-unit predicate/template
   pools. Grammar (the focus words) is fixed by construction, so it's
   always correct; variety comes from the combinations.
   ============================================================ */
/** Bump this when sentence banks change — clears old cached nonsense batches. */
const BANK_VER = 24;
/** Old bank EN → corrected EN (also remaps 错题集 keys on load). */
const FAV_CN_FIXES = {
  "I'm just going to **scroll on my phone** to unwind": "我就刷刷手机放松一下。",
  "I'm just going to scroll on my phone to unwind": "我就刷刷手机放松一下。",
  "I'm just going to scroll on my phone to unwind.": "我就刷刷手机放松一下。",
  "Is it a bit messy with sketches and notes?": "是不是有点乱，到处是草图和笔记？",
  "s** it a bit messy with sketches and notes?": "是不是有点乱，到处是草图和笔记？"
};
function applyFavCnFixes(){
  const map=FAV_CN_FIXES||{};
  if(!state.customFavs) return;
  Object.keys(map).forEach(en=>{
    const snap=state.customFavs[en];
    if(snap) snap.cn=map[en];
  });
  // also match by stripped markdown / missing period
  Object.keys(state.customFavs).forEach(en=>{
    const snap=state.customFavs[en];
    if(!snap||!en) return;
    if(/我只想刷刷手机/.test(String(snap.cn||"")) && /scroll on my phone/i.test(en) && /unwind/i.test(en)){
      snap.cn="我就刷刷手机放松一下。";
    }
    if((/画了草图/.test(String(snap.cn||"")) || /s\*\* it a bit messy/i.test(en)) && /messy/i.test(en) && /sketches/i.test(en)){
      snap.cn="是不是有点乱，到处是草图和笔记？";
    }
  });
}

const BANK_EN_FIXES = {
  "s** it a bit messy with sketches and notes?": "Is it a bit messy with sketches and notes?",
  "The session is expired.": "The session has expired.",
  "The refund is processing.": "The refund is being processed.",
  "The assets are exported.": "The assets are ready to export.",
  "Please close the window.": "Can you close the window?",
  "Please open the Figma file.": "Can you open the Figma file?",
  "Please check the colors.": "Can you check the colors?",
  "Close the tab, please.": "Can you close the tab?",
  "It is an old icon.": "This is an old icon.",
  "We are happy with this design.": "We are good with this design.",
  "I am happy with this version.": "I am good with this version.",
  "He was happy with the design.": "He was good with the design.",
  "We were happy with the design.": "We were good with the design.",
  "The radius is too round.": "The radius is too big.",
  "The bill is included.": "The service charge is included.",
  "Our team meets the team on Mondays.": "Our team meets every Monday.",
  "She has done the research talks.": "She has done the user interviews.",
  "I lost my ticket briefly.": "I lost my ticket at the station.",
  "I have lost my password.": "I have forgotten my password.",
  "I have got feedback from my manager.": "I have received feedback from my manager.",
  "You are checking my email.": "You are checking your email.",
  "You are charging my phone.": "You are charging your phone.",
  "We are checking my email.": "We are checking our email.",
  "We are charging my phone.": "We are charging our phones.",
  "They are checking my email.": "They are checking their email.",
  "They are charging my phone.": "They are charging their phones.",
  "He is checking my email.": "He is checking his email.",
  "He is charging my phone.": "He is charging his phone.",
  "She is checking my email.": "She is checking her email.",
  "She is charging my phone.": "She is charging her phone.",
  "Our team cooks simple dinners.": "Our team keeps designs simple.",
  "Our team leaves home at eight.": "Our team finishes at six.",
  "Our team takes the metro to work.": "Our team works from home on Fridays.",
  "He had grown vegetables before he had a garden.": "He had grown some vegetables before he moved.",
  "We had collected the feedback before Monday.": "We had collected the feedback by Monday.",
  "She had checked all the screens before Friday.": "She had checked all the screens by Friday.",
  // Kokoro 在 "specific TV | show" 之间硬停 0.3s，换语序绕开（2026-09-21）
  "Is there a specific TV show you are really into right now?": "Are you really into a specific TV show right now?",
  "I'd rather walk.": "I'd rather walk than wait for the bus.",
  "I can't help laughing.": "I can't help laughing at that photo.",
  "The sooner, the better.": "The sooner we book, the cheaper it is.",
  "It sounds like fun.": "It sounds like a fun weekend plan.",
  "I'm about to leave.": "I'm about to leave for work.",
  "I'm having trouble sleeping.": "I'm having trouble sleeping these days.",
};

const PEOPLE = [
  {en:"I",cn:"我",be:"am",sg:false,have:"have"},
  {en:"You",cn:"你",be:"are",sg:false,have:"have"},
  {en:"We",cn:"我们",be:"are",sg:false,have:"have"},
  {en:"They",cn:"他们",be:"are",sg:false,have:"have"},
  {en:"He",cn:"他",be:"is",sg:true,have:"has"},
  {en:"She",cn:"她",be:"is",sg:true,have:"has"},
  {en:"My manager",cn:"我的经理",be:"is",sg:true,have:"has"},
  {en:"The designer",cn:"那位设计师",be:"is",sg:true,have:"has"},
  {en:"Our team",cn:"我们团队",be:"is",sg:true,have:"has"}
];
const SUBJ = PEOPLE;
const SCENES = ["UX/UI","生活","旅行"];
const rnd = a => a[Math.floor(Math.random()*a.length)];

/** Only complete, natural sentences — never subject×phrase mashups. */
const SENTENCE_BANKS = {
  "be": [
    {en:"I am a UI designer.", cn:"我是 UI 设计师。", focus:["am"], scene:"UX/UI"},
    {en:"The button is too small.", cn:"这个按钮太小了。", focus:["is"], scene:"UX/UI"},
    {en:"The icons are unclear.", cn:"这些图标不清楚。", focus:["are"], scene:"UX/UI"},
    {en:"She is in a design meeting.", cn:"她在开设计会。", focus:["is"], scene:"UX/UI"},
    {en:"We are almost done.", cn:"我们快做完了。", focus:["are"], scene:"UX/UI"},
    {en:"The layout is clean.", cn:"这个布局很干净。", focus:["is"], scene:"UX/UI"},
    {en:"I am ready for feedback.", cn:"我准备好听反馈了。", focus:["am"], scene:"UX/UI"},
    {en:"The colors are too bright.", cn:"这些颜色太亮了。", focus:["are"], scene:"UX/UI"},
    {en:"He is my design manager.", cn:"他是我的设计经理。", focus:["is"], scene:"UX/UI"},
    {en:"The prototype is ready.", cn:"这个原型准备好了。", focus:["is"], scene:"UX/UI"},
    {en:"You are muted.", cn:"你静音了。", focus:["are"], scene:"UX/UI"},
    {en:"The text is too small.", cn:"这段文字太小了。", focus:["is"], scene:"UX/UI"},
    {en:"These screens are simple.", cn:"这些页面很简单。", focus:["are"], scene:"UX/UI"},
    {en:"I am okay with this color.", cn:"我觉得这个颜色可以。", focus:["am"], scene:"UX/UI"},
    {en:"The spacing is wrong.", cn:"这个间距不对。", focus:["is"], scene:"UX/UI"},
    {en:"The menu is hard to find.", cn:"这个菜单不好找。", focus:["is"], scene:"UX/UI"},
    {en:"He is new to the team.", cn:"他是新来的。", focus:["is"], scene:"UX/UI"},
    {en:"We are good with this design.", cn:"这个设计我们挺满意。", focus:["are"], scene:"UX/UI"},
    {en:"This app is easy to use.", cn:"这个应用很好用。", focus:["is"], scene:"UX/UI"},
    {en:"I am working on the homepage.", cn:"我在做首页。", focus:["am"], scene:"UX/UI"},
    {en:"The homepage is almost ready.", cn:"这个首页快好了。", focus:["is"], scene:"UX/UI"},
    {en:"My Figma file is open.", cn:"我的 Figma 文件开着。", focus:["is"], scene:"UX/UI"},
    {en:"The search button is missing.", cn:"这个搜索按钮不见了。", focus:["is"], scene:"UX/UI"},
    {en:"Our designs are ready to share.", cn:"我们的设计可以分享了。", focus:["are"], scene:"UX/UI"},
    {en:"I am hungry.", cn:"我饿了。", focus:["am"], scene:"生活"},
    {en:"The coffee is cold.", cn:"这杯咖啡凉了。", focus:["is"], scene:"生活"},
    {en:"I am free after lunch.", cn:"我午饭后有空。", focus:["am"], scene:"生活"},
    {en:"The cafe is quiet.", cn:"这家咖啡馆很安静。", focus:["is"], scene:"生活"},
    {en:"I am tired.", cn:"我累了。", focus:["am"], scene:"生活"},
    {en:"The food is good here.", cn:"这里的食物不错。", focus:["is"], scene:"生活"},
    {en:"You are early today.", cn:"你今天来早了。", focus:["are"], scene:"生活"},
    {en:"They are helpful.", cn:"他们很热心。", focus:["are"], scene:"生活"},
    {en:"I am almost there.", cn:"我快到了。", focus:["am"], scene:"生活"},
    {en:"We are at the airport.", cn:"我们在机场。", focus:["are"], scene:"旅行"},
    {en:"The hotel is near the metro.", cn:"这家酒店在地铁附近。", focus:["is"], scene:"旅行"},
    {en:"The flight is late.", cn:"这个航班晚点了。", focus:["is"], scene:"旅行"},
    {en:"My bag is heavy.", cn:"我的这个包很重。", focus:["is"], scene:"旅行"},
    {en:"The seats are comfortable.", cn:"这些座位很舒服。", focus:["are"], scene:"旅行"},
    {en:"We are on the way.", cn:"我们在路上。", focus:["are"], scene:"旅行"},
    {en:"The gate is this way.", cn:"登机口在这边。", focus:["is"], scene:"旅行"},
    {en:"My seat is by the window.", cn:"我的座位靠窗。", focus:["is"], scene:"旅行"},
    {en:"The Wi-Fi is slow.", cn:"Wi-Fi 很慢。", focus:["is"], scene:"旅行"},
    {en:"The room is ready.", cn:"这个房间准备好了。", focus:["is"], scene:"旅行"},
    {en:"The taxi is here.", cn:"这辆出租车到了。", focus:["is"], scene:"旅行"},
    {en:"I am at the hotel now.", cn:"我现在在酒店。", focus:["am"], scene:"旅行"},
    {en:"She is on the call.", cn:"她在会上。", focus:["is"], scene:"UX/UI"},
    {en:"The icons are too small.", cn:"这些图标太小了。", focus:["are"], scene:"UX/UI"},
    {en:"I am in a meeting.", cn:"我在开会。", focus:["am"], scene:"UX/UI"},
    {en:"The link is broken.", cn:"这个链接坏了。", focus:["is"], scene:"UX/UI"},
    {en:"We are in the same room.", cn:"我们在同一个房间。", focus:["are"], scene:"UX/UI"},
    {en:"The form is too long.", cn:"这个表单太长了。", focus:["is"], scene:"UX/UI"},
    {en:"He is out of office today.", cn:"他今天不在办公室。", focus:["is"], scene:"UX/UI"},
    {en:"The price is on the page.", cn:"这个价格显示在页面上。", focus:["is"], scene:"UX/UI"},
    {en:"I am at the gate.", cn:"我在登机口。", focus:["am"], scene:"旅行"},
    {en:"The map is helpful.", cn:"这张地图很有用。", focus:["is"], scene:"旅行"},
    {en:"They are at the hotel.", cn:"他们在酒店。", focus:["are"], scene:"旅行"},
    {en:"The bus is full.", cn:"这辆公交车满了。", focus:["is"], scene:"旅行"},
    {en:"I am at the cafe.", cn:"我在咖啡馆。", focus:["am"], scene:"生活"},
    {en:"The soup is hot.", cn:"这碗汤很烫。", focus:["is"], scene:"生活"},
    {en:"The password is wrong.", cn:"密码错了。", focus:["is"], scene:"UX/UI"},
    {en:"I am on mute.", cn:"我静音了。", focus:["am"], scene:"UX/UI"},
    {en:"The draft is ready.", cn:"草稿准备好了。", focus:["is"], scene:"UX/UI"},
    {en:"We are remote today.", cn:"我们今天远程办公。", focus:["are"], scene:"UX/UI"},
    {en:"The toast is burnt.", cn:"吐司糊了。", focus:["is"], scene:"生活"},
    {en:"She is offline now.", cn:"她现在离线。", focus:["is"], scene:"UX/UI"},
    {en:"The checklist is long.", cn:"检查清单很长。", focus:["is"], scene:"UX/UI"},
    {en:"I am at Terminal 2.", cn:"我在 2 号航站楼。", focus:["am"], scene:"旅行"},
    {en:"The platform is crowded.", cn:"站台很挤。", focus:["is"], scene:"旅行"},
    {en:"Our seats are together.", cn:"我们的座位在一起。", focus:["are"], scene:"旅行"},
    {en:"The luggage is missing.", cn:"行李不见了。", focus:["is"], scene:"旅行"},
    {en:"I am free now.", cn:"我现在有空。", focus:["am"], scene:"生活"},
    {en:"The office is empty.", cn:"办公室空了。", focus:["is"], scene:"生活"},
    {en:"This ticket is cheap.", cn:"这张票很便宜。", focus:["is"], scene:"旅行"},
    {en:"The error is clear.", cn:"这个报错很清楚。", focus:["is"], scene:"UX/UI"},
    {en:"You are next.", cn:"下一个是你。", focus:["are"], scene:"生活"},
    {en:"The upload is done.", cn:"上传完成了。", focus:["is"], scene:"UX/UI"},
    {en:"We are downstairs.", cn:"我们在楼下。", focus:["are"], scene:"生活"},
    {en:"The border is too thick.", cn:"边框太粗了。", focus:["is"], scene:"UX/UI"},
    {en:"The design looks good.", cn:"这个设计看起来不错。", focus:["is"], scene:"UX/UI"},
    {en:"The icons look clear.", cn:"这些图标看起来很清楚。", focus:["look"], scene:"UX/UI"},
    {en:"The layout feels clean.", cn:"这个布局感觉很干净。", focus:["feels"], scene:"UX/UI"},
    {en:"The page feels too busy.", cn:"这个页面感觉太乱了。", focus:["feels"], scene:"UX/UI"},
    {en:"The button is hard to see.", cn:"这个按钮不好找。", focus:["is"], scene:"UX/UI"},
    {en:"The text is easy to read.", cn:"这段文字很好读。", focus:["is"], scene:"UX/UI"},
    {en:"The contrast is too low.", cn:"对比度太低了。", focus:["is"], scene:"UX/UI"},
    {en:"The spacing looks tight.", cn:"间距看起来太紧了。", focus:["looks"], scene:"UX/UI"},
    {en:"The navbar is sticky.", cn:"导航栏是固定在上面的。", focus:["is"], scene:"UX/UI"},
    {en:"The modal is open.", cn:"弹窗是打开状态。", focus:["is"], scene:"UX/UI"},
    {en:"The sidebar is collapsed.", cn:"侧边栏是收起的。", focus:["is"], scene:"UX/UI"},
    {en:"The form is incomplete.", cn:"表单还没填完。", focus:["is"], scene:"UX/UI"},
    {en:"The field is required.", cn:"这个字段是必填的。", focus:["is"], scene:"UX/UI"},
    {en:"The error is on this page.", cn:"报错在这个页面上。", focus:["is"], scene:"UX/UI"},
    {en:"The version is out of date.", cn:"版本已经过时了。", focus:["is"], scene:"UX/UI"},
    {en:"The file is too large.", cn:"文件太大了。", focus:["is"], scene:"UX/UI"},
    {en:"The image is blurry.", cn:"图片有点模糊。", focus:["is"], scene:"UX/UI"},
    {en:"The logo is too small.", cn:"logo 太小了。", focus:["is"], scene:"UX/UI"},
    {en:"The copy is too long.", cn:"文案太长了。", focus:["is"], scene:"UX/UI"},
    {en:"The title is missing.", cn:"标题不见了。", focus:["is"], scene:"UX/UI"},
    {en:"The link is correct.", cn:"链接是对的。", focus:["is"], scene:"UX/UI"},
    {en:"The color is on brand.", cn:"颜色符合品牌规范。", focus:["is"], scene:"UX/UI"},
    {en:"The font is readable.", cn:"字体很好认。", focus:["is"], scene:"UX/UI"},
    {en:"The grid is balanced.", cn:"网格排版很均衡。", focus:["is"], scene:"UX/UI"},
    {en:"The card is selected.", cn:"这张卡片被选中了。", focus:["is"], scene:"UX/UI"},
    {en:"The tab is active.", cn:"这个标签页是当前页。", focus:["is"], scene:"UX/UI"},
    {en:"The toggle is off.", cn:"开关是关着的。", focus:["is"], scene:"UX/UI"},
    {en:"The toggle is on.", cn:"开关是开着的。", focus:["is"], scene:"UX/UI"},
    {en:"The loader is visible.", cn:"能看到加载动画。", focus:["is"], scene:"UX/UI"},
    {en:"The toast is gone.", cn:"提示条已经消失了。", focus:["is"], scene:"UX/UI"},
    {en:"The tooltip is helpful.", cn:"这个提示很有用。", focus:["is"], scene:"UX/UI"},
    {en:"The empty state is friendly.", cn:"空状态设计很友好。", focus:["is"], scene:"UX/UI"},
    {en:"The flow is simple.", cn:"流程很简单。", focus:["is"], scene:"UX/UI"},
    {en:"The steps are clear.", cn:"这些步骤很清楚。", focus:["are"], scene:"UX/UI"},
    {en:"The icons are consistent.", cn:"这些图标风格很统一。", focus:["are"], scene:"UX/UI"},
    {en:"The buttons are aligned.", cn:"这些按钮对齐了。", focus:["are"], scene:"UX/UI"},
    {en:"The labels are readable.", cn:"这些标签很好读。", focus:["are"], scene:"UX/UI"},
    {en:"The colors are balanced.", cn:"这些颜色搭配很均衡。", focus:["are"], scene:"UX/UI"},
    {en:"The screens are ready for review.", cn:"这些页面可以评审了。", focus:["are"], scene:"UX/UI"},
    {en:"The comments are helpful.", cn:"这些评论很有帮助。", focus:["are"], scene:"UX/UI"},
    {en:"I am on the design team.", cn:"我在设计团队。", focus:["am"], scene:"UX/UI"},
    {en:"I am reviewing the mockups.", cn:"我在看视觉稿。", focus:["am"], scene:"UX/UI"},
    {en:"I am waiting for approval.", cn:"我在等审批。", focus:["am"], scene:"UX/UI"},
    {en:"I am good with this version.", cn:"这版我觉得可以。", focus:["am"], scene:"UX/UI"},
    {en:"I am not sure about this color.", cn:"我对这个颜色还不太确定。", focus:["am"], scene:"UX/UI"},
    {en:"You are on the right track.", cn:"你的方向是对的。", focus:["are"], scene:"UX/UI"},
    {en:"You are in the wrong file.", cn:"你打开错文件了。", focus:["are"], scene:"UX/UI"},
    {en:"We are behind on this project.", cn:"这个项目我们进度落后了。", focus:["are"], scene:"UX/UI"},
    {en:"We are ready to hand off.", cn:"我们准备好交付了。", focus:["are"], scene:"UX/UI"},
    {en:"They are in a user interview.", cn:"他们在做用户访谈。", focus:["are"], scene:"UX/UI"},
    {en:"He is the lead designer.", cn:"他是主设计师。", focus:["is"], scene:"UX/UI"},
    {en:"She is very detail-oriented.", cn:"她非常注重细节。", focus:["is"], scene:"UX/UI"},
    {en:"My manager is on vacation.", cn:"我经理在休假。", focus:["is"], scene:"UX/UI"},
    {en:"The prototype is interactive.", cn:"原型是可以交互的。", focus:["is"], scene:"UX/UI"},
    {en:"The handoff is almost done.", cn:"交付快完成了。", focus:["is"], scene:"UX/UI"},
    {en:"The spec is still a draft.", cn:"说明文档还是草稿。", focus:["is"], scene:"UX/UI"},
    {en:"The meeting is at two.", cn:"会议在两点。", focus:["is"], scene:"UX/UI"},
    {en:"The deadline is tomorrow.", cn:"明天就要交了。", focus:["is"], scene:"UX/UI"},
    {en:"The feedback is fair.", cn:"这个反馈很中肯。", focus:["is"], scene:"UX/UI"},
    {en:"The idea is worth trying.", cn:"这个想法值得一试。", focus:["is"], scene:"UX/UI"},
    {en:"The change is minor.", cn:"改动不大。", focus:["is"], scene:"UX/UI"},
    {en:"The update is live.", cn:"更新已经上线了。", focus:["is"], scene:"UX/UI"},
    {en:"The bug is fixed.", cn:"这个 bug 修好了。", focus:["is"], scene:"UX/UI"},
    {en:"The ticket is urgent.", cn:"这个工单很急。", focus:["is"], scene:"UX/UI"},
    {en:"The task is done.", cn:"任务完成了。", focus:["is"], scene:"UX/UI"},
    {en:"The notes are in Figma.", cn:"这些备注写在 Figma 里。", focus:["are"], scene:"UX/UI"},
    {en:"The files are in the shared folder.", cn:"这些文件在共享文件夹里。", focus:["are"], scene:"UX/UI"},
    {en:"The links are broken.", cn:"这些链接失效了。", focus:["are"], scene:"UX/UI"},
    {en:"The icons are pixel-perfect.", cn:"这些图标像素对齐了。", focus:["are"], scene:"UX/UI"},
    {en:"The margins are even.", cn:"这些外边距是均匀的。", focus:["are"], scene:"UX/UI"},
    {en:"The padding is too tight.", cn:"内边距太紧了。", focus:["is"], scene:"UX/UI"},
    {en:"The radius is too big.", cn:"圆角太大了。", focus:["is"], scene:"UX/UI"},
    {en:"The shadow is too strong.", cn:"阴影太重了。", focus:["is"], scene:"UX/UI"},
    {en:"The animation is smooth.", cn:"动画很流畅。", focus:["is"], scene:"UX/UI"},
    {en:"The transition is too slow.", cn:"过渡动画太慢了。", focus:["is"], scene:"UX/UI"},
    {en:"The hover state is missing.", cn:"缺少悬停状态。", focus:["is"], scene:"UX/UI"},
    {en:"The dark mode is ready.", cn:"深色模式准备好了。", focus:["is"], scene:"UX/UI"},
    {en:"The mobile view is broken.", cn:"手机端显示有问题。", focus:["is"], scene:"UX/UI"},
    {en:"The desktop view is fine.", cn:"桌面端显示没问题。", focus:["is"], scene:"UX/UI"},
    {en:"The layout is responsive.", cn:"布局是响应式的。", focus:["is"], scene:"UX/UI"},
    {en:"The component is reusable.", cn:"这个组件可以复用。", focus:["is"], scene:"UX/UI"},
    {en:"The pattern is familiar.", cn:"这个模式很熟悉。", focus:["is"], scene:"UX/UI"},
    {en:"The style is modern.", cn:"风格很现代。", focus:["is"], scene:"UX/UI"},
    {en:"The brand color is blue.", cn:"品牌色是蓝色。", focus:["is"], scene:"UX/UI"},
    {en:"The type scale is consistent.", cn:"字号层级很统一。", focus:["is"], scene:"UX/UI"},
    {en:"The wireframe is approved.", cn:"线框图通过了。", focus:["is"], scene:"UX/UI"},
    {en:"The visual design is polished.", cn:"视觉设计很精致。", focus:["is"], scene:"UX/UI"},
    {en:"The user flow is logical.", cn:"用户流程很合理。", focus:["is"], scene:"UX/UI"},
    {en:"The onboarding is too long.", cn:"新手引导太长了。", focus:["is"], scene:"UX/UI"},
    {en:"The CTA is clear.", cn:"行动按钮很清楚。", focus:["is"], scene:"UX/UI"},
    {en:"The search results are empty.", cn:"搜索结果为空。", focus:["are"], scene:"UX/UI"},
    {en:"The filters are easy to use.", cn:"这些筛选器很好用。", focus:["are"], scene:"UX/UI"},
    {en:"The settings are saved.", cn:"这些设置已保存。", focus:["are"], scene:"UX/UI"},
    {en:"The permissions are correct.", cn:"这些权限设置是对的。", focus:["are"], scene:"UX/UI"},
    {en:"The profile page is live.", cn:"个人页已上线。", focus:["is"], scene:"UX/UI"},
    {en:"The checkout flow is smooth.", cn:"结算流程很顺畅。", focus:["is"], scene:"UX/UI"},
    {en:"The login page is simple.", cn:"登录页很简洁。", focus:["is"], scene:"UX/UI"},
    {en:"The signup form is short.", cn:"注册表单很短。", focus:["is"], scene:"UX/UI"},
    {en:"The notification badge is red.", cn:"通知角标是红色的。", focus:["is"], scene:"UX/UI"},
    {en:"The avatar is updated.", cn:"头像更新了。", focus:["is"], scene:"UX/UI"},
    {en:"The banner is dismissible.", cn:"横幅可以关闭。", focus:["is"], scene:"UX/UI"},
    {en:"The chart is easy to understand.", cn:"图表很好懂。", focus:["is"], scene:"UX/UI"},
    {en:"The table is sortable.", cn:"表格可以排序。", focus:["is"], scene:"UX/UI"},
    {en:"The list is scrollable.", cn:"列表可以滚动。", focus:["is"], scene:"UX/UI"},
    {en:"The input is disabled.", cn:"输入框被禁用了。", focus:["is"], scene:"UX/UI"},
    {en:"The dropdown is open.", cn:"下拉菜单是展开的。", focus:["is"], scene:"UX/UI"},
    {en:"The checkbox is checked.", cn:"复选框已勾选。", focus:["is"], scene:"UX/UI"},
    {en:"The radio button is selected.", cn:"单选按钮已选中。", focus:["is"], scene:"UX/UI"},
    {en:"The slider value is too high.", cn:"滑块的值太高了。", focus:["is"], scene:"UX/UI"},
    {en:"The progress is at fifty percent.", cn:"进度是百分之五十。", focus:["is"], scene:"UX/UI"},
    {en:"The upload failed.", cn:"上传失败了。", focus:["failed"], scene:"UX/UI"},
    {en:"The download is complete.", cn:"下载完成了。", focus:["is"], scene:"UX/UI"},
    {en:"The sync is in progress.", cn:"正在同步中。", focus:["is"], scene:"UX/UI"},
    {en:"The cache is cleared.", cn:"缓存已清除。", focus:["is"], scene:"UX/UI"},
    {en:"The session has expired.", cn:"登录已过期。", focus:["has"], scene:"UX/UI"},
    {en:"The account is verified.", cn:"账号已验证。", focus:["is"], scene:"UX/UI"},
    {en:"The payment is pending.", cn:"付款待处理。", focus:["is"], scene:"UX/UI"},
    {en:"The order is confirmed.", cn:"订单已确认。", focus:["is"], scene:"UX/UI"},
    {en:"The refund is being processed.", cn:"退款处理中。", focus:["being"], scene:"UX/UI"},
    {en:"The subscription is active.", cn:"订阅是生效的。", focus:["is"], scene:"UX/UI"},
    {en:"The trial is ending soon.", cn:"试用快到期了。", focus:["is"], scene:"UX/UI"},
    {en:"The feature is in beta.", cn:"这个功能还在测试阶段。", focus:["is"], scene:"UX/UI"},
    {en:"The release is scheduled for Friday.", cn:"发布定在周五。", focus:["is"], scene:"UX/UI"},
    {en:"The roadmap is updated.", cn:"路线图更新了。", focus:["is"], scene:"UX/UI"},
    {en:"The sprint is almost over.", cn:"这个迭代快结束了。", focus:["is"], scene:"UX/UI"},
    {en:"The stand-up is at ten.", cn:"站会在十点。", focus:["is"], scene:"UX/UI"},
    {en:"The retro is on Thursday.", cn:"复盘会在周四。", focus:["is"], scene:"UX/UI"},
    {en:"The workshop is next week.", cn:"工作坊在下周。", focus:["is"], scene:"UX/UI"},
    {en:"The stakeholder is happy.", cn:"相关方很满意。", focus:["is"], scene:"UX/UI"},
    {en:"The client wants more options.", cn:"客户想要更多方案。", focus:["wants"], scene:"UX/UI"},
    {en:"The PM is in a meeting.", cn:"产品经理在开会。", focus:["is"], scene:"UX/UI"},
    {en:"The engineer is busy.", cn:"工程师很忙。", focus:["is"], scene:"UX/UI"},
    {en:"The QA team is testing.", cn:"测试团队在测。", focus:["is"], scene:"UX/UI"},
    {en:"The research is done.", cn:"调研做完了。", focus:["is"], scene:"UX/UI"},
    {en:"The insights are valuable.", cn:"这些洞察很有价值。", focus:["are"], scene:"UX/UI"},
    {en:"The persona is updated.", cn:"用户画像更新了。", focus:["is"], scene:"UX/UI"},
    {en:"The journey map is ready.", cn:"用户旅程图准备好了。", focus:["is"], scene:"UX/UI"},
    {en:"The wireframes are approved.", cn:"这些线框图通过了。", focus:["are"], scene:"UX/UI"},
    {en:"The mockups are in review.", cn:"这些视觉稿在评审中。", focus:["are"], scene:"UX/UI"},
    {en:"The dev handoff is clear.", cn:"开发交付说明很清楚。", focus:["is"], scene:"UX/UI"},
    {en:"The assets are ready to export.", cn:"这些素材可以导出了。", focus:["are"], scene:"UX/UI"},
    {en:"The design system is growing.", cn:"设计系统在扩充。", focus:["is"], scene:"UX/UI"},
    {en:"The tokens are defined.", cn:"这些设计 token 已定义。", focus:["are"], scene:"UX/UI"},
    {en:"The documentation is helpful.", cn:"文档很有帮助。", focus:["is"], scene:"UX/UI"},
    {en:"I am a bit late.", cn:"我有一点迟到了。", focus:["am"], scene:"生活"},
    {en:"I am on my way.", cn:"我在路上了。", focus:["am"], scene:"生活"},
    {en:"I am not feeling well.", cn:"我不太舒服。", focus:["am"], scene:"生活"},
    {en:"I am staying home today.", cn:"我今天待在家。", focus:["am"], scene:"生活"},
    {en:"You are welcome.", cn:"不客气。", focus:["are"], scene:"生活"},
    {en:"You are right.", cn:"你说得对。", focus:["are"], scene:"生活"},
    {en:"We are good friends.", cn:"我们是好朋友。", focus:["are"], scene:"生活"},
    {en:"They are very kind.", cn:"他们很友善。", focus:["are"], scene:"生活"},
    {en:"The weather is nice today.", cn:"今天天气很好。", focus:["is"], scene:"生活"},
    {en:"The weather is cold.", cn:"天气很冷。", focus:["is"], scene:"生活"},
    {en:"The milk is expired.", cn:"牛奶过期了。", focus:["is"], scene:"生活"},
    {en:"The bread is fresh.", cn:"面包很新鲜。", focus:["is"], scene:"生活"},
    {en:"The water is boiling.", cn:"水开了。", focus:["is"], scene:"生活"},
    {en:"The rice is ready.", cn:"饭好了。", focus:["is"], scene:"生活"},
    {en:"The tea is too hot.", cn:"茶太烫了。", focus:["is"], scene:"生活"},
    {en:"The coffee is strong.", cn:"咖啡很浓。", focus:["is"], scene:"生活"},
    {en:"The soup is delicious.", cn:"汤很好喝。", focus:["is"], scene:"生活"},
    {en:"The restaurant is crowded.", cn:"这家餐厅很挤。", focus:["is"], scene:"生活"},
    {en:"The cafe is closed today.", cn:"咖啡馆今天关门。", focus:["is"], scene:"生活"},
    {en:"The shop is open.", cn:"店开着。", focus:["is"], scene:"生活"},
    {en:"The gym is packed.", cn:"健身房人很多。", focus:["is"], scene:"生活"},
    {en:"The park is quiet.", cn:"这个公园很安静。", focus:["is"], scene:"生活"},
    {en:"The street is busy.", cn:"街上很热闹。", focus:["is"], scene:"生活"},
    {en:"The apartment is small.", cn:"这套公寓很小。", focus:["is"], scene:"生活"},
    {en:"The rent is expensive.", cn:"房租很贵。", focus:["is"], scene:"生活"},
    {en:"The neighbor is friendly.", cn:"这位邻居很友好。", focus:["is"], scene:"生活"},
    {en:"The cat is asleep.", cn:"这只猫睡着了。", focus:["is"], scene:"生活"},
    {en:"The dog is hungry.", cn:"这只狗饿了。", focus:["is"], scene:"生活"},
    {en:"The phone battery is low.", cn:"手机电量低了。", focus:["is"], scene:"生活"},
    {en:"The Wi-Fi is down.", cn:"Wi-Fi 断了。", focus:["is"], scene:"生活"},
    {en:"The AC is too cold.", cn:"空调太冷了。", focus:["is"], scene:"生活"},
    {en:"The heater is on.", cn:"暖气开着。", focus:["is"], scene:"生活"},
    {en:"The laundry is done.", cn:"衣服洗好了。", focus:["is"], scene:"生活"},
    {en:"The dishes are clean.", cn:"这些碗都洗好了。", focus:["are"], scene:"生活"},
    {en:"The keys are on the table.", cn:"这些钥匙在桌上。", focus:["are"], scene:"生活"},
    {en:"The lights are off.", cn:"这些灯关着。", focus:["are"], scene:"生活"},
    {en:"The windows are open.", cn:"这些窗户开着。", focus:["are"], scene:"生活"},
    {en:"The door is locked.", cn:"门锁着。", focus:["is"], scene:"生活"},
    {en:"The meeting is over.", cn:"会开完了。", focus:["is"], scene:"生活"},
    {en:"The movie is boring.", cn:"这部电影很无聊。", focus:["is"], scene:"生活"},
    {en:"The book is interesting.", cn:"这本书很有趣。", focus:["is"], scene:"生活"},
    {en:"The music is too loud.", cn:"音乐太响了。", focus:["is"], scene:"生活"},
    {en:"The price is reasonable.", cn:"价格很合理。", focus:["is"], scene:"生活"},
    {en:"The sale is on.", cn:"正在打折。", focus:["is"], scene:"生活"},
    {en:"The package is here.", cn:"快递到了。", focus:["is"], scene:"生活"},
    {en:"The appointment is at three.", cn:"预约在三点。", focus:["is"], scene:"生活"},
    {en:"The doctor is available.", cn:"医生有空。", focus:["is"], scene:"生活"},
    {en:"The pharmacy is nearby.", cn:"药店在附近。", focus:["is"], scene:"生活"},
    {en:"The medicine is effective.", cn:"药很有效。", focus:["is"], scene:"生活"},
    {en:"The headache is gone.", cn:"头不疼了。", focus:["is"], scene:"生活"},
    {en:"The weekend is coming.", cn:"周末快到了。", focus:["is"], scene:"生活"},
    {en:"The holiday is next month.", cn:"假期在下个月。", focus:["is"], scene:"生活"},
    {en:"The birthday party is tonight.", cn:"生日派对在今晚。", focus:["is"], scene:"生活"},
    {en:"The gift is perfect.", cn:"这份礼物很完美。", focus:["is"], scene:"生活"},
    {en:"The photos are beautiful.", cn:"这些照片很漂亮。", focus:["are"], scene:"生活"},
    {en:"The memories are precious.", cn:"这些回忆很珍贵。", focus:["are"], scene:"生活"},
    {en:"The flight is on time.", cn:"航班准点。", focus:["is"], scene:"旅行"},
    {en:"The flight is delayed.", cn:"航班延误了。", focus:["is"], scene:"旅行"},
    {en:"The flight is cancelled.", cn:"航班取消了。", focus:["is"], scene:"旅行"},
    {en:"The gate is B12.", cn:"登机口是 B12。", focus:["is"], scene:"旅行"},
    {en:"The gate is changing.", cn:"登机口变了。", focus:["is"], scene:"旅行"},
    {en:"The boarding time is six.", cn:"登机时间是六点。", focus:["is"], scene:"旅行"},
    {en:"The seat is an aisle seat.", cn:"这个座位是靠过道座位。", focus:["is"], scene:"旅行"},
    {en:"The seat is a window seat.", cn:"这个座位是靠窗座位。", focus:["is"], scene:"旅行"},
    {en:"The baggage is overweight.", cn:"行李超重了。", focus:["is"], scene:"旅行"},
    {en:"The passport is valid.", cn:"护照有效。", focus:["is"], scene:"旅行"},
    {en:"The visa is approved.", cn:"签证通过了。", focus:["is"], scene:"旅行"},
    {en:"The customs line is long.", cn:"海关队伍很长。", focus:["is"], scene:"旅行"},
    {en:"The security check is quick.", cn:"安检很快。", focus:["is"], scene:"旅行"},
    {en:"The queue is long.", cn:"队伍排得很长。", focus:["is"], scene:"旅行"},
    {en:"The counter is closed.", cn:"柜台已经关了。", focus:["is"], scene:"旅行"},
    {en:"The train is delayed.", cn:"火车晚点了。", focus:["is"], scene:"旅行"},
    {en:"The train is full.", cn:"火车满了。", focus:["is"], scene:"旅行"},
    {en:"The metro is crowded.", cn:"地铁很挤。", focus:["is"], scene:"旅行"},
    {en:"The bus stop is here.", cn:"公交站在这里。", focus:["is"], scene:"旅行"},
    {en:"The taxi fare is fair.", cn:"出租车费很合理。", focus:["is"], scene:"旅行"},
    {en:"The driver is friendly.", cn:"司机很友好。", focus:["is"], scene:"旅行"},
    {en:"The hotel room is clean.", cn:"酒店房间很干净。", focus:["is"], scene:"旅行"},
    {en:"The hotel breakfast is good.", cn:"酒店早餐不错。", focus:["is"], scene:"旅行"},
    {en:"The check-in time is two.", cn:"入住时间是两点。", focus:["is"], scene:"旅行"},
    {en:"The check-out time is noon.", cn:"退房时间是中午。", focus:["is"], scene:"旅行"},
    {en:"The reservation is confirmed.", cn:"预订已确认。", focus:["is"], scene:"旅行"},
    {en:"The room has a view.", cn:"房间有景观。", focus:["has"], scene:"旅行"},
    {en:"The view is amazing.", cn:"景色很棒。", focus:["is"], scene:"旅行"},
    {en:"The beach is nearby.", cn:"海滩在附近。", focus:["is"], scene:"旅行"},
    {en:"The museum is closed on Monday.", cn:"博物馆周一闭馆。", focus:["is"], scene:"旅行"},
    {en:"The ticket is valid for one day.", cn:"票有效期一天。", focus:["is"], scene:"旅行"},
    {en:"The tour starts at nine.", cn:"游览九点开始。", focus:["starts"], scene:"旅行"},
    {en:"The guide is knowledgeable.", cn:"导游很专业。", focus:["is"], scene:"旅行"},
    {en:"The souvenir shop is open.", cn:"纪念品店开着。", focus:["is"], scene:"旅行"},
    {en:"The exchange rate is good.", cn:"汇率不错。", focus:["is"], scene:"旅行"},
    {en:"The ATM is around the corner.", cn:"ATM 在拐角处。", focus:["is"], scene:"旅行"},
    {en:"The SIM card works.", cn:"电话卡能用。", focus:["works"], scene:"旅行"},
    {en:"The map is accurate.", cn:"地图很准确。", focus:["is"], scene:"旅行"},
    {en:"The route is scenic.", cn:"路线风景很好。", focus:["is"], scene:"旅行"},
    {en:"The weather is perfect.", cn:"天气完美。", focus:["is"], scene:"旅行"},
    {en:"The sunset is beautiful.", cn:"日落很美。", focus:["is"], scene:"旅行"},
    {en:"The local food is spicy.", cn:"当地菜很辣。", focus:["is"], scene:"旅行"},
    {en:"The restaurant is recommended.", cn:"这家餐厅值得推荐。", focus:["is"], scene:"旅行"},
    {en:"The service charge is included.", cn:"服务费已包含在内。", focus:["is"], scene:"旅行"},
    {en:"The tip is optional.", cn:"小费是可选的。", focus:["is"], scene:"旅行"},
    {en:"The luggage is at the carousel.", cn:"行李在传送带上。", focus:["is"], scene:"旅行"},
    {en:"The lost and found is on level one.", cn:"失物招领在一层。", focus:["is"], scene:"旅行"},
    {en:"The emergency exit is there.", cn:"紧急出口在那里。", focus:["is"], scene:"旅行"},
    {en:"The pharmacy is open late.", cn:"药店开到很晚。", focus:["is"], scene:"旅行"},
    {en:"The clinic is nearby.", cn:"诊所在附近。", focus:["is"], scene:"旅行"},
    {en:"The embassy is in the city center.", cn:"大使馆在市中心。", focus:["is"], scene:"旅行"},
    {en:"The airport shuttle is free.", cn:"机场班车免费。", focus:["is"], scene:"旅行"},
    {en:"The duty-free shop is after security.", cn:"免税店在安检后。", focus:["is"], scene:"旅行"},
    {en:"The lounge is quiet.", cn:"休息室很安静。", focus:["is"], scene:"旅行"},
    {en:"The connecting flight is tight.", cn:"转机时间很紧。", focus:["is"], scene:"旅行"},
    {en:"The layover is three hours.", cn:"中转有三小时。", focus:["is"], scene:"旅行"},
    {en:"The destination is Tokyo.", cn:"目的地是东京。", focus:["is"], scene:"旅行"},
    {en:"The trip is unforgettable.", cn:"这次旅行很难忘。", focus:["is"], scene:"旅行"},
    {en:"We are lost.", cn:"我们迷路了。", focus:["are"], scene:"旅行"},
    {en:"We are at the wrong gate.", cn:"我们在错的登机口。", focus:["are"], scene:"旅行"},
    {en:"We are ready to board.", cn:"我们准备好登机了。", focus:["are"], scene:"旅行"},
    {en:"They are on vacation.", cn:"他们在度假。", focus:["are"], scene:"旅行"},
    {en:"I am at customs.", cn:"我在海关。", focus:["am"], scene:"旅行"},
    {en:"I am looking for my gate.", cn:"我在找登机口。", focus:["am"], scene:"旅行"},
    {en:"I am checking the departure board.", cn:"我在看出发信息屏。", focus:["am"], scene:"旅行"},
    {en:"The snacks are free.", cn:"这些零食是免费的。", focus:["are"], scene:"旅行"},
    {en:"The drinks are complimentary.", cn:"这些饮料是免费的。", focus:["are"], scene:"旅行"},
    {en:"The announcements are in English.", cn:"广播是英语的。", focus:["are"], scene:"旅行"},
    {en:"The signs are clear.", cn:"这些指示牌很清楚。", focus:["are"], scene:"旅行"},
    {en:"The platform number is three.", cn:"站台号是 3。", focus:["is"], scene:"旅行"},
    {en:"The departure time is confirmed.", cn:"出发时间已确认。", focus:["is"], scene:"旅行"},
    {en:"The arrival time is eight.", cn:"到达时间是八点。", focus:["is"], scene:"旅行"},
    {en:"The rental car is ready.", cn:"租车准备好了。", focus:["is"], scene:"旅行"},
    {en:"The GPS is working.", cn:"导航能用。", focus:["is"], scene:"旅行"},
    {en:"The road is closed.", cn:"这条路封了。", focus:["is"], scene:"旅行"},
    {en:"The traffic is heavy.", cn:"交通很拥堵。", focus:["is"], scene:"旅行"},
    {en:"The parking lot is full.", cn:"停车场满了。", focus:["is"], scene:"旅行"},
    {en:"The hostel is cheap.", cn:"青旅很便宜。", focus:["is"], scene:"旅行"},
    {en:"The Airbnb is cozy.", cn:"民宿很温馨。", focus:["is"], scene:"旅行"},
    {en:"The host is welcoming.", cn:"房东很热情。", focus:["is"], scene:"旅行"},
    {en:"The neighborhood is safe.", cn:"社区很安全。", focus:["is"], scene:"旅行"},
    {en:"The street food is tasty.", cn:"街头小吃很好吃。", focus:["is"], scene:"旅行"},
    {en:"The market is lively.", cn:"市场很热闹。", focus:["is"], scene:"旅行"},
    {en:"The temple is ancient.", cn:"寺庙很古老。", focus:["is"], scene:"旅行"},
    {en:"The castle is impressive.", cn:"城堡很壮观。", focus:["is"], scene:"旅行"},
    {en:"The hike is challenging.", cn:"徒步很有挑战性。", focus:["is"], scene:"旅行"},
    {en:"The trail is well marked.", cn:"步道标识很清楚。", focus:["is"], scene:"旅行"},
    {en:"The campsite is booked.", cn:"营地订好了。", focus:["is"], scene:"旅行"},
    {en:"The tent is waterproof.", cn:"这顶帐篷是防水的。", focus:["is"], scene:"旅行"},
    {en:"The sleeping bag is warm.", cn:"睡袋很暖和。", focus:["is"], scene:"旅行"}
],
  "present-cont": [
    {en:"I am working on the homepage.", cn:"我在做首页。", focus:["am","working"], scene:"UX/UI"},
    {en:"She is fixing the colors.", cn:"她在改颜色。", focus:["is","fixing"], scene:"UX/UI"},
    {en:"We are making the buttons bigger.", cn:"我们在把按钮做大。", focus:["are","making"], scene:"UX/UI"},
    {en:"He is checking the spacing.", cn:"他在看间距。", focus:["is","checking"], scene:"UX/UI"},
    {en:"They are drawing new icons.", cn:"他们在画新图标。", focus:["are","drawing"], scene:"UX/UI"},
    {en:"I am waiting for feedback.", cn:"我在等反馈。", focus:["am","waiting"], scene:"UX/UI"},
    {en:"She is presenting her design.", cn:"她在讲她的设计。", focus:["is","presenting"], scene:"UX/UI"},
    {en:"We are testing the prototype.", cn:"我们在测原型。", focus:["are","testing"], scene:"UX/UI"},
    {en:"He is talking to users.", cn:"他在和用户聊。", focus:["is","talking"], scene:"UX/UI"},
    {en:"I am sharing the Figma link.", cn:"我在发 Figma 链接。", focus:["am","sharing"], scene:"UX/UI"},
    {en:"She is changing the text size.", cn:"她在改字号。", focus:["is","changing"], scene:"UX/UI"},
    {en:"We are reviewing the screens.", cn:"我们在看这些页面。", focus:["are","reviewing"], scene:"UX/UI"},
    {en:"I am packing for my trip.", cn:"我在收拾旅行行李。", focus:["am","packing"], scene:"旅行"},
    {en:"She is looking for the gate.", cn:"她在找登机口。", focus:["is","looking"], scene:"旅行"},
    {en:"We are ordering coffee.", cn:"我们在点咖啡。", focus:["are","ordering"], scene:"生活"},
    {en:"He is booking a hotel.", cn:"他在订酒店。", focus:["is","booking"], scene:"旅行"},
    {en:"I am checking in online.", cn:"我在网上值机。", focus:["am","checking"], scene:"旅行"},
    {en:"They are joining the call.", cn:"他们在进会。", focus:["are","joining"], scene:"UX/UI"},
    {en:"The page is loading.", cn:"页面正在加载。", focus:["is","loading"], scene:"UX/UI"},
    {en:"He is having lunch now.", cn:"他在吃午饭。", focus:["is","having"], scene:"生活"},
    {en:"I am cooking dinner.", cn:"我在做晚饭。", focus:["am","cooking"], scene:"生活"},
    {en:"We are looking for a taxi.", cn:"我们在找出租车。", focus:["are","looking"], scene:"旅行"},
    {en:"She is saving the file.", cn:"她在保存文件。", focus:["is","saving"], scene:"UX/UI"},
    {en:"I am reading your notes.", cn:"我在看你的备注。", focus:["am","reading"], scene:"UX/UI"},
    {en:"I am fixing the colors.", cn:"我在改颜色。", focus:["am","fixing"], scene:"UX/UI"},
    {en:"I am checking the spacing.", cn:"我在看间距。", focus:["am","checking"], scene:"UX/UI"},
    {en:"I am drawing new icons.", cn:"我在画新图标。", focus:["am","drawing"], scene:"UX/UI"},
    {en:"I am presenting the design.", cn:"我在讲设计。", focus:["am","presenting"], scene:"UX/UI"},
    {en:"I am testing the prototype.", cn:"我在测原型。", focus:["am","testing"], scene:"UX/UI"},
    {en:"I am talking to users.", cn:"我在和用户聊。", focus:["am","talking"], scene:"UX/UI"},
    {en:"I am changing the text size.", cn:"我在改字号。", focus:["am","changing"], scene:"UX/UI"},
    {en:"I am reviewing the screens.", cn:"我在看页面。", focus:["am","reviewing"], scene:"UX/UI"},
    {en:"I am saving the file.", cn:"我在保存文件。", focus:["am","saving"], scene:"UX/UI"},
    {en:"I am reading the notes.", cn:"我在看备注。", focus:["am","reading"], scene:"UX/UI"},
    {en:"I am updating the icons.", cn:"我在更新图标。", focus:["am","updating"], scene:"UX/UI"},
    {en:"I am cleaning up the layout.", cn:"我在整理布局。", focus:["am","cleaning"], scene:"UX/UI"},
    {en:"I am aligning the buttons.", cn:"我在对齐按钮。", focus:["am","aligning"], scene:"UX/UI"},
    {en:"I am writing the copy.", cn:"我在写文案。", focus:["am","writing"], scene:"UX/UI"},
    {en:"I am building the design system.", cn:"我在做设计系统。", focus:["am","building"], scene:"UX/UI"},
    {en:"I am recording a demo.", cn:"我在录演示。", focus:["am","recording"], scene:"UX/UI"},
    {en:"I am joining the design call.", cn:"我在进设计会。", focus:["am","joining"], scene:"UX/UI"},
    {en:"I am having lunch.", cn:"我在吃午饭。", focus:["am","having"], scene:"生活"},
    {en:"I am ordering coffee.", cn:"我在点咖啡。", focus:["am","ordering"], scene:"生活"},
    {en:"I am waiting for a friend.", cn:"我在等朋友。", focus:["am","waiting"], scene:"生活"},
    {en:"I am checking my email.", cn:"我在查邮件。", focus:["am","checking"], scene:"生活"},
    {en:"I am charging my phone.", cn:"我在给手机充电。", focus:["am","charging"], scene:"生活"},
    {en:"I am packing for the trip.", cn:"我在收拾旅行行李。", focus:["am","packing"], scene:"旅行"},
    {en:"I am looking for the gate.", cn:"我在找登机口。", focus:["am","looking"], scene:"旅行"},
    {en:"I am booking a hotel.", cn:"我在订酒店。", focus:["am","booking"], scene:"旅行"},
    {en:"I am looking for a taxi.", cn:"我在找出租车。", focus:["am","looking"], scene:"旅行"},
    {en:"I am waiting at the gate.", cn:"我在登机口等。", focus:["am","waiting"], scene:"旅行"},
    {en:"I am boarding the plane.", cn:"我在登机。", focus:["am","boarding"], scene:"旅行"},
    {en:"I am finding the exit.", cn:"我在找出口。", focus:["am","finding"], scene:"旅行"},
    {en:"You are working on the homepage.", cn:"你在做首页。", focus:["are","working"], scene:"UX/UI"},
    {en:"You are fixing the colors.", cn:"你在改颜色。", focus:["are","fixing"], scene:"UX/UI"},
    {en:"You are checking the spacing.", cn:"你在看间距。", focus:["are","checking"], scene:"UX/UI"},
    {en:"You are drawing new icons.", cn:"你在画新图标。", focus:["are","drawing"], scene:"UX/UI"},
    {en:"You are waiting for feedback.", cn:"你在等反馈。", focus:["are","waiting"], scene:"UX/UI"},
    {en:"You are presenting the design.", cn:"你在讲设计。", focus:["are","presenting"], scene:"UX/UI"},
    {en:"You are testing the prototype.", cn:"你在测原型。", focus:["are","testing"], scene:"UX/UI"},
    {en:"You are talking to users.", cn:"你在和用户聊。", focus:["are","talking"], scene:"UX/UI"},
    {en:"You are sharing the Figma link.", cn:"你在发 Figma 链接。", focus:["are","sharing"], scene:"UX/UI"},
    {en:"You are changing the text size.", cn:"你在改字号。", focus:["are","changing"], scene:"UX/UI"},
    {en:"You are reviewing the screens.", cn:"你在看页面。", focus:["are","reviewing"], scene:"UX/UI"},
    {en:"You are saving the file.", cn:"你在保存文件。", focus:["are","saving"], scene:"UX/UI"},
    {en:"You are reading the notes.", cn:"你在看备注。", focus:["are","reading"], scene:"UX/UI"},
    {en:"You are updating the icons.", cn:"你在更新图标。", focus:["are","updating"], scene:"UX/UI"},
    {en:"You are cleaning up the layout.", cn:"你在整理布局。", focus:["are","cleaning"], scene:"UX/UI"},
    {en:"You are aligning the buttons.", cn:"你在对齐按钮。", focus:["are","aligning"], scene:"UX/UI"},
    {en:"You are writing the copy.", cn:"你在写文案。", focus:["are","writing"], scene:"UX/UI"},
    {en:"You are building the design system.", cn:"你在做设计系统。", focus:["are","building"], scene:"UX/UI"},
    {en:"You are recording a demo.", cn:"你在录演示。", focus:["are","recording"], scene:"UX/UI"},
    {en:"You are joining the design call.", cn:"你在进设计会。", focus:["are","joining"], scene:"UX/UI"},
    {en:"You are having lunch.", cn:"你在吃午饭。", focus:["are","having"], scene:"生活"},
    {en:"You are cooking dinner.", cn:"你在做晚饭。", focus:["are","cooking"], scene:"生活"},
    {en:"You are ordering coffee.", cn:"你在点咖啡。", focus:["are","ordering"], scene:"生活"},
    {en:"You are waiting for a friend.", cn:"你在等朋友。", focus:["are","waiting"], scene:"生活"},
    {en:"You are checking your email.", cn:"你在查邮件。", focus:["are","checking"], scene:"生活"},
    {en:"You are charging your phone.", cn:"你在给手机充电。", focus:["are","charging"], scene:"生活"},
    {en:"You are packing for the trip.", cn:"你在收拾旅行行李。", focus:["are","packing"], scene:"旅行"},
    {en:"You are looking for the gate.", cn:"你在找登机口。", focus:["are","looking"], scene:"旅行"},
    {en:"You are booking a hotel.", cn:"你在订酒店。", focus:["are","booking"], scene:"旅行"},
    {en:"You are checking in online.", cn:"你在网上值机。", focus:["are","checking"], scene:"旅行"},
    {en:"You are looking for a taxi.", cn:"你在找出租车。", focus:["are","looking"], scene:"旅行"},
    {en:"You are waiting at the gate.", cn:"你在登机口等。", focus:["are","waiting"], scene:"旅行"},
    {en:"You are boarding the plane.", cn:"你在登机。", focus:["are","boarding"], scene:"旅行"},
    {en:"You are finding the exit.", cn:"你在找出口。", focus:["are","finding"], scene:"旅行"},
    {en:"We are working on the homepage.", cn:"我们在做首页。", focus:["are","working"], scene:"UX/UI"},
    {en:"We are fixing the colors.", cn:"我们在改颜色。", focus:["are","fixing"], scene:"UX/UI"},
    {en:"We are checking the spacing.", cn:"我们在看间距。", focus:["are","checking"], scene:"UX/UI"},
    {en:"We are drawing new icons.", cn:"我们在画新图标。", focus:["are","drawing"], scene:"UX/UI"},
    {en:"We are waiting for feedback.", cn:"我们在等反馈。", focus:["are","waiting"], scene:"UX/UI"},
    {en:"We are presenting the design.", cn:"我们在讲设计。", focus:["are","presenting"], scene:"UX/UI"},
    {en:"We are talking to users.", cn:"我们在和用户聊。", focus:["are","talking"], scene:"UX/UI"},
    {en:"We are sharing the Figma link.", cn:"我们在发 Figma 链接。", focus:["are","sharing"], scene:"UX/UI"},
    {en:"We are changing the text size.", cn:"我们在改字号。", focus:["are","changing"], scene:"UX/UI"},
    {en:"We are saving the file.", cn:"我们在保存文件。", focus:["are","saving"], scene:"UX/UI"},
    {en:"We are reading the notes.", cn:"我们在看备注。", focus:["are","reading"], scene:"UX/UI"},
    {en:"We are updating the icons.", cn:"我们在更新图标。", focus:["are","updating"], scene:"UX/UI"},
    {en:"We are cleaning up the layout.", cn:"我们在整理布局。", focus:["are","cleaning"], scene:"UX/UI"},
    {en:"We are aligning the buttons.", cn:"我们在对齐按钮。", focus:["are","aligning"], scene:"UX/UI"},
    {en:"We are writing the copy.", cn:"我们在写文案。", focus:["are","writing"], scene:"UX/UI"},
    {en:"We are building the design system.", cn:"我们在做设计系统。", focus:["are","building"], scene:"UX/UI"},
    {en:"We are recording a demo.", cn:"我们在录演示。", focus:["are","recording"], scene:"UX/UI"},
    {en:"We are joining the design call.", cn:"我们在进设计会。", focus:["are","joining"], scene:"UX/UI"},
    {en:"We are having lunch.", cn:"我们在吃午饭。", focus:["are","having"], scene:"生活"},
    {en:"We are cooking dinner.", cn:"我们在做晚饭。", focus:["are","cooking"], scene:"生活"},
    {en:"We are waiting for a friend.", cn:"我们在等朋友。", focus:["are","waiting"], scene:"生活"},
    {en:"We are checking our email.", cn:"我们在查邮件。", focus:["are","checking"], scene:"生活"},
    {en:"We are charging our phones.", cn:"我们在给手机充电。", focus:["are","charging"], scene:"生活"},
    {en:"We are packing for the trip.", cn:"我们在收拾旅行行李。", focus:["are","packing"], scene:"旅行"},
    {en:"We are looking for the gate.", cn:"我们在找登机口。", focus:["are","looking"], scene:"旅行"},
    {en:"We are booking a hotel.", cn:"我们在订酒店。", focus:["are","booking"], scene:"旅行"},
    {en:"We are checking in online.", cn:"我们在网上值机。", focus:["are","checking"], scene:"旅行"},
    {en:"We are waiting at the gate.", cn:"我们在登机口等。", focus:["are","waiting"], scene:"旅行"},
    {en:"We are boarding the plane.", cn:"我们在登机。", focus:["are","boarding"], scene:"旅行"},
    {en:"We are finding the exit.", cn:"我们在找出口。", focus:["are","finding"], scene:"旅行"},
    {en:"They are working on the homepage.", cn:"他们在做首页。", focus:["are","working"], scene:"UX/UI"},
    {en:"They are fixing the colors.", cn:"他们在改颜色。", focus:["are","fixing"], scene:"UX/UI"},
    {en:"They are checking the spacing.", cn:"他们在看间距。", focus:["are","checking"], scene:"UX/UI"},
    {en:"They are waiting for feedback.", cn:"他们在等反馈。", focus:["are","waiting"], scene:"UX/UI"},
    {en:"They are presenting the design.", cn:"他们在讲设计。", focus:["are","presenting"], scene:"UX/UI"},
    {en:"They are testing the prototype.", cn:"他们在测原型。", focus:["are","testing"], scene:"UX/UI"},
    {en:"They are talking to users.", cn:"他们在和用户聊。", focus:["are","talking"], scene:"UX/UI"},
    {en:"They are sharing the Figma link.", cn:"他们在发 Figma 链接。", focus:["are","sharing"], scene:"UX/UI"},
    {en:"They are changing the text size.", cn:"他们在改字号。", focus:["are","changing"], scene:"UX/UI"},
    {en:"They are reviewing the screens.", cn:"他们在看页面。", focus:["are","reviewing"], scene:"UX/UI"},
    {en:"They are saving the file.", cn:"他们在保存文件。", focus:["are","saving"], scene:"UX/UI"},
    {en:"They are reading the notes.", cn:"他们在看备注。", focus:["are","reading"], scene:"UX/UI"},
    {en:"They are updating the icons.", cn:"他们在更新图标。", focus:["are","updating"], scene:"UX/UI"},
    {en:"They are cleaning up the layout.", cn:"他们在整理布局。", focus:["are","cleaning"], scene:"UX/UI"},
    {en:"They are aligning the buttons.", cn:"他们在对齐按钮。", focus:["are","aligning"], scene:"UX/UI"},
    {en:"They are writing the copy.", cn:"他们在写文案。", focus:["are","writing"], scene:"UX/UI"},
    {en:"They are building the design system.", cn:"他们在做设计系统。", focus:["are","building"], scene:"UX/UI"},
    {en:"They are recording a demo.", cn:"他们在录演示。", focus:["are","recording"], scene:"UX/UI"},
    {en:"They are joining the design call.", cn:"他们在进设计会。", focus:["are","joining"], scene:"UX/UI"},
    {en:"They are having lunch.", cn:"他们在吃午饭。", focus:["are","having"], scene:"生活"},
    {en:"They are cooking dinner.", cn:"他们在做晚饭。", focus:["are","cooking"], scene:"生活"},
    {en:"They are ordering coffee.", cn:"他们在点咖啡。", focus:["are","ordering"], scene:"生活"},
    {en:"They are waiting for a friend.", cn:"他们在等朋友。", focus:["are","waiting"], scene:"生活"},
    {en:"They are checking their email.", cn:"他们在查邮件。", focus:["are","checking"], scene:"生活"},
    {en:"They are charging their phones.", cn:"他们在给手机充电。", focus:["are","charging"], scene:"生活"},
    {en:"They are packing for the trip.", cn:"他们在收拾旅行行李。", focus:["are","packing"], scene:"旅行"},
    {en:"They are looking for the gate.", cn:"他们在找登机口。", focus:["are","looking"], scene:"旅行"},
    {en:"They are booking a hotel.", cn:"他们在订酒店。", focus:["are","booking"], scene:"旅行"},
    {en:"They are checking in online.", cn:"他们在网上值机。", focus:["are","checking"], scene:"旅行"},
    {en:"They are looking for a taxi.", cn:"他们在找出租车。", focus:["are","looking"], scene:"旅行"},
    {en:"They are waiting at the gate.", cn:"他们在登机口等。", focus:["are","waiting"], scene:"旅行"},
    {en:"They are boarding the plane.", cn:"他们在登机。", focus:["are","boarding"], scene:"旅行"},
    {en:"They are finding the exit.", cn:"他们在找出口。", focus:["are","finding"], scene:"旅行"},
    {en:"He is working on the homepage.", cn:"他在做首页。", focus:["is","working"], scene:"UX/UI"},
    {en:"He is fixing the colors.", cn:"他在改颜色。", focus:["is","fixing"], scene:"UX/UI"},
    {en:"He is drawing new icons.", cn:"他在画新图标。", focus:["is","drawing"], scene:"UX/UI"},
    {en:"He is waiting for feedback.", cn:"他在等反馈。", focus:["is","waiting"], scene:"UX/UI"},
    {en:"He is presenting the design.", cn:"他在讲设计。", focus:["is","presenting"], scene:"UX/UI"},
    {en:"He is testing the prototype.", cn:"他在测原型。", focus:["is","testing"], scene:"UX/UI"},
    {en:"He is sharing the Figma link.", cn:"他在发 Figma 链接。", focus:["is","sharing"], scene:"UX/UI"},
    {en:"He is changing the text size.", cn:"他在改字号。", focus:["is","changing"], scene:"UX/UI"},
    {en:"He is reviewing the screens.", cn:"他在看页面。", focus:["is","reviewing"], scene:"UX/UI"},
    {en:"He is saving the file.", cn:"他在保存文件。", focus:["is","saving"], scene:"UX/UI"},
    {en:"He is reading the notes.", cn:"他在看备注。", focus:["is","reading"], scene:"UX/UI"},
    {en:"He is updating the icons.", cn:"他在更新图标。", focus:["is","updating"], scene:"UX/UI"},
    {en:"He is cleaning up the layout.", cn:"他在整理布局。", focus:["is","cleaning"], scene:"UX/UI"},
    {en:"He is aligning the buttons.", cn:"他在对齐按钮。", focus:["is","aligning"], scene:"UX/UI"},
    {en:"He is writing the copy.", cn:"他在写文案。", focus:["is","writing"], scene:"UX/UI"},
    {en:"He is building the design system.", cn:"他在做设计系统。", focus:["is","building"], scene:"UX/UI"},
    {en:"He is recording a demo.", cn:"他在录演示。", focus:["is","recording"], scene:"UX/UI"},
    {en:"He is joining the design call.", cn:"他在进设计会。", focus:["is","joining"], scene:"UX/UI"},
    {en:"He is having lunch.", cn:"他在吃午饭。", focus:["is","having"], scene:"生活"},
    {en:"He is cooking dinner.", cn:"他在做晚饭。", focus:["is","cooking"], scene:"生活"},
    {en:"He is ordering coffee.", cn:"他在点咖啡。", focus:["is","ordering"], scene:"生活"},
    {en:"He is waiting for a friend.", cn:"他在等朋友。", focus:["is","waiting"], scene:"生活"},
    {en:"He is checking his email.", cn:"他在查邮件。", focus:["is","checking"], scene:"生活"},
    {en:"He is charging his phone.", cn:"他在给手机充电。", focus:["is","charging"], scene:"生活"},
    {en:"He is packing for the trip.", cn:"他在收拾旅行行李。", focus:["is","packing"], scene:"旅行"},
    {en:"He is looking for the gate.", cn:"他在找登机口。", focus:["is","looking"], scene:"旅行"},
    {en:"He is checking in online.", cn:"他在网上值机。", focus:["is","checking"], scene:"旅行"},
    {en:"He is looking for a taxi.", cn:"他在找出租车。", focus:["is","looking"], scene:"旅行"},
    {en:"He is waiting at the gate.", cn:"他在登机口等。", focus:["is","waiting"], scene:"旅行"},
    {en:"He is boarding the plane.", cn:"他在登机。", focus:["is","boarding"], scene:"旅行"},
    {en:"He is finding the exit.", cn:"他在找出口。", focus:["is","finding"], scene:"旅行"},
    {en:"She is working on the homepage.", cn:"她在做首页。", focus:["is","working"], scene:"UX/UI"},
    {en:"She is checking the spacing.", cn:"她在看间距。", focus:["is","checking"], scene:"UX/UI"},
    {en:"She is drawing new icons.", cn:"她在画新图标。", focus:["is","drawing"], scene:"UX/UI"},
    {en:"She is waiting for feedback.", cn:"她在等反馈。", focus:["is","waiting"], scene:"UX/UI"},
    {en:"She is presenting the design.", cn:"她在讲设计。", focus:["is","presenting"], scene:"UX/UI"},
    {en:"She is testing the prototype.", cn:"她在测原型。", focus:["is","testing"], scene:"UX/UI"},
    {en:"She is talking to users.", cn:"她在和用户聊。", focus:["is","talking"], scene:"UX/UI"},
    {en:"She is sharing the Figma link.", cn:"她在发 Figma 链接。", focus:["is","sharing"], scene:"UX/UI"},
    {en:"She is reviewing the screens.", cn:"她在看页面。", focus:["is","reviewing"], scene:"UX/UI"},
    {en:"She is reading the notes.", cn:"她在看备注。", focus:["is","reading"], scene:"UX/UI"},
    {en:"She is updating the icons.", cn:"她在更新图标。", focus:["is","updating"], scene:"UX/UI"},
    {en:"She is cleaning up the layout.", cn:"她在整理布局。", focus:["is","cleaning"], scene:"UX/UI"},
    {en:"She is aligning the buttons.", cn:"她在对齐按钮。", focus:["is","aligning"], scene:"UX/UI"},
    {en:"She is writing the copy.", cn:"她在写文案。", focus:["is","writing"], scene:"UX/UI"},
    {en:"She is building the design system.", cn:"她在做设计系统。", focus:["is","building"], scene:"UX/UI"},
    {en:"She is recording a demo.", cn:"她在录演示。", focus:["is","recording"], scene:"UX/UI"},
    {en:"She is joining the design call.", cn:"她在进设计会。", focus:["is","joining"], scene:"UX/UI"},
    {en:"She is having lunch.", cn:"她在吃午饭。", focus:["is","having"], scene:"生活"},
    {en:"She is cooking dinner.", cn:"她在做晚饭。", focus:["is","cooking"], scene:"生活"},
    {en:"She is ordering coffee.", cn:"她在点咖啡。", focus:["is","ordering"], scene:"生活"},
    {en:"She is waiting for a friend.", cn:"她在等朋友。", focus:["is","waiting"], scene:"生活"},
    {en:"She is checking her email.", cn:"她在查邮件。", focus:["is","checking"], scene:"生活"},
    {en:"She is charging her phone.", cn:"她在给手机充电。", focus:["is","charging"], scene:"生活"},
    {en:"She is packing for the trip.", cn:"她在收拾旅行行李。", focus:["is","packing"], scene:"旅行"},
    {en:"She is booking a hotel.", cn:"她在订酒店。", focus:["is","booking"], scene:"旅行"},
    {en:"She is checking in online.", cn:"她在网上值机。", focus:["is","checking"], scene:"旅行"},
    {en:"She is looking for a taxi.", cn:"她在找出租车。", focus:["is","looking"], scene:"旅行"},
    {en:"She is waiting at the gate.", cn:"她在登机口等。", focus:["is","waiting"], scene:"旅行"},
    {en:"She is boarding the plane.", cn:"她在登机。", focus:["is","boarding"], scene:"旅行"},
    {en:"She is finding the exit.", cn:"她在找出口。", focus:["is","finding"], scene:"旅行"},
    {en:"The file is uploading.", cn:"文件正在上传。", focus:["is","uploading"], scene:"UX/UI"},
    {en:"The app is updating.", cn:"应用正在更新。", focus:["is","updating"], scene:"UX/UI"},
    {en:"The video is playing.", cn:"视频正在播放。", focus:["is","playing"], scene:"UX/UI"}
],
  "present-s": [
    {en:"She designs mobile apps.", cn:"她设计手机应用。", focus:["designs"], scene:"UX/UI"},
    {en:"He uses Figma every day.", cn:"他每天用 Figma。", focus:["uses"], scene:"UX/UI"},
    {en:"The app looks clean.", cn:"这个应用看起来很干净。", focus:["looks"], scene:"UX/UI"},
    {en:"She likes simple layouts.", cn:"她喜欢简单布局。", focus:["likes"], scene:"UX/UI"},
    {en:"He starts work at nine.", cn:"他九点开始工作。", focus:["starts"], scene:"UX/UI"},
    {en:"She checks email early.", cn:"她很早查邮件。", focus:["checks"], scene:"UX/UI"},
    {en:"He sends designs on Friday.", cn:"他周五发设计稿。", focus:["sends"], scene:"UX/UI"},
    {en:"She meets the team on Mondays.", cn:"她周一和团队开会。", focus:["meets"], scene:"UX/UI"},
    {en:"He takes the metro to work.", cn:"他坐地铁上班。", focus:["takes"], scene:"生活"},
    {en:"She drinks coffee every morning.", cn:"她每天早上喝咖啡。", focus:["drinks"], scene:"生活"},
    {en:"He speaks English in meetings.", cn:"他开会时说英语。", focus:["speaks"], scene:"UX/UI"},
    {en:"She cooks simple dinners.", cn:"她做简单晚饭。", focus:["cooks"], scene:"生活"},
    {en:"The train leaves at nine.", cn:"火车九点开。", focus:["leaves"], scene:"旅行"},
    {en:"The flight lands at noon.", cn:"航班中午降落。", focus:["lands"], scene:"旅行"},
    {en:"The hotel offers breakfast.", cn:"酒店有早餐。", focus:["offers"], scene:"旅行"},
    {en:"He travels for work sometimes.", cn:"他有时出差。", focus:["travels"], scene:"旅行"},
    {en:"She replies quickly.", cn:"她回复很快。", focus:["replies"], scene:"UX/UI"},
    {en:"The page needs more space.", cn:"这个页面需要更多空间。", focus:["needs"], scene:"UX/UI"},
    {en:"He draws icons carefully.", cn:"他仔细画图标。", focus:["draws"], scene:"UX/UI"},
    {en:"She reviews designs every week.", cn:"她每周评审设计。", focus:["reviews"], scene:"UX/UI"},
    {en:"The cafe opens early.", cn:"咖啡馆开得早。", focus:["opens"], scene:"生活"},
    {en:"He books hotels early.", cn:"他很早订酒店。", focus:["books"], scene:"旅行"},
    {en:"She always asks for feedback.", cn:"她总是要反馈。", focus:["asks"], scene:"UX/UI"},
    {en:"The button works well.", cn:"这个按钮好用。", focus:["works"], scene:"UX/UI"},
    {en:"She uses Figma every day.", cn:"她每天用 Figma。", focus:["uses"], scene:"UX/UI"},
    {en:"She starts work at nine.", cn:"她九点开始工作。", focus:["starts"], scene:"UX/UI"},
    {en:"She sends designs on Friday.", cn:"她周五发设计稿。", focus:["sends"], scene:"UX/UI"},
    {en:"She draws icons carefully.", cn:"她仔细画图标。", focus:["draws"], scene:"UX/UI"},
    {en:"She asks for feedback.", cn:"她要反馈。", focus:["asks"], scene:"UX/UI"},
    {en:"She shares the prototype.", cn:"她分享原型。", focus:["shares"], scene:"UX/UI"},
    {en:"She tests the flow.", cn:"她测流程。", focus:["tests"], scene:"UX/UI"},
    {en:"She writes clear labels.", cn:"她写清楚的标签。", focus:["writes"], scene:"UX/UI"},
    {en:"She takes the metro to work.", cn:"她坐地铁上班。", focus:["takes"], scene:"生活"},
    {en:"She speaks English in meetings.", cn:"她开会时说英语。", focus:["speaks"], scene:"UX/UI"},
    {en:"She travels for work sometimes.", cn:"她有时出差。", focus:["travels"], scene:"旅行"},
    {en:"She books hotels early.", cn:"她很早订酒店。", focus:["books"], scene:"旅行"},
    {en:"She leaves home at eight.", cn:"她八点出门。", focus:["leaves"], scene:"生活"},
    {en:"She arrives on time.", cn:"她准时到。", focus:["arrives"], scene:"生活"},
    {en:"He designs mobile apps.", cn:"他设计手机应用。", focus:["designs"], scene:"UX/UI"},
    {en:"He likes simple layouts.", cn:"他喜欢简单布局。", focus:["likes"], scene:"UX/UI"},
    {en:"He checks email early.", cn:"他很早查邮件。", focus:["checks"], scene:"UX/UI"},
    {en:"He meets the team on Mondays.", cn:"他周一和团队开会。", focus:["meets"], scene:"UX/UI"},
    {en:"He replies quickly.", cn:"他回复很快。", focus:["replies"], scene:"UX/UI"},
    {en:"He reviews designs every week.", cn:"他每周评审设计。", focus:["reviews"], scene:"UX/UI"},
    {en:"He asks for feedback.", cn:"他要反馈。", focus:["asks"], scene:"UX/UI"},
    {en:"He shares the prototype.", cn:"他分享原型。", focus:["shares"], scene:"UX/UI"},
    {en:"He tests the flow.", cn:"他测流程。", focus:["tests"], scene:"UX/UI"},
    {en:"He writes clear labels.", cn:"他写清楚的标签。", focus:["writes"], scene:"UX/UI"},
    {en:"He drinks coffee every morning.", cn:"他每天早上喝咖啡。", focus:["drinks"], scene:"生活"},
    {en:"He cooks simple dinners.", cn:"他做简单晚饭。", focus:["cooks"], scene:"生活"},
    {en:"He leaves home at eight.", cn:"他八点出门。", focus:["leaves"], scene:"生活"},
    {en:"He arrives on time.", cn:"他准时到。", focus:["arrives"], scene:"生活"},
    {en:"My manager designs mobile apps.", cn:"我的经理设计手机应用。", focus:["designs"], scene:"UX/UI"},
    {en:"My manager uses Figma every day.", cn:"我的经理每天用 Figma。", focus:["uses"], scene:"UX/UI"},
    {en:"My manager likes simple layouts.", cn:"我的经理喜欢简单布局。", focus:["likes"], scene:"UX/UI"},
    {en:"My manager starts work at nine.", cn:"我的经理九点开始工作。", focus:["starts"], scene:"UX/UI"},
    {en:"My manager checks email early.", cn:"我的经理很早查邮件。", focus:["checks"], scene:"UX/UI"},
    {en:"My manager sends designs on Friday.", cn:"我的经理周五发设计稿。", focus:["sends"], scene:"UX/UI"},
    {en:"My manager meets the team on Mondays.", cn:"我的经理周一和团队开会。", focus:["meets"], scene:"UX/UI"},
    {en:"My manager replies quickly.", cn:"我的经理回复很快。", focus:["replies"], scene:"UX/UI"},
    {en:"My manager draws icons carefully.", cn:"我的经理仔细画图标。", focus:["draws"], scene:"UX/UI"},
    {en:"My manager reviews designs every week.", cn:"我的经理每周评审设计。", focus:["reviews"], scene:"UX/UI"},
    {en:"My manager asks for feedback.", cn:"我的经理要反馈。", focus:["asks"], scene:"UX/UI"},
    {en:"My manager shares the prototype.", cn:"我的经理分享原型。", focus:["shares"], scene:"UX/UI"},
    {en:"My manager tests the flow.", cn:"我的经理测流程。", focus:["tests"], scene:"UX/UI"},
    {en:"My manager writes clear labels.", cn:"我的经理写清楚的标签。", focus:["writes"], scene:"UX/UI"},
    {en:"My manager takes the metro to work.", cn:"我的经理坐地铁上班。", focus:["takes"], scene:"生活"},
    {en:"My manager drinks coffee every morning.", cn:"我的经理每天早上喝咖啡。", focus:["drinks"], scene:"生活"},
    {en:"My manager cooks simple dinners.", cn:"我的经理做简单晚饭。", focus:["cooks"], scene:"生活"},
    {en:"My manager speaks English in meetings.", cn:"我的经理开会时说英语。", focus:["speaks"], scene:"UX/UI"},
    {en:"My manager travels for work sometimes.", cn:"我的经理有时出差。", focus:["travels"], scene:"旅行"},
    {en:"My manager books hotels early.", cn:"我的经理很早订酒店。", focus:["books"], scene:"旅行"},
    {en:"My manager leaves home at eight.", cn:"我的经理八点出门。", focus:["leaves"], scene:"生活"},
    {en:"My manager arrives on time.", cn:"我的经理准时到。", focus:["arrives"], scene:"生活"},
    {en:"The designer designs mobile apps.", cn:"那位设计师设计手机应用。", focus:["designs"], scene:"UX/UI"},
    {en:"The designer uses Figma every day.", cn:"那位设计师每天用 Figma。", focus:["uses"], scene:"UX/UI"},
    {en:"The designer likes simple layouts.", cn:"那位设计师喜欢简单布局。", focus:["likes"], scene:"UX/UI"},
    {en:"The designer starts work at nine.", cn:"那位设计师九点开始工作。", focus:["starts"], scene:"UX/UI"},
    {en:"The designer checks email early.", cn:"那位设计师很早查邮件。", focus:["checks"], scene:"UX/UI"},
    {en:"The designer sends designs on Friday.", cn:"那位设计师周五发设计稿。", focus:["sends"], scene:"UX/UI"},
    {en:"The designer meets the team on Mondays.", cn:"那位设计师周一和团队开会。", focus:["meets"], scene:"UX/UI"},
    {en:"The designer replies quickly.", cn:"那位设计师回复很快。", focus:["replies"], scene:"UX/UI"},
    {en:"The designer draws icons carefully.", cn:"那位设计师仔细画图标。", focus:["draws"], scene:"UX/UI"},
    {en:"The designer reviews designs every week.", cn:"那位设计师每周评审设计。", focus:["reviews"], scene:"UX/UI"},
    {en:"The designer asks for feedback.", cn:"那位设计师要反馈。", focus:["asks"], scene:"UX/UI"},
    {en:"The designer shares the prototype.", cn:"那位设计师分享原型。", focus:["shares"], scene:"UX/UI"},
    {en:"The designer tests the flow.", cn:"那位设计师测流程。", focus:["tests"], scene:"UX/UI"},
    {en:"The designer writes clear labels.", cn:"那位设计师写清楚的标签。", focus:["writes"], scene:"UX/UI"},
    {en:"The designer takes the metro to work.", cn:"那位设计师坐地铁上班。", focus:["takes"], scene:"生活"},
    {en:"The designer drinks coffee every morning.", cn:"那位设计师每天早上喝咖啡。", focus:["drinks"], scene:"生活"},
    {en:"The designer cooks simple dinners.", cn:"那位设计师做简单晚饭。", focus:["cooks"], scene:"生活"},
    {en:"The designer speaks English in meetings.", cn:"那位设计师开会时说英语。", focus:["speaks"], scene:"UX/UI"},
    {en:"The designer travels for work sometimes.", cn:"那位设计师有时出差。", focus:["travels"], scene:"旅行"},
    {en:"The designer books hotels early.", cn:"那位设计师很早订酒店。", focus:["books"], scene:"旅行"},
    {en:"The designer leaves home at eight.", cn:"那位设计师八点出门。", focus:["leaves"], scene:"生活"},
    {en:"The designer arrives on time.", cn:"那位设计师准时到。", focus:["arrives"], scene:"生活"},
    {en:"Our team designs mobile apps.", cn:"我们团队设计手机应用。", focus:["designs"], scene:"UX/UI"},
    {en:"Our team uses Figma every day.", cn:"我们团队每天用 Figma。", focus:["uses"], scene:"UX/UI"},
    {en:"Our team likes simple layouts.", cn:"我们团队喜欢简单布局。", focus:["likes"], scene:"UX/UI"},
    {en:"Our team starts work at nine.", cn:"我们团队九点开始工作。", focus:["starts"], scene:"UX/UI"},
    {en:"Our team checks email early.", cn:"我们团队很早查邮件。", focus:["checks"], scene:"UX/UI"},
    {en:"Our team sends designs on Friday.", cn:"我们团队周五发设计稿。", focus:["sends"], scene:"UX/UI"},
    {en:"Our team meets every Monday.", cn:"我们团队每周一开会。", focus:["meets"], scene:"UX/UI"},
    {en:"Our team replies quickly.", cn:"我们团队回复很快。", focus:["replies"], scene:"UX/UI"},
    {en:"Our team draws icons carefully.", cn:"我们团队仔细画图标。", focus:["draws"], scene:"UX/UI"},
    {en:"Our team reviews designs every week.", cn:"我们团队每周评审设计。", focus:["reviews"], scene:"UX/UI"},
    {en:"Our team asks for feedback.", cn:"我们团队要反馈。", focus:["asks"], scene:"UX/UI"},
    {en:"Our team shares the prototype.", cn:"我们团队分享原型。", focus:["shares"], scene:"UX/UI"},
    {en:"Our team tests the flow.", cn:"我们团队测流程。", focus:["tests"], scene:"UX/UI"},
    {en:"Our team writes clear labels.", cn:"我们团队写清楚的标签。", focus:["writes"], scene:"UX/UI"},
    {en:"Our team works from home on Fridays.", cn:"我们团队周五在家办公。", focus:["works"], scene:"UX/UI"},
    {en:"Our team drinks coffee every morning.", cn:"我们团队每天早上喝咖啡。", focus:["drinks"], scene:"生活"},
    {en:"Our team keeps designs simple.", cn:"我们团队让设计保持简单。", focus:["keeps"], scene:"UX/UI"},
    {en:"Our team speaks English in meetings.", cn:"我们团队开会时说英语。", focus:["speaks"], scene:"UX/UI"},
    {en:"Our team travels for work sometimes.", cn:"我们团队有时出差。", focus:["travels"], scene:"旅行"},
    {en:"Our team books hotels early.", cn:"我们团队很早订酒店。", focus:["books"], scene:"旅行"},
    {en:"Our team finishes at six.", cn:"我们团队六点收工。", focus:["finishes"], scene:"UX/UI"},
    {en:"Our team arrives on time.", cn:"我们团队准时到。", focus:["arrives"], scene:"生活"},
    {en:"The store closes at ten.", cn:"商店十点关门。", focus:["closes"], scene:"生活"},
    {en:"The menu looks clear.", cn:"菜单看起来清楚。", focus:["looks"], scene:"UX/UI"},
    {en:"The form takes too long.", cn:"填表太花时间。", focus:["takes"], scene:"UX/UI"}
],
  "present-neg": [
    {en:"I don't like this color.", cn:"我不喜欢这个颜色。", focus:["don't","like"], scene:"UX/UI"},
    {en:"She doesn't need more icons.", cn:"她不需要更多图标。", focus:["doesn't","need"], scene:"UX/UI"},
    {en:"Do you use Figma?", cn:"你用 Figma 吗？", focus:["Do","use"], scene:"UX/UI"},
    {en:"Does this button work?", cn:"这个按钮能用吗？", focus:["Does","work"], scene:"UX/UI"},
    {en:"He doesn't like busy pages.", cn:"他不喜欢花哨的页面。", focus:["doesn't","like"], scene:"UX/UI"},
    {en:"I don't have time today.", cn:"我今天没时间。", focus:["don't","have"], scene:"生活"},
    {en:"We don't work on weekends.", cn:"我们周末不上班。", focus:["don't","work"], scene:"生活"},
    {en:"Do you have Wi-Fi here?", cn:"这里有 Wi-Fi 吗？", focus:["Do","have"], scene:"旅行"},
    {en:"Does this train stop at the airport?", cn:"这趟车在机场停吗？", focus:["Does","stop"], scene:"旅行"},
    {en:"She doesn't mind a window seat.", cn:"她不介意靠窗座位。", focus:["doesn't","mind"], scene:"旅行"},
    {en:"I don't drink coffee at night.", cn:"我晚上不喝咖啡。", focus:["don't","drink"], scene:"生活"},
    {en:"He doesn't understand this feedback.", cn:"他没听懂这个反馈。", focus:["doesn't","understand"], scene:"UX/UI"},
    {en:"Do you want tea?", cn:"你想喝茶吗？", focus:["Do","want"], scene:"生活"},
    {en:"Does she speak English?", cn:"她会说英语吗？", focus:["Does","speak"], scene:"UX/UI"},
    {en:"We don't change colors lightly.", cn:"我们不随便改颜色。", focus:["don't","change"], scene:"UX/UI"},
    {en:"I don't know the gate number.", cn:"我不知道登机口号。", focus:["don't","know"], scene:"旅行"},
    {en:"Do you accept cards?", cn:"你们收卡吗？", focus:["Do","accept"], scene:"旅行"},
    {en:"He doesn't use that old style.", cn:"他不用那种旧风格。", focus:["doesn't","use"], scene:"UX/UI"},
    {en:"I don't want a complex layout.", cn:"我不想要复杂布局。", focus:["don't","want"], scene:"UX/UI"},
    {en:"She doesn't like small text.", cn:"她不喜欢小字。", focus:["doesn't","like"], scene:"UX/UI"},
    {en:"Do you need help?", cn:"你需要帮忙吗？", focus:["Do","need"], scene:"生活"},
    {en:"Does the menu look clear?", cn:"菜单看起来清楚吗？", focus:["Does","look"], scene:"UX/UI"},
    {en:"I don't book late flights.", cn:"我不订很晚的航班。", focus:["don't","book"], scene:"旅行"},
    {en:"We don't use too many colors.", cn:"我们不用太多颜色。", focus:["don't","use"], scene:"UX/UI"},
    {en:"I don't use that old style.", cn:"我不用那种旧风格。", focus:["don't","use"], scene:"UX/UI"},
    {en:"I don't change colors lightly.", cn:"我不随便改颜色。", focus:["don't","change"], scene:"UX/UI"},
    {en:"I don't understand this error.", cn:"我看不懂这个报错。", focus:["don't","understand"], scene:"UX/UI"},
    {en:"I don't need more icons.", cn:"我不需要更多图标。", focus:["don't","need"], scene:"UX/UI"},
    {en:"She doesn't work on weekends.", cn:"她周末不上班。", focus:["doesn't","work"], scene:"生活"},
    {en:"She doesn't use dark mode.", cn:"她不用深色模式。", focus:["doesn't","use"], scene:"UX/UI"},
    {en:"He doesn't take the bus.", cn:"他不坐公交。", focus:["doesn't","take"], scene:"旅行"},
    {en:"He doesn't join late calls.", cn:"他不参加很晚的会。", focus:["doesn't","join"], scene:"UX/UI"},
    {en:"We don't change the brand color.", cn:"我们不改品牌色。", focus:["don't","change"], scene:"UX/UI"},
    {en:"We don't skip user research.", cn:"我们不跳过用户研究。", focus:["don't","skip"], scene:"UX/UI"},
    {en:"Do you like this layout?", cn:"你喜欢这个布局吗？", focus:["Do","like"], scene:"UX/UI"},
    {en:"Does he work remote?", cn:"他远程办公吗？", focus:["Does","work"], scene:"UX/UI"},
    {en:"Do they need the prototype today?", cn:"他们今天需要原型吗？", focus:["Do","need"], scene:"UX/UI"},
    {en:"I don't like this icon.", cn:"我不喜欢这个图标。", focus:["don't","like"], scene:"UX/UI"},
    {en:"I don't like this layout.", cn:"我不喜欢这个布局。", focus:["don't","like"], scene:"UX/UI"},
    {en:"I don't like this button.", cn:"我不喜欢这个按钮。", focus:["don't","like"], scene:"UX/UI"},
    {en:"I don't like this menu.", cn:"我不喜欢这个菜单。", focus:["don't","like"], scene:"UX/UI"},
    {en:"I don't like dark mode.", cn:"我不喜欢深色模式。", focus:["don't","like"], scene:"UX/UI"},
    {en:"I don't like that style.", cn:"我不喜欢那种风格。", focus:["don't","like"], scene:"UX/UI"}
],
  "past": [
    {en:"I finished the homepage yesterday.", cn:"我昨天做完了首页。", focus:["finished"], scene:"UX/UI"},
    {en:"She changed the button color.", cn:"她改了按钮颜色。", focus:["changed"], scene:"UX/UI"},
    {en:"We sent the Figma link.", cn:"我们发了 Figma 链接。", focus:["sent"], scene:"UX/UI"},
    {en:"He got good feedback.", cn:"他收到了不错的反馈。", focus:["got"], scene:"UX/UI"},
    {en:"I made the text bigger.", cn:"我把字放大了。", focus:["made"], scene:"UX/UI"},
    {en:"She fixed the spacing.", cn:"她修好了间距。", focus:["fixed"], scene:"UX/UI"},
    {en:"We showed three design ideas.", cn:"我们展示了三个设计想法。", focus:["showed"], scene:"UX/UI"},
    {en:"He talked to two users.", cn:"他和两位用户聊了。", focus:["talked"], scene:"UX/UI"},
    {en:"I booked a hotel near the station.", cn:"我订了车站附近的酒店。", focus:["booked"], scene:"旅行"},
    {en:"She missed the morning flight.", cn:"她错过了早班飞机。", focus:["missed"], scene:"旅行"},
    {en:"We bought a new charger.", cn:"我们买了个新充电器。", focus:["bought"], scene:"生活"},
    {en:"He ordered lunch for the team.", cn:"他给团队点了午饭。", focus:["ordered"], scene:"生活"},
    {en:"I updated the icons last night.", cn:"我昨晚更新了图标。", focus:["updated"], scene:"UX/UI"},
    {en:"She left early yesterday.", cn:"她昨天早走了。", focus:["left"], scene:"生活"},
    {en:"We took a taxi to the hotel.", cn:"我们打车去了酒店。", focus:["took"], scene:"旅行"},
    {en:"He joined the design review.", cn:"他参加了设计评审。", focus:["joined"], scene:"UX/UI"},
    {en:"I liked the second version.", cn:"我喜欢第二版。", focus:["liked"], scene:"UX/UI"},
    {en:"She packed her bag.", cn:"她收拾好了包。", focus:["packed"], scene:"旅行"},
    {en:"We arrived on time.", cn:"我们准时到了。", focus:["arrived"], scene:"旅行"},
    {en:"He tried a new layout.", cn:"他试了新布局。", focus:["tried"], scene:"UX/UI"},
    {en:"I asked for more feedback.", cn:"我要了更多反馈。", focus:["asked"], scene:"UX/UI"},
    {en:"She drew three icons.", cn:"她画了三个图标。", focus:["drew"], scene:"UX/UI"},
    {en:"We checked in online.", cn:"我们网上值机了。", focus:["checked"], scene:"旅行"},
    {en:"He found the gate.", cn:"他找到了登机口。", focus:["found"], scene:"旅行"},
    {en:"I changed the button color.", cn:"我改了按钮颜色。", focus:["changed"], scene:"UX/UI"},
    {en:"I sent the Figma link.", cn:"我发了 Figma 链接。", focus:["sent"], scene:"UX/UI"},
    {en:"I got good feedback.", cn:"我收到了不错的反馈。", focus:["got"], scene:"UX/UI"},
    {en:"I fixed the spacing.", cn:"我修好了间距。", focus:["fixed"], scene:"UX/UI"},
    {en:"I showed three design ideas.", cn:"我展示了三个设计想法。", focus:["showed"], scene:"UX/UI"},
    {en:"I talked to two users.", cn:"我和两位用户聊了。", focus:["talked"], scene:"UX/UI"},
    {en:"I joined the design review.", cn:"我参加了设计评审。", focus:["joined"], scene:"UX/UI"},
    {en:"I tried a new layout.", cn:"我试了新布局。", focus:["tried"], scene:"UX/UI"},
    {en:"I drew three icons.", cn:"我画了三个图标。", focus:["drew"], scene:"UX/UI"},
    {en:"I missed the morning flight.", cn:"我错过了早班飞机。", focus:["missed"], scene:"旅行"},
    {en:"I took a taxi to the hotel.", cn:"我打车去了酒店。", focus:["took"], scene:"旅行"},
    {en:"I packed the bag.", cn:"我收拾好了包。", focus:["packed"], scene:"旅行"},
    {en:"I arrived on time.", cn:"我准时到了。", focus:["arrived"], scene:"旅行"},
    {en:"I checked in online.", cn:"我网上值机了。", focus:["checked"], scene:"旅行"},
    {en:"I found the gate.", cn:"我找到了登机口。", focus:["found"], scene:"旅行"},
    {en:"I bought a new charger.", cn:"我买了个新充电器。", focus:["bought"], scene:"生活"},
    {en:"I ordered lunch for the team.", cn:"我给团队点了午饭。", focus:["ordered"], scene:"生活"},
    {en:"I left early yesterday.", cn:"我昨天早走了。", focus:["left"], scene:"生活"},
    {en:"She finished the homepage yesterday.", cn:"她昨天做完了首页。", focus:["finished"], scene:"UX/UI"},
    {en:"She sent the Figma link.", cn:"她发了 Figma 链接。", focus:["sent"], scene:"UX/UI"},
    {en:"She got good feedback.", cn:"她收到了不错的反馈。", focus:["got"], scene:"UX/UI"},
    {en:"She made the text bigger.", cn:"她把字放大了。", focus:["made"], scene:"UX/UI"},
    {en:"She showed three design ideas.", cn:"她展示了三个设计想法。", focus:["showed"], scene:"UX/UI"},
    {en:"She talked to two users.", cn:"她和两位用户聊了。", focus:["talked"], scene:"UX/UI"},
    {en:"She updated the icons last night.", cn:"她昨晚更新了图标。", focus:["updated"], scene:"UX/UI"},
    {en:"She joined the design review.", cn:"她参加了设计评审。", focus:["joined"], scene:"UX/UI"},
    {en:"She liked the second version.", cn:"她喜欢第二版。", focus:["liked"], scene:"UX/UI"},
    {en:"She tried a new layout.", cn:"她试了新布局。", focus:["tried"], scene:"UX/UI"},
    {en:"She asked for more feedback.", cn:"她要了更多反馈。", focus:["asked"], scene:"UX/UI"},
    {en:"She booked a hotel near the station.", cn:"她订了车站附近的酒店。", focus:["booked"], scene:"旅行"},
    {en:"She took a taxi to the hotel.", cn:"她打车去了酒店。", focus:["took"], scene:"旅行"},
    {en:"She packed the bag.", cn:"她收拾好了包。", focus:["packed"], scene:"旅行"},
    {en:"She arrived on time.", cn:"她准时到了。", focus:["arrived"], scene:"旅行"},
    {en:"She checked in online.", cn:"她网上值机了。", focus:["checked"], scene:"旅行"},
    {en:"She found the gate.", cn:"她找到了登机口。", focus:["found"], scene:"旅行"},
    {en:"She bought a new charger.", cn:"她买了个新充电器。", focus:["bought"], scene:"生活"},
    {en:"She ordered lunch for the team.", cn:"她给团队点了午饭。", focus:["ordered"], scene:"生活"},
    {en:"He finished the homepage yesterday.", cn:"他昨天做完了首页。", focus:["finished"], scene:"UX/UI"},
    {en:"He changed the button color.", cn:"他改了按钮颜色。", focus:["changed"], scene:"UX/UI"},
    {en:"He sent the Figma link.", cn:"他发了 Figma 链接。", focus:["sent"], scene:"UX/UI"},
    {en:"He made the text bigger.", cn:"他把字放大了。", focus:["made"], scene:"UX/UI"},
    {en:"He fixed the spacing.", cn:"他修好了间距。", focus:["fixed"], scene:"UX/UI"},
    {en:"He showed three design ideas.", cn:"他展示了三个设计想法。", focus:["showed"], scene:"UX/UI"},
    {en:"He updated the icons last night.", cn:"他昨晚更新了图标。", focus:["updated"], scene:"UX/UI"},
    {en:"He liked the second version.", cn:"他喜欢第二版。", focus:["liked"], scene:"UX/UI"},
    {en:"He asked for more feedback.", cn:"他要了更多反馈。", focus:["asked"], scene:"UX/UI"},
    {en:"He drew three icons.", cn:"他画了三个图标。", focus:["drew"], scene:"UX/UI"},
    {en:"He booked a hotel near the station.", cn:"他订了车站附近的酒店。", focus:["booked"], scene:"旅行"},
    {en:"He missed the morning flight.", cn:"他错过了早班飞机。", focus:["missed"], scene:"旅行"},
    {en:"He took a taxi to the hotel.", cn:"他打车去了酒店。", focus:["took"], scene:"旅行"},
    {en:"He packed the bag.", cn:"他收拾好了包。", focus:["packed"], scene:"旅行"},
    {en:"He arrived on time.", cn:"他准时到了。", focus:["arrived"], scene:"旅行"},
    {en:"He checked in online.", cn:"他网上值机了。", focus:["checked"], scene:"旅行"},
    {en:"He bought a new charger.", cn:"他买了个新充电器。", focus:["bought"], scene:"生活"},
    {en:"He left early yesterday.", cn:"他昨天早走了。", focus:["left"], scene:"生活"},
    {en:"We finished the homepage yesterday.", cn:"我们昨天做完了首页。", focus:["finished"], scene:"UX/UI"},
    {en:"We changed the button color.", cn:"我们改了按钮颜色。", focus:["changed"], scene:"UX/UI"},
    {en:"We got good feedback.", cn:"我们收到了不错的反馈。", focus:["got"], scene:"UX/UI"},
    {en:"We made the text bigger.", cn:"我们把字放大了。", focus:["made"], scene:"UX/UI"},
    {en:"We fixed the spacing.", cn:"我们修好了间距。", focus:["fixed"], scene:"UX/UI"},
    {en:"We talked to two users.", cn:"我们和两位用户聊了。", focus:["talked"], scene:"UX/UI"},
    {en:"We updated the icons last night.", cn:"我们昨晚更新了图标。", focus:["updated"], scene:"UX/UI"},
    {en:"We joined the design review.", cn:"我们参加了设计评审。", focus:["joined"], scene:"UX/UI"},
    {en:"We liked the second version.", cn:"我们喜欢第二版。", focus:["liked"], scene:"UX/UI"},
    {en:"We tried a new layout.", cn:"我们试了新布局。", focus:["tried"], scene:"UX/UI"},
    {en:"We asked for more feedback.", cn:"我们要了更多反馈。", focus:["asked"], scene:"UX/UI"},
    {en:"We drew three icons.", cn:"我们画了三个图标。", focus:["drew"], scene:"UX/UI"},
    {en:"We booked a hotel near the station.", cn:"我们订了车站附近的酒店。", focus:["booked"], scene:"旅行"},
    {en:"We missed the morning flight.", cn:"我们错过了早班飞机。", focus:["missed"], scene:"旅行"},
    {en:"We packed the bag.", cn:"我们收拾好了包。", focus:["packed"], scene:"旅行"},
    {en:"We found the gate.", cn:"我们找到了登机口。", focus:["found"], scene:"旅行"},
    {en:"We ordered lunch for the team.", cn:"我们给团队点了午饭。", focus:["ordered"], scene:"生活"},
    {en:"We left early yesterday.", cn:"我们昨天早走了。", focus:["left"], scene:"生活"},
    {en:"They finished the homepage yesterday.", cn:"他们昨天做完了首页。", focus:["finished"], scene:"UX/UI"},
    {en:"They changed the button color.", cn:"他们改了按钮颜色。", focus:["changed"], scene:"UX/UI"},
    {en:"They sent the Figma link.", cn:"他们发了 Figma 链接。", focus:["sent"], scene:"UX/UI"},
    {en:"They got good feedback.", cn:"他们收到了不错的反馈。", focus:["got"], scene:"UX/UI"},
    {en:"They made the text bigger.", cn:"他们把字放大了。", focus:["made"], scene:"UX/UI"},
    {en:"They fixed the spacing.", cn:"他们修好了间距。", focus:["fixed"], scene:"UX/UI"},
    {en:"They showed three design ideas.", cn:"他们展示了三个设计想法。", focus:["showed"], scene:"UX/UI"},
    {en:"They talked to two users.", cn:"他们和两位用户聊了。", focus:["talked"], scene:"UX/UI"},
    {en:"They updated the icons last night.", cn:"他们昨晚更新了图标。", focus:["updated"], scene:"UX/UI"},
    {en:"They joined the design review.", cn:"他们参加了设计评审。", focus:["joined"], scene:"UX/UI"},
    {en:"They liked the second version.", cn:"他们喜欢第二版。", focus:["liked"], scene:"UX/UI"},
    {en:"They tried a new layout.", cn:"他们试了新布局。", focus:["tried"], scene:"UX/UI"},
    {en:"They asked for more feedback.", cn:"他们要了更多反馈。", focus:["asked"], scene:"UX/UI"},
    {en:"They drew three icons.", cn:"他们画了三个图标。", focus:["drew"], scene:"UX/UI"},
    {en:"They booked a hotel near the station.", cn:"他们订了车站附近的酒店。", focus:["booked"], scene:"旅行"},
    {en:"They missed the morning flight.", cn:"他们错过了早班飞机。", focus:["missed"], scene:"旅行"},
    {en:"They took a taxi to the hotel.", cn:"他们打车去了酒店。", focus:["took"], scene:"旅行"},
    {en:"They packed the bag.", cn:"他们收拾好了包。", focus:["packed"], scene:"旅行"},
    {en:"They arrived on time.", cn:"他们准时到了。", focus:["arrived"], scene:"旅行"},
    {en:"They checked in online.", cn:"他们网上值机了。", focus:["checked"], scene:"旅行"},
    {en:"They found the gate.", cn:"他们找到了登机口。", focus:["found"], scene:"旅行"},
    {en:"They bought a new charger.", cn:"他们买了个新充电器。", focus:["bought"], scene:"生活"},
    {en:"They ordered lunch for the team.", cn:"他们给团队点了午饭。", focus:["ordered"], scene:"生活"},
    {en:"They left early yesterday.", cn:"他们昨天早走了。", focus:["left"], scene:"生活"},
    {en:"I was in a design meeting yesterday.", cn:"我昨天在开设计会。", focus:["was"], scene:"UX/UI"},
    {en:"I was busy yesterday.", cn:"我昨天很忙。", focus:["was"], scene:"生活"},
    {en:"I was ready for feedback.", cn:"我当时准备好听反馈了。", focus:["was"], scene:"UX/UI"},
    {en:"I was at the airport early.", cn:"我很早就到机场了。", focus:["was"], scene:"旅行"},
    {en:"I was okay with that color.", cn:"我当时觉得那个颜色可以。", focus:["was"], scene:"UX/UI"},
    {en:"She was late for the review.", cn:"她评审迟到了。", focus:["was"], scene:"UX/UI"},
    {en:"She was on a call.", cn:"她当时在通话。", focus:["was"], scene:"UX/UI"},
    {en:"She was in Shanghai last week.", cn:"她上周在上海。", focus:["was"], scene:"旅行"},
    {en:"She was new to the team.", cn:"她当时是新来的。", focus:["was"], scene:"UX/UI"},
    {en:"He was late this morning.", cn:"他今早迟到了。", focus:["was"], scene:"生活"},
    {en:"He was in a meeting.", cn:"他当时在开会。", focus:["was"], scene:"UX/UI"},
    {en:"He was at the gate.", cn:"他当时在登机口。", focus:["was"], scene:"旅行"},
    {en:"He was good with the design.", cn:"他当时觉得设计可以。", focus:["was"], scene:"UX/UI"},
    {en:"The button was too small.", cn:"那个按钮当时太小了。", focus:["was"], scene:"UX/UI"},
    {en:"The prototype was ready yesterday.", cn:"那个原型昨天就准备好了。", focus:["was"], scene:"UX/UI"},
    {en:"The meeting was useful.", cn:"那次会议很有用。", focus:["was"], scene:"UX/UI"},
    {en:"The cafe was quiet.", cn:"那家咖啡馆当时很安静。", focus:["was"], scene:"生活"},
    {en:"The hotel was near the metro.", cn:"那家酒店在地铁附近。", focus:["was"], scene:"旅行"},
    {en:"It was a long flight.", cn:"那是趟长途航班。", focus:["was"], scene:"旅行"},
    {en:"It was a clean layout.", cn:"那是个很干净的布局。", focus:["was"], scene:"UX/UI"},
    {en:"My manager was in the workshop.", cn:"我的经理当时在工作坊。", focus:["was"], scene:"UX/UI"},
    {en:"The designer was online.", cn:"那位设计师当时在线。", focus:["was"], scene:"UX/UI"},
    {en:"We were almost done.", cn:"我们当时快做完了。", focus:["were"], scene:"UX/UI"},
    {en:"We were good with the design.", cn:"我们当时觉得设计可以。", focus:["were"], scene:"UX/UI"},
    {en:"We were at the airport early.", cn:"我们很早就到机场了。", focus:["were"], scene:"旅行"},
    {en:"We were ready to present.", cn:"我们当时准备好演示了。", focus:["were"], scene:"UX/UI"},
    {en:"They were in the workshop.", cn:"他们当时在工作坊。", focus:["were"], scene:"UX/UI"},
    {en:"They were almost ready.", cn:"他们当时快准备好了。", focus:["were"], scene:"UX/UI"},
    {en:"They were on the same page.", cn:"他们当时想法一致。", focus:["were"], scene:"UX/UI"},
    {en:"They were near the station.", cn:"他们当时在车站附近。", focus:["were"], scene:"旅行"},
    {en:"You were muted.", cn:"你当时静音了。", focus:["were"], scene:"UX/UI"},
    {en:"You were right about the layout.", cn:"布局那件事你说对了。", focus:["were"], scene:"UX/UI"},
    {en:"You were late yesterday.", cn:"你昨天迟到了。", focus:["were"], scene:"生活"},
    {en:"The icons were unclear.", cn:"那些图标当时不清楚。", focus:["were"], scene:"UX/UI"},
    {en:"The colors were too bright.", cn:"那些颜色当时太亮了。", focus:["were"], scene:"UX/UI"},
    {en:"The screens were simple.", cn:"那些页面当时很简单。", focus:["were"], scene:"UX/UI"},
    {en:"The buttons were too small.", cn:"那些按钮当时太小了。", focus:["were"], scene:"UX/UI"},
    {en:"My notes were unclear.", cn:"我的备注当时不清楚。", focus:["were"], scene:"UX/UI"},
    {en:"Our tickets were ready.", cn:"我们的票当时准备好了。", focus:["were"], scene:"旅行"},
    {en:"The seats were comfortable.", cn:"那些座位当时很舒服。", focus:["were"], scene:"旅行"}
],
  "past-neg": [
    {en:"I didn't finish the icons.", cn:"我没做完图标。", focus:["didn't","finish"], scene:"UX/UI"},
    {en:"She didn't send the design.", cn:"她没发设计稿。", focus:["didn't","send"], scene:"UX/UI"},
    {en:"Did you join the design review?", cn:"你参加设计评审了吗？", focus:["Did","join"], scene:"UX/UI"},
    {en:"We didn't like the first version.", cn:"我们不喜欢第一版。", focus:["didn't","like"], scene:"UX/UI"},
    {en:"He didn't change the layout.", cn:"他没改布局。", focus:["didn't","change"], scene:"UX/UI"},
    {en:"I didn't book a hotel.", cn:"我没订酒店。", focus:["didn't","book"], scene:"旅行"},
    {en:"She didn't pack her charger.", cn:"她没带充电器。", focus:["didn't","pack"], scene:"旅行"},
    {en:"Did you find the gate?", cn:"你找到登机口了吗？", focus:["Did","find"], scene:"旅行"},
    {en:"We didn't get the email.", cn:"我们没收到邮件。", focus:["didn't","get"], scene:"生活"},
    {en:"He didn't see your message.", cn:"他没看到你的消息。", focus:["didn't","see"], scene:"生活"},
    {en:"I didn't understand the feedback.", cn:"我没听懂那个反馈。", focus:["didn't","understand"], scene:"UX/UI"},
    {en:"Did they share the Figma link?", cn:"他们发了 Figma 链接吗？", focus:["Did","share"], scene:"UX/UI"},
    {en:"She didn't make the text bigger.", cn:"她没把字放大。", focus:["didn't","make"], scene:"UX/UI"},
    {en:"We didn't miss the flight.", cn:"我们没误机。", focus:["didn't","miss"], scene:"旅行"},
    {en:"He didn't join the call.", cn:"他没进会。", focus:["didn't","join"], scene:"UX/UI"},
    {en:"Did you save the file?", cn:"你保存文件了吗？", focus:["Did","save"], scene:"UX/UI"},
    {en:"I didn't buy a ticket yet.", cn:"我还没买票。", focus:["didn't","buy"], scene:"旅行"},
    {en:"She didn't leave early.", cn:"她没有早走。", focus:["didn't","leave"], scene:"生活"},
    {en:"We didn't change the color.", cn:"我们没改颜色。", focus:["didn't","change"], scene:"UX/UI"},
    {en:"Did you see my design?", cn:"你看了我的设计吗？", focus:["Did","see"], scene:"UX/UI"},
    {en:"I didn't finish last night.", cn:"我昨晚没做完。", focus:["didn't","finish"], scene:"UX/UI"},
    {en:"He didn't like that icon.", cn:"他不喜欢那个图标。", focus:["didn't","like"], scene:"UX/UI"},
    {en:"Did you confirm the gate?", cn:"你确认登机口了吗？", focus:["Did","confirm"], scene:"旅行"},
    {en:"She didn't reply yet.", cn:"她还没回复。", focus:["didn't","reply"], scene:"生活"}
  ],
  "future": [
    {en:"I will send the design today.", cn:"我今天会发设计稿。", focus:["will"], scene:"UX/UI"},
    {en:"She is going to make the button bigger.", cn:"她打算把按钮做大。", focus:["is","going"], scene:"UX/UI"},
    {en:"We will share the Figma link.", cn:"我们会分享 Figma 链接。", focus:["will"], scene:"UX/UI"},
    {en:"He is going to ask for feedback.", cn:"他打算要反馈。", focus:["is","going"], scene:"UX/UI"},
    {en:"I will join the design review.", cn:"我会参加设计评审。", focus:["will"], scene:"UX/UI"},
    {en:"She is going to try a simpler layout.", cn:"她打算试试更简单的布局。", focus:["is","going"], scene:"UX/UI"},
    {en:"We will book a flight tomorrow.", cn:"我们明天会订机票。", focus:["will"], scene:"旅行"},
    {en:"He is going to check in online later.", cn:"他打算稍后网上值机。", focus:["is","going"], scene:"旅行"},
    {en:"I will take a short break.", cn:"我会休息一下。", focus:["will"], scene:"生活"},
    {en:"She is going to call you after lunch.", cn:"她打算午饭后给你打电话。", focus:["is","going"], scene:"生活"},
    {en:"We will change the color.", cn:"我们会改颜色。", focus:["will"], scene:"UX/UI"},
    {en:"He is going to update the icons.", cn:"他打算更新图标。", focus:["is","going"], scene:"UX/UI"},
    {en:"I will meet you at the gate.", cn:"我会在登机口见你。", focus:["will"], scene:"旅行"},
    {en:"She is going to pack tonight.", cn:"她打算今晚收拾行李。", focus:["is","going"], scene:"旅行"},
    {en:"We will finish this screen tomorrow.", cn:"我们明天会做完这个页面。", focus:["will"], scene:"UX/UI"},
    {en:"He is going to show three ideas.", cn:"他打算展示三个想法。", focus:["is","going"], scene:"UX/UI"},
    {en:"I will order coffee for us.", cn:"我会给我们点咖啡。", focus:["will"], scene:"生活"},
    {en:"She is going to stay near the metro.", cn:"她打算住在地铁附近。", focus:["is","going"], scene:"旅行"},
    {en:"We will talk to users next week.", cn:"我们下周会和用户聊。", focus:["will"], scene:"UX/UI"},
    {en:"He is going to clean up the page.", cn:"他打算整理这个页面。", focus:["is","going"], scene:"UX/UI"},
    {en:"I will make the menu clearer.", cn:"我会把菜单做得更清楚。", focus:["will"], scene:"UX/UI"},
    {en:"She is going to test the prototype.", cn:"她打算测原型。", focus:["is","going"], scene:"UX/UI"},
    {en:"We will land before dinner.", cn:"我们会在晚饭前落地。", focus:["will"], scene:"旅行"},
    {en:"He is going to present on Friday.", cn:"他打算周五演示。", focus:["is","going"], scene:"UX/UI"},
    {en:"She will present on Friday.", cn:"她周五会演示。", focus:["will"], scene:"UX/UI"},
    {en:"He will update the icons.", cn:"他会更新图标。", focus:["will"], scene:"UX/UI"},
    {en:"They will test the prototype.", cn:"他们会测原型。", focus:["will"], scene:"UX/UI"},
    {en:"I am going to rewrite the labels.", cn:"我打算重写标签。", focus:["am","going"], scene:"UX/UI"},
    {en:"We are going to ship this week.", cn:"我们打算这周上线。", focus:["are","going"], scene:"UX/UI"},
    {en:"They are going to leave early.", cn:"他们打算早走。", focus:["are","going"], scene:"生活"}
],
  "present-perfect": [
    {en:"I have finished the new screen.", cn:"我已经做完新页面了。", focus:["have","finished"], scene:"UX/UI"},
    {en:"She has sent the Figma file.", cn:"她已经发了 Figma 文件。", focus:["has","sent"], scene:"UX/UI"},
    {en:"We have changed the colors.", cn:"我们已经改了颜色。", focus:["have","changed"], scene:"UX/UI"},
    {en:"He has talked to the users.", cn:"他已经和这些用户聊过了。", focus:["has","talked"], scene:"UX/UI"},
    {en:"I have seen your design notes.", cn:"我看过你的设计备注了。", focus:["have","seen"], scene:"UX/UI"},
    {en:"They have booked the hotel.", cn:"他们已经订了酒店。", focus:["have","booked"], scene:"旅行"},
    {en:"She has packed her bag.", cn:"她已经收拾好行李了。", focus:["has","packed"], scene:"旅行"},
    {en:"We have checked in already.", cn:"我们已经值机了。", focus:["have","checked"], scene:"旅行"},
    {en:"He has made a simpler version.", cn:"他已经做了一个更简单的版本。", focus:["has","made"], scene:"UX/UI"},
    {en:"I have received feedback from my manager.", cn:"我已经收到经理的反馈了。", focus:["have","received"], scene:"UX/UI"},
    {en:"She has finished the icons.", cn:"她已经做完这些图标了。", focus:["has","finished"], scene:"UX/UI"},
    {en:"We have tested the prototype.", cn:"我们已经测过原型了。", focus:["have","tested"], scene:"UX/UI"},
    {en:"He has fixed the spacing.", cn:"他已经修好间距了。", focus:["has","fixed"], scene:"UX/UI"},
    {en:"I have seen this design before.", cn:"我以前见过这个设计。", focus:["have","seen"], scene:"UX/UI"},
    {en:"She has read your message.", cn:"她读过你的消息了。", focus:["has","read"], scene:"生活"},
    {en:"We have met before.", cn:"我们以前见过。", focus:["have","met"], scene:"生活"},
    {en:"He has done the homepage.", cn:"他已经做完首页了。", focus:["has","done"], scene:"UX/UI"},
    {en:"I have packed my bag.", cn:"我已经收拾好包了。", focus:["have","packed"], scene:"旅行"},
    {en:"They have arrived at the hotel.", cn:"他们到酒店了。", focus:["have","arrived"], scene:"旅行"},
    {en:"She has joined the team.", cn:"她已经加入团队了。", focus:["has","joined"], scene:"UX/UI"},
    {en:"We have shared the prototype.", cn:"我们已经分享了原型。", focus:["have","shared"], scene:"UX/UI"},
    {en:"He has chosen a new color.", cn:"他已经选了一个新颜色。", focus:["has","chosen"], scene:"UX/UI"},
    {en:"I have lost my key.", cn:"我把钥匙丢了。", focus:["have","lost"], scene:"生活"},
    {en:"She has called the hotel.", cn:"她已经给酒店打过电话了。", focus:["has","called"], scene:"旅行"},
    {en:"We have booked the flight.", cn:"我们已经订了机票。", focus:["have","booked"], scene:"旅行"},
    {en:"I have fixed the button.", cn:"我已经修好按钮了。", focus:["have","fixed"], scene:"UX/UI"},
    {en:"We have paid the bill.", cn:"我们已经付了账。", focus:["have","paid"], scene:"旅行"},
    {en:"I have forgotten my password.", cn:"我把密码忘了。", focus:["have","forgotten"], scene:"生活"},
    {en:"We have started already.", cn:"我们已经开始了。", focus:["have","started"], scene:"UX/UI"},
    {en:"He has updated the app design.", cn:"他已经更新了应用设计。", focus:["has","updated"], scene:"UX/UI"},
    {en:"He has joined the call.", cn:"他已经进会了。", focus:["has","joined"], scene:"UX/UI"},
    {en:"She has chosen a new color.", cn:"她已经选了一个新颜色。", focus:["has","chosen"], scene:"UX/UI"},
    {en:"He has left the office.", cn:"他已经离开办公室了。", focus:["has","left"], scene:"生活"},
    {en:"She has read your notes.", cn:"她已经看了你那些备注。", focus:["has","read"], scene:"UX/UI"},
    {en:"He has booked a taxi.", cn:"他已经叫了一辆出租车。", focus:["has","booked"], scene:"旅行"},
    {en:"I have finished the wireframes.", cn:"我已经画完这些线框图了。", focus:["have","finished"], scene:"UX/UI"},
    {en:"She has shared the prototype.", cn:"她已经把原型分享出去了。", focus:["has","shared"], scene:"UX/UI"},
    {en:"We have updated the design system.", cn:"我们已经更新了设计系统。", focus:["have","updated"], scene:"UX/UI"},
    {en:"He has reviewed my work.", cn:"他已经评审过我的稿子了。", focus:["has","reviewed"], scene:"UX/UI"},
    {en:"I have added the new icons.", cn:"我已经加上新图标了。", focus:["have","added"], scene:"UX/UI"},
    {en:"They have approved the design.", cn:"他们已经通过这个设计了。", focus:["have","approved"], scene:"UX/UI"},
    {en:"I have exported the assets.", cn:"我已经把这些素材导出来了。", focus:["have","exported"], scene:"UX/UI"},
    {en:"She has written the copy.", cn:"她已经把文案写好了。", focus:["has","written"], scene:"UX/UI"},
    {en:"We have fixed the alignment.", cn:"我们已经把对齐修好了。", focus:["have","fixed"], scene:"UX/UI"},
    {en:"He has checked the contrast.", cn:"他已经检查过对比度了。", focus:["has","checked"], scene:"UX/UI"},
    {en:"I have created a new component.", cn:"我已经建了一个新组件。", focus:["have","created"], scene:"UX/UI"},
    {en:"She has left a comment.", cn:"她留了一条评论。", focus:["has","left"], scene:"UX/UI"},
    {en:"We have finished the handoff.", cn:"我们已经交付完了。", focus:["have","finished"], scene:"UX/UI"},
    {en:"He has opened the Figma file.", cn:"他已经打开 Figma 文件了。", focus:["has","opened"], scene:"UX/UI"},
    {en:"I have renamed the layers.", cn:"我已经把这些图层重新命名了。", focus:["have","renamed"], scene:"UX/UI"},
    {en:"They have started the sprint.", cn:"他们已经开始这个迭代了。", focus:["have","started"], scene:"UX/UI"},
    {en:"I have joined the design review.", cn:"我已经参加设计评审了。", focus:["have","joined"], scene:"UX/UI"},
    {en:"She has tested the flow.", cn:"她已经测过流程了。", focus:["has","tested"], scene:"UX/UI"},
    {en:"We have talked to five users.", cn:"我们已经和五位用户聊过了。", focus:["have","talked"], scene:"UX/UI"},
    {en:"He has changed the font size.", cn:"他已经把字号改了。", focus:["has","changed"], scene:"UX/UI"},
    {en:"I have saved the file.", cn:"我已经把文件保存了。", focus:["have","saved"], scene:"UX/UI"},
    {en:"She has moved the button.", cn:"她已经把按钮挪位置了。", focus:["has","moved"], scene:"UX/UI"},
    {en:"We have removed the extra step.", cn:"我们已经把多余的一步去掉了。", focus:["have","removed"], scene:"UX/UI"},
    {en:"He has built the prototype.", cn:"他已经把原型做出来了。", focus:["has","built"], scene:"UX/UI"},
    {en:"I have sent you the link.", cn:"我已经把链接发给你了。", focus:["have","sent"], scene:"UX/UI"},
    {en:"They have shipped the feature.", cn:"他们已经把这个功能上线了。", focus:["have","shipped"], scene:"UX/UI"},
    {en:"I have read your feedback.", cn:"我已经看过你的反馈了。", focus:["have","read"], scene:"UX/UI"},
    {en:"She has picked a new color.", cn:"她已经选好一个新颜色了。", focus:["has","picked"], scene:"UX/UI"},
    {en:"We have agreed on the layout.", cn:"布局我们已经达成一致了。", focus:["have","agreed"], scene:"UX/UI"},
    {en:"He has drawn the user flow.", cn:"他已经把用户流程画出来了。", focus:["has","drawn"], scene:"UX/UI"},
    {en:"I have already sent the file.", cn:"我已经把文件发了。", focus:["have","sent"], scene:"UX/UI"},
    {en:"She has just finished the mockup.", cn:"她刚做完视觉稿。", focus:["has","finished"], scene:"UX/UI"},
    {en:"We have just started the project.", cn:"我们刚开始这个项目。", focus:["have","started"], scene:"UX/UI"},
    {en:"He has already left the meeting.", cn:"他已经离开会议了。", focus:["has","left"], scene:"UX/UI"},
    {en:"I have not opened the file yet.", cn:"我还没打开那个文件。", focus:["have","opened"], scene:"UX/UI"},
    {en:"She has not replied yet.", cn:"她还没回复。", focus:["has","replied"], scene:"UX/UI"},
    {en:"We have not decided yet.", cn:"我们还没定。", focus:["have","decided"], scene:"UX/UI"},
    {en:"He has not seen the new version.", cn:"他还没看到新版本。", focus:["has","seen"], scene:"UX/UI"},
    {en:"They have not shared the file.", cn:"他们还没把文件分享出来。", focus:["have","shared"], scene:"UX/UI"},
    {en:"I have never used that tool.", cn:"我从没用过那个工具。", focus:["have","used"], scene:"UX/UI"},
    {en:"She has never missed a deadline.", cn:"她从没错过一次截止时间。", focus:["has","missed"], scene:"UX/UI"},
    {en:"We have never tried this layout.", cn:"我们从没试过这个布局。", focus:["have","tried"], scene:"UX/UI"},
    {en:"Have you finished the icons?", cn:"这些图标你做完了吗？", focus:["have","finished"], scene:"UX/UI"},
    {en:"Have you seen my design?", cn:"你看到我的设计了吗？", focus:["have","seen"], scene:"UX/UI"},
    {en:"Has she sent the file?", cn:"她把文件发了吗？", focus:["has","sent"], scene:"UX/UI"},
    {en:"Has he joined the call?", cn:"他进会了吗？", focus:["has","joined"], scene:"UX/UI"},
    {en:"Have they approved the budget?", cn:"预算他们批了吗？", focus:["have","approved"], scene:"UX/UI"},
    {en:"Have you read the spec?", cn:"你看过需求文档了吗？", focus:["have","read"], scene:"UX/UI"},
    {en:"Has the client replied?", cn:"客户回复了吗？", focus:["has","replied"], scene:"UX/UI"},
    {en:"Have we tested this on mobile?", cn:"我们在手机上测过了吗？", focus:["have","tested"], scene:"UX/UI"},
    {en:"I have made a few changes.", cn:"我改了几个地方。", focus:["have","made"], scene:"UX/UI"},
    {en:"She has done the research.", cn:"她已经做完调研了。", focus:["has","done"], scene:"UX/UI"},
    {en:"We have collected the feedback.", cn:"我们已经把反馈收齐了。", focus:["have","collected"], scene:"UX/UI"},
    {en:"He has explained the problem.", cn:"他已经把问题说清楚了。", focus:["has","explained"], scene:"UX/UI"},
    {en:"I have uploaded the screenshots.", cn:"我已经把这些截图传上去了。", focus:["have","uploaded"], scene:"UX/UI"},
    {en:"They have found a bug.", cn:"他们发现了一个 bug。", focus:["have","found"], scene:"UX/UI"},
    {en:"I have cleaned up the layout.", cn:"我已经把布局整理好了。", focus:["have","cleaned"], scene:"UX/UI"},
    {en:"She has improved the spacing.", cn:"她已经把间距调好了。", focus:["has","improved"], scene:"UX/UI"},
    {en:"We have simplified the form.", cn:"我们已经把表单简化了。", focus:["have","simplified"], scene:"UX/UI"},
    {en:"He has copied the style.", cn:"他已经把样式复制过去了。", focus:["has","copied"], scene:"UX/UI"},
    {en:"I have checked all the screens.", cn:"我已经把所有页面检查了一遍。", focus:["have","checked"], scene:"UX/UI"},
    {en:"She has planned the workshop.", cn:"她已经把工作坊安排好了。", focus:["has","planned"], scene:"UX/UI"},
    {en:"We have booked the meeting room.", cn:"我们已经订好会议室了。", focus:["have","booked"], scene:"UX/UI"},
    {en:"He has prepared the slides.", cn:"他已经把这些演示稿准备好了。", focus:["has","prepared"], scene:"UX/UI"},
    {en:"I have shared my screen.", cn:"我已经共享屏幕了。", focus:["have","shared"], scene:"UX/UI"},
    {en:"They have changed the brand color.", cn:"他们已经把品牌色改了。", focus:["have","changed"], scene:"UX/UI"},
    {en:"I have learned a lot this year.", cn:"我今年学到了很多。", focus:["have","learned"], scene:"UX/UI"},
    {en:"She has grown a lot as a designer.", cn:"她作为设计师成长了很多。", focus:["has","grown"], scene:"UX/UI"},
    {en:"We have worked together before.", cn:"我们以前合作过。", focus:["have","worked"], scene:"UX/UI"},
    {en:"He has been here for two years.", cn:"他在这儿待了两年了。", focus:["has","been"], scene:"UX/UI"},
    {en:"I have known her since last year.", cn:"我从去年就认识她了。", focus:["have","known"], scene:"UX/UI"},
    {en:"She has used Figma for three years.", cn:"她用 Figma 三年了。", focus:["has","used"], scene:"UX/UI"},
    {en:"We have had this problem before.", cn:"这个问题我们以前遇到过。", focus:["have","had"], scene:"UX/UI"},
    {en:"He has taken over the project.", cn:"他已经接手这个项目了。", focus:["has","taken"], scene:"UX/UI"},
    {en:"I have written the design notes.", cn:"我已经把设计备注写好了。", focus:["have","written"], scene:"UX/UI"},
    {en:"She has updated the style guide.", cn:"她已经更新了样式指南。", focus:["has","updated"], scene:"UX/UI"},
    {en:"We have set up the components.", cn:"我们已经把组件建好了。", focus:["have","set"], scene:"UX/UI"},
    {en:"He has answered my question.", cn:"他已经回答我的问题了。", focus:["has","answered"], scene:"UX/UI"},
    {en:"I have asked for more time.", cn:"我已经申请多一点时间了。", focus:["have","asked"], scene:"UX/UI"},
    {en:"They have hired a new designer.", cn:"他们招了一位新设计师。", focus:["have","hired"], scene:"UX/UI"},
    {en:"I have fixed the mobile view.", cn:"我已经把手机端修好了。", focus:["have","fixed"], scene:"UX/UI"},
    {en:"She has added dark mode.", cn:"她已经把深色模式加上了。", focus:["has","added"], scene:"UX/UI"},
    {en:"We have improved the onboarding.", cn:"我们已经把新手引导改进了。", focus:["have","improved"], scene:"UX/UI"},
    {en:"He has cut the copy.", cn:"他已经把文案精简了。", focus:["has","cut"], scene:"UX/UI"},
    {en:"I have made the button bigger.", cn:"我已经把按钮做大了。", focus:["have","made"], scene:"UX/UI"},
    {en:"She has reduced the steps.", cn:"她已经把这些步骤减少了。", focus:["has","reduced"], scene:"UX/UI"},
    {en:"We have kept the old design.", cn:"我们还是保留了旧设计。", focus:["have","kept"], scene:"UX/UI"},
    {en:"He has lost the file.", cn:"他把文件弄丢了。", focus:["has","lost"], scene:"UX/UI"},
    {en:"I have found the problem.", cn:"我已经找到问题了。", focus:["have","found"], scene:"UX/UI"},
    {en:"They have solved the issue.", cn:"他们已经把问题解决了。", focus:["have","solved"], scene:"UX/UI"},
    {en:"I have spent two days on this.", cn:"这个我已经花了两天了。", focus:["have","spent"], scene:"UX/UI"},
    {en:"She has put the icons in a folder.", cn:"她把这些图标放进一个文件夹了。", focus:["has","put"], scene:"UX/UI"},
    {en:"We have moved to a new tool.", cn:"我们已经换了一个新工具。", focus:["have","moved"], scene:"UX/UI"},
    {en:"He has left the team.", cn:"他已经离开团队了。", focus:["has","left"], scene:"UX/UI"},
    {en:"I have got the design award.", cn:"我拿到那个设计奖了。", focus:["have","got"], scene:"UX/UI"},
    {en:"She has become the lead designer.", cn:"她已经成为主设计师了。", focus:["has","become"], scene:"UX/UI"},
    {en:"We have met the deadline.", cn:"我们赶上截止时间了。", focus:["have","met"], scene:"UX/UI"},
    {en:"He has missed the review.", cn:"他错过评审了。", focus:["has","missed"], scene:"UX/UI"},
    {en:"I have heard about this project.", cn:"我听说过这个项目。", focus:["have","heard"], scene:"UX/UI"},
    {en:"They have told me the plan.", cn:"他们已经把计划告诉我了。", focus:["have","told"], scene:"UX/UI"},
    {en:"I have brought my laptop.", cn:"我把笔记本带来了。", focus:["have","brought"], scene:"UX/UI"},
    {en:"She has chosen the final version.", cn:"她已经选定最终版了。", focus:["has","chosen"], scene:"UX/UI"},
    {en:"We have broken the design into parts.", cn:"我们把设计拆成了几部分。", focus:["have","broken"], scene:"UX/UI"},
    {en:"He has forgotten the password.", cn:"他把密码忘了。", focus:["has","forgotten"], scene:"UX/UI"},
    {en:"I have understood your point.", cn:"我明白你的意思了。", focus:["have","understood"], scene:"UX/UI"},
    {en:"She has held two workshops.", cn:"她办过两场工作坊。", focus:["has","held"], scene:"UX/UI"},
    {en:"We have paid for the plugin.", cn:"那个插件我们已经付过钱了。", focus:["have","paid"], scene:"UX/UI"},
    {en:"He has bought a new monitor.", cn:"他买了台新显示器。", focus:["has","bought"], scene:"UX/UI"},
    {en:"I have kept the old file.", cn:"我把旧文件留着了。", focus:["have","kept"], scene:"UX/UI"},
    {en:"They have given us more time.", cn:"他们多给了我们一些时间。", focus:["have","given"], scene:"UX/UI"},
    {en:"I have run a quick test.", cn:"我做了个快速测试。", focus:["have","run"], scene:"UX/UI"},
    {en:"She has drawn three versions.", cn:"她画了三个版本。", focus:["has","drawn"], scene:"UX/UI"},
    {en:"We have seen this pattern before.", cn:"这个模式我们以前见过。", focus:["have","seen"], scene:"UX/UI"},
    {en:"He has spoken to the client.", cn:"他已经和客户谈过了。", focus:["has","spoken"], scene:"UX/UI"},
    {en:"I have thought about it.", cn:"我想过这件事了。", focus:["have","thought"], scene:"UX/UI"},
    {en:"She has felt the same way.", cn:"她也有同样的感觉。", focus:["has","felt"], scene:"UX/UI"},
    {en:"We have decided to start over.", cn:"我们决定重新来过。", focus:["have","decided"], scene:"UX/UI"},
    {en:"He has moved the file to Drive.", cn:"他把文件挪到云盘了。", focus:["has","moved"], scene:"UX/UI"},
    {en:"I have turned on the grid.", cn:"我把网格打开了。", focus:["have","turned"], scene:"UX/UI"},
    {en:"They have closed the ticket.", cn:"他们已经把工单关掉了。", focus:["have","closed"], scene:"UX/UI"},
    {en:"I have replied to the client.", cn:"我已经回复客户了。", focus:["have","replied"], scene:"UX/UI"},
    {en:"She has scheduled the meeting.", cn:"她已经把会议排好了。", focus:["has","scheduled"], scene:"UX/UI"},
    {en:"We have cancelled the call.", cn:"我们把会取消了。", focus:["have","cancelled"], scene:"UX/UI"},
    {en:"He has delayed the launch.", cn:"他把上线时间推迟了。", focus:["has","delayed"], scene:"UX/UI"},
    {en:"I have finished my part.", cn:"我这部分做完了。", focus:["have","finished"], scene:"UX/UI"},
    {en:"She has taken good notes.", cn:"她笔记记得很好。", focus:["has","taken"], scene:"UX/UI"},
    {en:"We have listened to the users.", cn:"我们听取了用户的意见。", focus:["have","listened"], scene:"UX/UI"},
    {en:"He has ignored my comment.", cn:"他没理会我的评论。", focus:["has","ignored"], scene:"UX/UI"},
    {en:"I have marked the changes.", cn:"我已经把这些改动标出来了。", focus:["have","marked"], scene:"UX/UI"},
    {en:"They have updated the roadmap.", cn:"他们已经更新了路线图。", focus:["have","updated"], scene:"UX/UI"},
    {en:"I have shared the folder with you.", cn:"我已经把文件夹分享给你了。", focus:["have","shared"], scene:"UX/UI"},
    {en:"She has set the deadline.", cn:"她已经定好截止时间了。", focus:["has","set"], scene:"UX/UI"},
    {en:"We have split the work.", cn:"我们已经把活分了。", focus:["have","split"], scene:"UX/UI"},
    {en:"He has done a great job.", cn:"他做得很好。", focus:["has","done"], scene:"UX/UI"},
    {en:"I have used this font before.", cn:"这个字体我以前用过。", focus:["have","used"], scene:"UX/UI"},
    {en:"She has tried a darker background.", cn:"她试过一种更深的背景。", focus:["has","tried"], scene:"UX/UI"},
    {en:"We have added a search bar.", cn:"我们加了一个搜索框。", focus:["have","added"], scene:"UX/UI"},
    {en:"He has hidden the sidebar.", cn:"他把侧边栏隐藏了。", focus:["has","hidden"], scene:"UX/UI"},
    {en:"I have opened a new tab.", cn:"我开了个新标签页。", focus:["have","opened"], scene:"UX/UI"},
    {en:"They have fixed the broken link.", cn:"他们把坏掉的链接修好了。", focus:["have","fixed"], scene:"UX/UI"},
    {en:"I have checked the spelling.", cn:"我已经检查过拼写了。", focus:["have","checked"], scene:"UX/UI"},
    {en:"She has translated the copy.", cn:"她已经把文案翻译好了。", focus:["has","translated"], scene:"UX/UI"},
    {en:"We have tested it on iPhone.", cn:"我们在 iPhone 上测过了。", focus:["have","tested"], scene:"UX/UI"},
    {en:"He has asked for feedback.", cn:"他已经要过反馈了。", focus:["has","asked"], scene:"UX/UI"},
    {en:"I have started a new file.", cn:"我新建了一个文件。", focus:["have","started"], scene:"UX/UI"},
    {en:"She has finished her research.", cn:"她已经做完她那部分调研了。", focus:["has","finished"], scene:"UX/UI"},
    {en:"We have shown the demo.", cn:"我们已经演示过了。", focus:["have","shown"], scene:"UX/UI"},
    {en:"He has changed his mind.", cn:"他改主意了。", focus:["has","changed"], scene:"UX/UI"},
    {en:"I have taken a screenshot.", cn:"我截了个图。", focus:["have","taken"], scene:"UX/UI"},
    {en:"They have joined our team.", cn:"他们加入我们团队了。", focus:["have","joined"], scene:"UX/UI"},
    {en:"I have worked on three screens.", cn:"我做了三个页面。", focus:["have","worked"], scene:"UX/UI"},
    {en:"She has kept the design simple.", cn:"她把设计保持得很简洁。", focus:["has","kept"], scene:"UX/UI"},
    {en:"We have reused the old component.", cn:"我们复用了旧组件。", focus:["have","reused"], scene:"UX/UI"},
    {en:"He has named the file wrong.", cn:"他把文件名起错了。", focus:["has","named"], scene:"UX/UI"},
    {en:"I have sorted the layers.", cn:"我把这些图层整理好了。", focus:["have","sorted"], scene:"UX/UI"},
    {en:"She has locked the layer.", cn:"她把图层锁上了。", focus:["has","locked"], scene:"UX/UI"},
    {en:"We have grouped the icons.", cn:"我们把图标编组了。", focus:["have","grouped"], scene:"UX/UI"},
    {en:"He has zoomed in too much.", cn:"他放得太大了。", focus:["has","zoomed"], scene:"UX/UI"},
    {en:"I have printed the mockup.", cn:"我把视觉稿打印出来了。", focus:["have","printed"], scene:"UX/UI"},
    {en:"They have moved the deadline.", cn:"他们把截止时间改了。", focus:["have","moved"], scene:"UX/UI"},
    {en:"I have caught a small mistake.", cn:"我发现了一个小错误。", focus:["have","caught"], scene:"UX/UI"},
    {en:"She has cleaned the file.", cn:"她把文件清理干净了。", focus:["has","cleaned"], scene:"UX/UI"},
    {en:"We have finished on time.", cn:"我们按时完成了。", focus:["have","finished"], scene:"UX/UI"},
    {en:"I have had breakfast.", cn:"我吃过早饭了。", focus:["have","had"], scene:"生活"},
    {en:"She has cooked dinner.", cn:"她把晚饭做好了。", focus:["has","cooked"], scene:"生活"},
    {en:"We have eaten already.", cn:"我们已经吃过了。", focus:["have","eaten"], scene:"生活"},
    {en:"He has washed the dishes.", cn:"他把碗洗了。", focus:["has","washed"], scene:"生活"},
    {en:"I have made coffee.", cn:"我煮好咖啡了。", focus:["have","made"], scene:"生活"},
    {en:"They have ordered takeout.", cn:"他们点了外卖。", focus:["have","ordered"], scene:"生活"},
    {en:"I have bought some milk.", cn:"我买了点牛奶。", focus:["have","bought"], scene:"生活"},
    {en:"She has paid the bill.", cn:"她把账付了。", focus:["has","paid"], scene:"生活"},
    {en:"We have finished the shopping.", cn:"我们已经买完东西了。", focus:["have","finished"], scene:"生活"},
    {en:"He has forgotten his keys.", cn:"他把那几把钥匙忘了。", focus:["has","forgotten"], scene:"生活"},
    {en:"I have lost my phone.", cn:"我把手机弄丢了。", focus:["have","lost"], scene:"生活"},
    {en:"She has found her wallet.", cn:"她把钱包找到了。", focus:["has","found"], scene:"生活"},
    {en:"We have cleaned the kitchen.", cn:"我们把厨房打扫了。", focus:["have","cleaned"], scene:"生活"},
    {en:"He has done the laundry.", cn:"他把衣服洗了。", focus:["has","done"], scene:"生活"},
    {en:"I have taken out the trash.", cn:"我把垃圾倒了。", focus:["have","taken"], scene:"生活"},
    {en:"They have moved to a new flat.", cn:"他们搬到一套新公寓了。", focus:["have","moved"], scene:"生活"},
    {en:"I have called my mother.", cn:"我给我妈打过电话了。", focus:["have","called"], scene:"生活"},
    {en:"She has sent me a message.", cn:"她给我发了条消息。", focus:["has","sent"], scene:"生活"},
    {en:"We have talked about it.", cn:"这件事我们聊过了。", focus:["have","talked"], scene:"生活"},
    {en:"He has told me the news.", cn:"他把这个消息告诉我了。", focus:["has","told"], scene:"生活"},
    {en:"I have watched that movie.", cn:"那部电影我看过。", focus:["have","watched"], scene:"生活"},
    {en:"She has read that book.", cn:"那本书她看过。", focus:["has","read"], scene:"生活"},
    {en:"We have heard that song before.", cn:"那首歌我们以前听过。", focus:["have","heard"], scene:"生活"},
    {en:"He has played that game.", cn:"那个游戏他玩过。", focus:["has","played"], scene:"生活"},
    {en:"I have finished my homework.", cn:"我把作业做完了。", focus:["have","finished"], scene:"生活"},
    {en:"They have started a new class.", cn:"他们开了一门新课。", focus:["have","started"], scene:"生活"},
    {en:"I have learned some new words.", cn:"我学了一些新单词。", focus:["have","learned"], scene:"生活"},
    {en:"She has practiced every day.", cn:"她每天都练。", focus:["has","practiced"], scene:"生活"},
    {en:"We have booked a table.", cn:"我们订好一个位子了。", focus:["have","booked"], scene:"生活"},
    {en:"He has arrived home.", cn:"他到家了。", focus:["has","arrived"], scene:"生活"},
    {en:"I have just woken up.", cn:"我刚醒。", focus:["have","woken"], scene:"生活"},
    {en:"She has already gone to bed.", cn:"她已经睡了。", focus:["has","gone"], scene:"生活"},
    {en:"We have just come back.", cn:"我们刚回来。", focus:["have","come"], scene:"生活"},
    {en:"He has already left home.", cn:"他已经离开家了。", focus:["has","left"], scene:"生活"},
    {en:"I have not eaten yet.", cn:"我还没吃。", focus:["have","eaten"], scene:"生活"},
    {en:"She has not called me back.", cn:"她还没给我回电话。", focus:["has","called"], scene:"生活"},
    {en:"We have not seen that film.", cn:"那部电影我们还没看。", focus:["have","seen"], scene:"生活"},
    {en:"He has not finished his work.", cn:"他工作还没做完。", focus:["has","finished"], scene:"生活"},
    {en:"They have not arrived yet.", cn:"他们还没到。", focus:["have","arrived"], scene:"生活"},
    {en:"I have never been to Japan.", cn:"我从没去过日本。", focus:["have","been"], scene:"生活"},
    {en:"She has never eaten sushi.", cn:"她从没吃过寿司。", focus:["has","eaten"], scene:"生活"},
    {en:"We have never met his family.", cn:"我们从没见过他家人。", focus:["have","met"], scene:"生活"},
    {en:"Have you had lunch?", cn:"你吃午饭了吗？", focus:["have","had"], scene:"生活"},
    {en:"Have you seen my keys?", cn:"你看见我那几把钥匙了吗？", focus:["have","seen"], scene:"生活"},
    {en:"Has she come back?", cn:"她回来了吗？", focus:["has","come"], scene:"生活"},
    {en:"Has he called you?", cn:"他给你打电话了吗？", focus:["has","called"], scene:"生活"},
    {en:"Have they moved out?", cn:"他们搬走了吗？", focus:["have","moved"], scene:"生活"},
    {en:"Have you tried this cafe?", cn:"这家咖啡馆你试过吗？", focus:["have","tried"], scene:"生活"},
    {en:"Has the package arrived?", cn:"快递到了吗？", focus:["has","arrived"], scene:"生活"},
    {en:"Have we paid the rent?", cn:"房租我们交了吗？", focus:["have","paid"], scene:"生活"},
    {en:"I have charged my phone.", cn:"我给手机充过电了。", focus:["have","charged"], scene:"生活"},
    {en:"She has turned off the lights.", cn:"她把灯都关了。", focus:["has","turned"], scene:"生活"},
    {en:"We have locked the door.", cn:"我们把门锁了。", focus:["have","locked"], scene:"生活"},
    {en:"He has opened the window.", cn:"他把窗户打开了。", focus:["has","opened"], scene:"生活"},
    {en:"I have set an alarm.", cn:"我定了一个闹钟。", focus:["have","set"], scene:"生活"},
    {en:"They have fixed the heater.", cn:"他们把暖气修好了。", focus:["have","fixed"], scene:"生活"},
    {en:"I have caught a cold.", cn:"我感冒了。", focus:["have","caught"], scene:"生活"},
    {en:"She has felt tired all week.", cn:"她这一周都很累。", focus:["has","felt"], scene:"生活"},
    {en:"We have slept well.", cn:"我们睡得很好。", focus:["have","slept"], scene:"生活"},
    {en:"He has lost some weight.", cn:"他瘦了一些。", focus:["has","lost"], scene:"生活"},
    {en:"I have started running.", cn:"我开始跑步了。", focus:["have","started"], scene:"生活"},
    {en:"She has joined a gym.", cn:"她加入了一家健身房。", focus:["has","joined"], scene:"生活"},
    {en:"We have walked a lot today.", cn:"我们今天走了很多路。", focus:["have","walked"], scene:"生活"},
    {en:"He has taken his medicine.", cn:"他吃过药了。", focus:["has","taken"], scene:"生活"},
    {en:"I have made an appointment.", cn:"我预约好了。", focus:["have","made"], scene:"生活"},
    {en:"They have seen the doctor.", cn:"他们看过医生了。", focus:["have","seen"], scene:"生活"},
    {en:"I have fed the cat.", cn:"我喂过猫了。", focus:["have","fed"], scene:"生活"},
    {en:"She has walked the dog.", cn:"她遛过狗了。", focus:["has","walked"], scene:"生活"},
    {en:"We have watered the plants.", cn:"我们浇过花了。", focus:["have","watered"], scene:"生活"},
    {en:"He has cut his hair.", cn:"他把头发剪了。", focus:["has","cut"], scene:"生活"},
    {en:"I have changed my clothes.", cn:"我把衣服换了。", focus:["have","changed"], scene:"生活"},
    {en:"They have painted the room.", cn:"他们把房间刷了。", focus:["have","painted"], scene:"生活"},
    {en:"I have saved some money.", cn:"我存了一些钱。", focus:["have","saved"], scene:"生活"},
    {en:"She has spent all her money.", cn:"她把钱花光了。", focus:["has","spent"], scene:"生活"},
    {en:"We have paid the electricity bill.", cn:"电费我们交了。", focus:["have","paid"], scene:"生活"},
    {en:"He has borrowed my charger.", cn:"他借走了我的充电器。", focus:["has","borrowed"], scene:"生活"},
    {en:"I have returned the book.", cn:"我把书还了。", focus:["have","returned"], scene:"生活"},
    {en:"They have given me a gift.", cn:"他们送了我一份礼物。", focus:["have","given"], scene:"生活"},
    {en:"I have written a card.", cn:"我写了张卡片。", focus:["have","written"], scene:"生活"},
    {en:"She has planned the party.", cn:"她把派对安排好了。", focus:["has","planned"], scene:"生活"},
    {en:"We have invited our friends.", cn:"我们请了朋友们。", focus:["have","invited"], scene:"生活"},
    {en:"He has brought some fruit.", cn:"他带了些水果。", focus:["has","brought"], scene:"生活"},
    {en:"I have put the food in the fridge.", cn:"我把吃的放冰箱了。", focus:["have","put"], scene:"生活"},
    {en:"They have cleaned the whole house.", cn:"他们把整个屋子打扫了。", focus:["have","cleaned"], scene:"生活"},
    {en:"I have known him for years.", cn:"我认识他好多年了。", focus:["have","known"], scene:"生活"},
    {en:"She has lived here since 2020.", cn:"她从 2020 年就住这儿了。", focus:["has","lived"], scene:"生活"},
    {en:"We have been friends for ten years.", cn:"我们做朋友十年了。", focus:["have","been"], scene:"生活"},
    {en:"He has worked there for a month.", cn:"他在那儿干了一个月了。", focus:["has","worked"], scene:"生活"},
    {en:"I have waited for an hour.", cn:"我等了一个小时了。", focus:["have","waited"], scene:"生活"},
    {en:"They have been busy all week.", cn:"他们这一周都很忙。", focus:["have","been"], scene:"生活"},
    {en:"I have drunk too much coffee.", cn:"我咖啡喝多了。", focus:["have","drunk"], scene:"生活"},
    {en:"She has broken her phone.", cn:"她把手机摔坏了。", focus:["has","broken"], scene:"生活"},
    {en:"We have run out of milk.", cn:"我们牛奶没了。", focus:["have","run"], scene:"生活"},
    {en:"He has left his bag at home.", cn:"他把包落在家里了。", focus:["has","left"], scene:"生活"},
    {en:"I have kept the receipt.", cn:"我把小票留着了。", focus:["have","kept"], scene:"生活"},
    {en:"They have thrown it away.", cn:"他们把它扔了。", focus:["have","thrown"], scene:"生活"},
    {en:"I have moved the table.", cn:"我把桌子挪了。", focus:["have","moved"], scene:"生活"},
    {en:"She has hung the picture.", cn:"她把画挂上了。", focus:["has","hung"], scene:"生活"},
    {en:"We have bought a new sofa.", cn:"我们买了张新沙发。", focus:["have","bought"], scene:"生活"},
    {en:"He has built a small shelf.", cn:"他做了个小架子。", focus:["has","built"], scene:"生活"},
    {en:"I have taken a shower.", cn:"我洗过澡了。", focus:["have","taken"], scene:"生活"},
    {en:"They have gone shopping.", cn:"他们逛街去了。", focus:["have","gone"], scene:"生活"},
    {en:"I have checked the weather.", cn:"我查过天气预报了。", focus:["have","checked"], scene:"生活"},
    {en:"She has closed the account.", cn:"她把账户注销了。", focus:["has","closed"], scene:"生活"},
    {en:"We have signed the contract.", cn:"我们把合同签了。", focus:["have","signed"], scene:"生活"},
    {en:"He has renewed his passport.", cn:"他把护照换新了。", focus:["has","renewed"], scene:"生活"},
    {en:"I have deleted those photos.", cn:"那些照片我删了。", focus:["have","deleted"], scene:"生活"},
    {en:"They have shared the cost.", cn:"他们把费用分摊了。", focus:["have","shared"], scene:"生活"},
    {en:"I have understood the rules.", cn:"这些规则我明白了。", focus:["have","understood"], scene:"生活"},
    {en:"She has taught me how to cook.", cn:"她教过我做饭。", focus:["has","taught"], scene:"生活"},
    {en:"We have grown some vegetables.", cn:"我们种了些菜。", focus:["have","grown"], scene:"生活"},
    {en:"He has driven for three hours.", cn:"他开了三个小时车。", focus:["has","driven"], scene:"生活"},
    {en:"I have parked the car.", cn:"我把车停好了。", focus:["have","parked"], scene:"生活"},
    {en:"I have booked the flight.", cn:"我把机票订好了。", focus:["have","booked"], scene:"旅行"},
    {en:"She has checked in online.", cn:"她已经网上值机了。", focus:["has","checked"], scene:"旅行"},
    {en:"We have packed our bags.", cn:"我们把行李收拾好了。", focus:["have","packed"], scene:"旅行"},
    {en:"He has printed the boarding pass.", cn:"他把登机牌打印出来了。", focus:["has","printed"], scene:"旅行"},
    {en:"I have found my seat.", cn:"我找到座位了。", focus:["have","found"], scene:"旅行"},
    {en:"They have boarded the plane.", cn:"他们已经登机了。", focus:["have","boarded"], scene:"旅行"},
    {en:"I have landed in Tokyo.", cn:"我已经落地东京了。", focus:["have","landed"], scene:"旅行"},
    {en:"She has collected her luggage.", cn:"她已经取到行李了。", focus:["has","collected"], scene:"旅行"},
    {en:"We have passed customs.", cn:"我们已经过海关了。", focus:["have","passed"], scene:"旅行"},
    {en:"He has lost his passport.", cn:"他把护照弄丢了。", focus:["has","lost"], scene:"旅行"},
    {en:"I have got my visa.", cn:"我拿到签证了。", focus:["have","got"], scene:"旅行"},
    {en:"She has missed the train.", cn:"她错过火车了。", focus:["has","missed"], scene:"旅行"},
    {en:"We have arrived at the hotel.", cn:"我们已经到酒店了。", focus:["have","arrived"], scene:"旅行"},
    {en:"He has checked into the room.", cn:"他已经办好入住了。", focus:["has","checked"], scene:"旅行"},
    {en:"I have left my bag at the desk.", cn:"我把包寄存在前台了。", focus:["have","left"], scene:"旅行"},
    {en:"They have booked two nights.", cn:"他们订了两晚。", focus:["have","booked"], scene:"旅行"},
    {en:"I have paid for the room.", cn:"房费我付了。", focus:["have","paid"], scene:"旅行"},
    {en:"She has asked for a map.", cn:"她要了一张地图。", focus:["has","asked"], scene:"旅行"},
    {en:"We have taken a taxi.", cn:"我们打了辆车。", focus:["have","taken"], scene:"旅行"},
    {en:"He has bought a metro card.", cn:"他买了张地铁卡。", focus:["has","bought"], scene:"旅行"},
    {en:"I have changed some money.", cn:"我换了些钱。", focus:["have","changed"], scene:"旅行"},
    {en:"They have found a good restaurant.", cn:"他们找到一家不错的餐厅。", focus:["have","found"], scene:"旅行"},
    {en:"I have tried the local food.", cn:"我尝过当地菜了。", focus:["have","tried"], scene:"旅行"},
    {en:"She has ordered the set menu.", cn:"她点了套餐。", focus:["has","ordered"], scene:"旅行"},
    {en:"We have finished our meal.", cn:"我们把这顿饭吃完了。", focus:["have","finished"], scene:"旅行"},
    {en:"He has asked for the bill.", cn:"他叫了买单。", focus:["has","asked"], scene:"旅行"},
    {en:"I have just arrived.", cn:"我刚到。", focus:["have","arrived"], scene:"旅行"},
    {en:"She has already checked out.", cn:"她已经退房了。", focus:["has","checked"], scene:"旅行"},
    {en:"We have just left the airport.", cn:"我们刚离开机场。", focus:["have","left"], scene:"旅行"},
    {en:"He has already seen the museum.", cn:"博物馆他已经看过了。", focus:["has","seen"], scene:"旅行"},
    {en:"I have not booked a hotel yet.", cn:"我还没订一家酒店。", focus:["have","booked"], scene:"旅行"},
    {en:"She has not packed yet.", cn:"她还没收拾行李。", focus:["has","packed"], scene:"旅行"},
    {en:"We have not been to the beach.", cn:"我们还没去海滩。", focus:["have","been"], scene:"旅行"},
    {en:"He has not found his gate.", cn:"他还没找到登机口。", focus:["has","found"], scene:"旅行"},
    {en:"They have not confirmed the tour.", cn:"他们还没确认那个行程。", focus:["have","confirmed"], scene:"旅行"},
    {en:"I have never travelled alone.", cn:"我从没一个人旅行过。", focus:["have","travelled"], scene:"旅行"},
    {en:"She has never flown business class.", cn:"她从没坐过商务舱。", focus:["has","flown"], scene:"旅行"},
    {en:"We have never stayed in a hostel.", cn:"我们从没住过一家青旅。", focus:["have","stayed"], scene:"旅行"},
    {en:"Have you been to Kyoto?", cn:"你去过京都吗？", focus:["have","been"], scene:"旅行"},
    {en:"Have you booked the tickets?", cn:"那几张票你订了吗？", focus:["have","booked"], scene:"旅行"},
    {en:"Has she found the hotel?", cn:"她找到酒店了吗？", focus:["has","found"], scene:"旅行"},
    {en:"Has he checked the timetable?", cn:"他看过时刻表了吗？", focus:["has","checked"], scene:"旅行"},
    {en:"Have they left the hotel?", cn:"他们离开酒店了吗？", focus:["have","left"], scene:"旅行"},
    {en:"Have you tried the street food?", cn:"街头小吃你尝过吗？", focus:["have","tried"], scene:"旅行"},
    {en:"Has the flight landed?", cn:"航班落地了吗？", focus:["has","landed"], scene:"旅行"},
    {en:"Have we missed the last bus?", cn:"我们错过末班车了吗？", focus:["have","missed"], scene:"旅行"},
    {en:"I have walked around the old town.", cn:"我在老城区逛了一圈。", focus:["have","walked"], scene:"旅行"},
    {en:"She has taken a lot of photos.", cn:"她拍了很多照片。", focus:["has","taken"], scene:"旅行"},
    {en:"We have visited three cities.", cn:"我们去了三个城市。", focus:["have","visited"], scene:"旅行"},
    {en:"He has climbed the tower.", cn:"他爬上那座塔了。", focus:["has","climbed"], scene:"旅行"},
    {en:"I have bought some souvenirs.", cn:"我买了些纪念品。", focus:["have","bought"], scene:"旅行"},
    {en:"They have joined a walking tour.", cn:"他们参加了一个步行游览团。", focus:["have","joined"], scene:"旅行"},
    {en:"I have booked a rental car.", cn:"我租好了一辆车。", focus:["have","booked"], scene:"旅行"},
    {en:"She has filled up the tank.", cn:"她把油加满了。", focus:["has","filled"], scene:"旅行"},
    {en:"We have driven along the coast.", cn:"我们沿着海岸开了一段。", focus:["have","driven"], scene:"旅行"},
    {en:"He has slept on the train.", cn:"他在火车上睡着了。", focus:["has","slept"], scene:"旅行"},
    {en:"I have charged my power bank.", cn:"我把充电宝充好了。", focus:["have","charged"], scene:"旅行"},
    {en:"They have downloaded the map.", cn:"他们把地图下载好了。", focus:["have","downloaded"], scene:"旅行"},
    {en:"I have written down the address.", cn:"我把地址记下来了。", focus:["have","written"], scene:"旅行"},
    {en:"She has learned a few words.", cn:"她学了几个词。", focus:["has","learned"], scene:"旅行"},
    {en:"We have asked for directions.", cn:"我们问过路了。", focus:["have","asked"], scene:"旅行"},
    {en:"He has waited at the wrong gate.", cn:"他在错的登机口等了半天。", focus:["has","waited"], scene:"旅行"},
    {en:"I have changed my flight.", cn:"我改签了。", focus:["have","changed"], scene:"旅行"},
    {en:"They have cancelled the trip.", cn:"他们把行程取消了。", focus:["have","cancelled"], scene:"旅行"},
    {en:"I have been here before.", cn:"我以前来过这儿。", focus:["have","been"], scene:"旅行"},
    {en:"She has stayed at this hotel.", cn:"这家酒店她住过。", focus:["has","stayed"], scene:"旅行"},
    {en:"We have had a great time.", cn:"我们玩得很开心。", focus:["have","had"], scene:"旅行"},
    {en:"He has spent all his cash.", cn:"他现金都花完了。", focus:["has","spent"], scene:"旅行"},
    {en:"I have kept the ticket.", cn:"我把票留着了。", focus:["have","kept"], scene:"旅行"},
    {en:"They have flown home.", cn:"他们已经飞回家了。", focus:["have","flown"], scene:"旅行"},
    {en:"I have finished the second round.", cn:"第二轮我已经做完了。", focus:["have","finished"], scene:"UX/UI"},
    {en:"He had already left when I arrived.", cn:"我到的时候，他已经走了。", focus:["had","left"], scene:"UX/UI"},
    {en:"She had finished the design before the meeting.", cn:"开会之前，她就把设计做完了。", focus:["had","finished"], scene:"UX/UI"},
    {en:"We had tested the prototype before the launch.", cn:"上线之前，我们就测过原型了。", focus:["had","tested"], scene:"UX/UI"},
    {en:"I had sent the file before he asked.", cn:"他开口之前，我就把文件发了。", focus:["had","sent"], scene:"UX/UI"},
    {en:"They had approved the design before Friday.", cn:"周五之前，他们就通过设计了。", focus:["had","approved"], scene:"UX/UI"},
    {en:"She had already fixed the bug when I checked.", cn:"我去看的时候，她已经把 bug 修好了。", focus:["had","fixed"], scene:"UX/UI"},
    {en:"He had written the copy before the review.", cn:"评审之前，他就把文案写好了。", focus:["had","written"], scene:"UX/UI"},
    {en:"We had changed the colors before the demo.", cn:"演示之前，我们就把颜色改了。", focus:["had","changed"], scene:"UX/UI"},
    {en:"I had finished the wireframes by Monday.", cn:"到周一的时候，我已经画完这些线框图了。", focus:["had","finished"], scene:"UX/UI"},
    {en:"She had left a comment before I opened the file.", cn:"我打开文件之前，她就留了一条评论。", focus:["had","left"], scene:"UX/UI"},
    {en:"They had shipped the feature before I joined.", cn:"我加入之前，他们就把这个功能上线了。", focus:["had","shipped"], scene:"UX/UI"},
    {en:"He had already seen my design when we talked.", cn:"我们聊的时候，他已经看过我的设计了。", focus:["had","seen"], scene:"UX/UI"},
    {en:"We had agreed on the layout before the call.", cn:"开会之前，我们就对布局达成一致了。", focus:["had","agreed"], scene:"UX/UI"},
    {en:"I had saved the file before the app crashed.", cn:"应用崩溃之前，我把文件保存了。", focus:["had","saved"], scene:"UX/UI"},
    {en:"She had prepared the slides before the workshop.", cn:"工作坊之前，她就把这些演示稿准备好了。", focus:["had","prepared"], scene:"UX/UI"},
    {en:"He had renamed the layers before the handoff.", cn:"交付之前，他就把这些图层重命名了。", focus:["had","renamed"], scene:"UX/UI"},
    {en:"We had collected the feedback by Monday.", cn:"到周一的时候，我们已经把反馈收齐了。", focus:["had","collected"], scene:"UX/UI"},
    {en:"I had checked the contrast before I shared it.", cn:"我分享出去之前，就检查过对比度了。", focus:["had","checked"], scene:"UX/UI"},
    {en:"They had hired a designer before I applied.", cn:"我投简历之前，他们就招到一位设计师了。", focus:["had","hired"], scene:"UX/UI"},
    {en:"She had updated the style guide before the sprint.", cn:"迭代开始之前，她就更新了样式指南。", focus:["had","updated"], scene:"UX/UI"},
    {en:"He had built the prototype before the deadline.", cn:"截止时间之前，他就把原型做出来了。", focus:["had","built"], scene:"UX/UI"},
    {en:"We had talked to ten users before the redesign.", cn:"改版之前，我们已经和十位用户聊过了。", focus:["had","talked"], scene:"UX/UI"},
    {en:"I had exported the assets before he asked.", cn:"他要之前，我就把这些素材导出来了。", focus:["had","exported"], scene:"UX/UI"},
    {en:"She had joined the team before the project started.", cn:"项目开始之前，她就加入团队了。", focus:["had","joined"], scene:"UX/UI"},
    {en:"They had moved to a new tool before last year.", cn:"去年之前，他们就换了一个新工具。", focus:["had","moved"], scene:"UX/UI"},
    {en:"He had fixed the spacing before I noticed it.", cn:"我注意到之前，他就把间距修好了。", focus:["had","fixed"], scene:"UX/UI"},
    {en:"We had finished the handoff before the holiday.", cn:"放假之前，我们就交付完了。", focus:["had","finished"], scene:"UX/UI"},
    {en:"I had read the spec before the meeting.", cn:"开会之前，我就把需求文档看过了。", focus:["had","read"], scene:"UX/UI"},
    {en:"She had drawn three versions before she chose one.", cn:"她选定之前，已经画了三个版本。", focus:["had","drawn"], scene:"UX/UI"},
    {en:"He had already replied when I called.", cn:"我打电话的时候，他已经回复了。", focus:["had","replied"], scene:"UX/UI"},
    {en:"We had booked the room before they asked.", cn:"他们问之前，我们就把会议室订好了。", focus:["had","booked"], scene:"UX/UI"},
    {en:"I had made the button bigger before the test.", cn:"测试之前，我就把按钮做大了。", focus:["had","made"], scene:"UX/UI"},
    {en:"They had closed the ticket before I looked.", cn:"我去看之前，他们就把工单关掉了。", focus:["had","closed"], scene:"UX/UI"},
    {en:"She had translated the copy before the launch.", cn:"上线之前，她就把文案翻译好了。", focus:["had","translated"], scene:"UX/UI"},
    {en:"He had left the team before the redesign.", cn:"改版之前，他就离开团队了。", focus:["had","left"], scene:"UX/UI"},
    {en:"We had simplified the form before the review.", cn:"评审之前，我们就把表单简化了。", focus:["had","simplified"], scene:"UX/UI"},
    {en:"I had uploaded the screenshots before he wrote back.", cn:"他回信之前，我就把这些截图传上去了。", focus:["had","uploaded"], scene:"UX/UI"},
    {en:"She had planned the workshop before the holiday.", cn:"放假之前，她就把工作坊安排好了。", focus:["had","planned"], scene:"UX/UI"},
    {en:"They had solved the issue before the meeting.", cn:"开会之前，他们就把问题解决了。", focus:["had","solved"], scene:"UX/UI"},
    {en:"He had asked for feedback before I did.", cn:"我开口之前，他就已经要过反馈了。", focus:["had","asked"], scene:"UX/UI"},
    {en:"We had reused the old component before the deadline.", cn:"截止时间之前，我们就复用了旧组件。", focus:["had","reused"], scene:"UX/UI"},
    {en:"I had marked the changes before she opened it.", cn:"她打开之前，我就把这些改动标出来了。", focus:["had","marked"], scene:"UX/UI"},
    {en:"She had set the deadline before the kickoff.", cn:"启动会之前，她就定好截止时间了。", focus:["had","set"], scene:"UX/UI"},
    {en:"He had improved the onboarding before the launch.", cn:"上线之前，他就把新手引导改进了。", focus:["had","improved"], scene:"UX/UI"},
    {en:"We had shown the demo before they decided.", cn:"他们做决定之前，我们已经演示过了。", focus:["had","shown"], scene:"UX/UI"},
    {en:"I had cleaned up the layout before the handoff.", cn:"交付之前，我就把布局整理好了。", focus:["had","cleaned"], scene:"UX/UI"},
    {en:"They had updated the roadmap before the quarter.", cn:"这个季度之前，他们就更新了路线图。", focus:["had","updated"], scene:"UX/UI"},
    {en:"She had checked all the screens by Friday.", cn:"到周五的时候，她已经把所有页面检查完了。", focus:["had","checked"], scene:"UX/UI"},
    {en:"He had taken over the project before I heard.", cn:"我听说之前，他就接手这个项目了。", focus:["had","taken"], scene:"UX/UI"},
    {en:"We had split the work before the sprint started.", cn:"迭代开始之前，我们就把活分好了。", focus:["had","split"], scene:"UX/UI"},
    {en:"I had eaten before he came.", cn:"他来之前，我就吃过了。", focus:["had","eaten"], scene:"生活"},
    {en:"She had cooked dinner before we arrived.", cn:"我们到之前，她就把晚饭做好了。", focus:["had","cooked"], scene:"生活"},
    {en:"He had washed the dishes before I got home.", cn:"我到家之前，他就把碗洗了。", focus:["had","washed"], scene:"生活"},
    {en:"We had cleaned the kitchen before the guests came.", cn:"客人来之前，我们就把厨房打扫了。", focus:["had","cleaned"], scene:"生活"},
    {en:"I had locked the door before I left.", cn:"我出门之前，把门锁了。", focus:["had","locked"], scene:"生活"},
    {en:"She had turned off the lights before she went to bed.", cn:"她睡觉之前，把灯都关了。", focus:["had","turned"], scene:"生活"},
    {en:"They had moved out before we visited.", cn:"我们去之前，他们就搬走了。", focus:["had","moved"], scene:"生活"},
    {en:"I had called her before she texted me.", cn:"她给我发消息之前，我就给她打过电话了。", focus:["had","called"], scene:"生活"},
    {en:"He had finished his homework before dinner.", cn:"晚饭之前，他就把作业做完了。", focus:["had","finished"], scene:"生活"},
    {en:"We had watched that film before it won the award.", cn:"那部电影得奖之前，我们就看过了。", focus:["had","watched"], scene:"生活"},
    {en:"She had read the book before the movie came out.", cn:"电影上映之前，她就把书看过了。", focus:["had","read"], scene:"生活"},
    {en:"I had paid the rent before the first.", cn:"一号之前，我就把房租交了。", focus:["had","paid"], scene:"生活"},
    {en:"He had fed the cat before he left.", cn:"他出门之前，把猫喂了。", focus:["had","fed"], scene:"生活"},
    {en:"We had bought the tickets before they sold out.", cn:"票卖完之前，我们就买到了。", focus:["had","bought"], scene:"生活"},
    {en:"She had taken her medicine before she slept.", cn:"她睡之前，把药吃了。", focus:["had","taken"], scene:"生活"},
    {en:"I had charged my phone before the trip.", cn:"出发之前，我把手机充好电了。", focus:["had","charged"], scene:"生活"},
    {en:"They had painted the room before we moved in.", cn:"我们搬进去之前，他们就把房间刷好了。", focus:["had","painted"], scene:"生活"},
    {en:"He had lost his keys before he noticed.", cn:"他发现之前，那几把钥匙就已经丢了。", focus:["had","lost"], scene:"生活"},
    {en:"We had saved enough money before we bought it.", cn:"我们买之前，已经存够钱了。", focus:["had","saved"], scene:"生活"},
    {en:"She had learned to cook before she moved out.", cn:"她搬出去之前，就学会做饭了。", focus:["had","learned"], scene:"生活"},
    {en:"I had returned the book before the due date.", cn:"到期之前，我就把书还了。", focus:["had","returned"], scene:"生活"},
    {en:"He had run out of milk before breakfast.", cn:"早饭之前，他的牛奶就没了。", focus:["had","run"], scene:"生活"},
    {en:"We had invited them before we booked the table.", cn:"订位子之前，我们就请过他们了。", focus:["had","invited"], scene:"生活"},
    {en:"She had broken her phone before the trip.", cn:"出发之前，她的手机就摔坏了。", focus:["had","broken"], scene:"生活"},
    {en:"I had done the laundry before she asked.", cn:"她开口之前，我就把衣服洗了。", focus:["had","done"], scene:"生活"},
    {en:"They had left before the rain started.", cn:"下雨之前，他们就走了。", focus:["had","left"], scene:"生活"},
    {en:"He had grown some vegetables before he moved.", cn:"他搬家之前，种过一些菜。", focus:["had","grown"], scene:"生活"},
    {en:"We had known each other before the class.", cn:"上课之前，我们就认识了。", focus:["had","known"], scene:"生活"},
    {en:"She had waited an hour before he came.", cn:"他来之前，她已经等了一个小时。", focus:["had","waited"], scene:"生活"},
    {en:"I had parked the car before it started raining.", cn:"下雨之前，我就把车停好了。", focus:["had","parked"], scene:"生活"},
    {en:"We had booked the flight before the price rose.", cn:"涨价之前，我们就把机票订好了。", focus:["had","booked"], scene:"旅行"},
    {en:"She had packed her bag before we left.", cn:"我们出发之前，她就把行李收拾好了。", focus:["had","packed"], scene:"旅行"},
    {en:"He had checked in online before we got there.", cn:"我们到之前，他就在网上值机了。", focus:["had","checked"], scene:"旅行"},
    {en:"They had boarded the plane before I arrived.", cn:"我到之前，他们就登机了。", focus:["had","boarded"], scene:"旅行"},
    {en:"I had collected my luggage before she called.", cn:"她打电话之前，我就取到行李了。", focus:["had","collected"], scene:"旅行"},
    {en:"We had passed customs before noon.", cn:"中午之前，我们就过了海关。", focus:["had","passed"], scene:"旅行"},
    {en:"She had lost her passport before the trip.", cn:"出发之前，她的护照就丢了。", focus:["had","lost"], scene:"旅行"},
    {en:"He had got his visa before he booked the hotel.", cn:"他订酒店之前，就拿到签证了。", focus:["had","got"], scene:"旅行"},
    {en:"We had arrived at the hotel before it rained.", cn:"下雨之前，我们就到酒店了。", focus:["had","arrived"], scene:"旅行"},
    {en:"I had paid for the room before we checked in.", cn:"我们办入住之前，房费我就付了。", focus:["had","paid"], scene:"旅行"},
    {en:"She had changed some money before the flight.", cn:"上飞机之前，她就换好钱了。", focus:["had","changed"], scene:"旅行"},
    {en:"They had found a restaurant before we asked.", cn:"我们问之前，他们就找到一家餐厅了。", focus:["had","found"], scene:"旅行"},
    {en:"He had missed the train before he called me.", cn:"他给我打电话之前，就已经错过火车了。", focus:["had","missed"], scene:"旅行"},
    {en:"We had visited two cities before Tokyo.", cn:"到东京之前，我们已经去过两个城市了。", focus:["had","visited"], scene:"旅行"},
    {en:"I had written down the address before I left.", cn:"我出门之前，把地址记下来了。", focus:["had","written"], scene:"旅行"},
    {en:"She had learned a few words before the trip.", cn:"出发之前，她就学了几个词。", focus:["had","learned"], scene:"旅行"},
    {en:"They had cancelled the tour before we booked.", cn:"我们订之前，他们就把行程取消了。", focus:["had","cancelled"], scene:"旅行"},
    {en:"He had spent all his cash before the last day.", cn:"最后一天之前，他的现金就花完了。", focus:["had","spent"], scene:"旅行"},
    {en:"We had downloaded the map before we lost signal.", cn:"信号断之前，我们就把地图下载好了。", focus:["had","downloaded"], scene:"旅行"},
    {en:"I had checked out before the taxi came.", cn:"出租车来之前，我就退房了。", focus:["had","checked"], scene:"旅行"}
],
  "verb-prep": [
    {en:"We arrived at the office early.", cn:"我们很早就到办公室了。", focus:["arrived","at"], scene:"UX/UI"},
    {en:"She arrived at the meeting late.", cn:"她开会迟到了。", focus:["arrived","at"], scene:"UX/UI"},
    {en:"I listened to the user carefully.", cn:"我认真听了用户说的。", focus:["listened","to"], scene:"UX/UI"},
    {en:"We listened to their feedback.", cn:"我们听取了他们的反馈。", focus:["listened","to"], scene:"UX/UI"},
    {en:"He waited for my reply.", cn:"他在等我回复。", focus:["waited","for"], scene:"UX/UI"},
    {en:"We are waiting for approval.", cn:"我们在等审批。", focus:["waiting","for"], scene:"UX/UI"},
    {en:"Please look at this screen.", cn:"请看一下这个页面。", focus:["look","at"], scene:"UX/UI"},
    {en:"I looked at the data again.", cn:"我又看了一遍数据。", focus:["looked","at"], scene:"UX/UI"},
    {en:"She is looking for a new tool.", cn:"她在找一个新工具。", focus:["looking","for"], scene:"UX/UI"},
    {en:"We searched for a better layout.", cn:"我们找了个更好的布局。", focus:["searched","for"], scene:"UX/UI"},
    {en:"I applied for the design role.", cn:"我申请了那个设计岗位。", focus:["applied","for"], scene:"UX/UI"},
    {en:"This icon belongs to the old set.", cn:"这个图标属于旧那一套。", focus:["belongs","to"], scene:"UX/UI"},
    {en:"The launch depends on the test.", cn:"上线取决于测试结果。", focus:["depends","on"], scene:"UX/UI"},
    {en:"We rely on user research.", cn:"我们依靠用户调研。", focus:["rely","on"], scene:"UX/UI"},
    {en:"I agree with your point.", cn:"我同意你的观点。", focus:["agree","with"], scene:"UX/UI"},
    {en:"We agreed on the final version.", cn:"我们就最终版达成了一致。", focus:["agreed","on"], scene:"UX/UI"},
    {en:"She talked to the client yesterday.", cn:"她昨天和客户谈过了。", focus:["talked","to"], scene:"UX/UI"},
    {en:"Let's talk about the spacing.", cn:"我们聊聊间距吧。", focus:["talk","about"], scene:"UX/UI"},
    {en:"I thought about your suggestion.", cn:"我想过你的建议。", focus:["thought","about"], scene:"UX/UI"},
    {en:"He replied to my comment.", cn:"他回复了我的评论。", focus:["replied","to"], scene:"UX/UI"},
    {en:"We responded to the bug report.", cn:"我们回应了那个 bug 报告。", focus:["responded","to"], scene:"UX/UI"},
    {en:"Please focus on the main flow.", cn:"请聚焦主流程。", focus:["focus","on"], scene:"UX/UI"},
    {en:"I worked on the homepage today.", cn:"我今天在做首页。", focus:["worked","on"], scene:"UX/UI"},
    {en:"We decided on a simpler layout.", cn:"我们定了一个更简单的布局。", focus:["decided","on"], scene:"UX/UI"},
    {en:"You can count on me.", cn:"你可以指望我。", focus:["count","on"], scene:"UX/UI"},
    {en:"She insisted on more testing.", cn:"她坚持要多测一轮。", focus:["insisted","on"], scene:"UX/UI"},
    {en:"This flow consists of four steps.", cn:"这个流程由四步组成。", focus:["consists","of"], scene:"UX/UI"},
    {en:"The delay resulted in extra work.", cn:"延期导致了额外的工作。", focus:["resulted","in"], scene:"UX/UI"},
    {en:"That change led to more errors.", cn:"那个改动导致了更多错误。", focus:["led","to"], scene:"UX/UI"},
    {en:"Please refer to the style guide.", cn:"请参考样式指南。", focus:["refer","to"], scene:"UX/UI"},
    {en:"I contributed to the design system.", cn:"我为设计系统出过力。", focus:["contributed","to"], scene:"UX/UI"},
    {en:"We adapted to the new process.", cn:"我们适应了新流程。", focus:["adapted","to"], scene:"UX/UI"},
    {en:"He commented on my prototype.", cn:"他对我的原型提了意见。", focus:["commented","on"], scene:"UX/UI"},
    {en:"They complained about the loading time.", cn:"他们抱怨加载太慢。", focus:["complained","about"], scene:"UX/UI"},
    {en:"I worry about the deadline.", cn:"我担心截止时间。", focus:["worry","about"], scene:"UX/UI"},
    {en:"She asked for more time.", cn:"她要了更多时间。", focus:["asked","for"], scene:"UX/UI"},
    {en:"We paid for the plugin.", cn:"我们为那个插件付了钱。", focus:["paid","for"], scene:"UX/UI"},
    {en:"I care about the details.", cn:"我在意细节。", focus:["care","about"], scene:"UX/UI"},
    {en:"We dealt with the feedback quickly.", cn:"我们很快处理完了反馈。", focus:["dealt","with"], scene:"UX/UI"},
    {en:"She participated in the workshop.", cn:"她参加了那个工作坊。", focus:["participated","in"], scene:"UX/UI"},
    {en:"I benefited from her advice.", cn:"我从她的建议里受益了。", focus:["benefited","from"], scene:"UX/UI"},
    {en:"The team suffered from poor specs.", cn:"团队被糟糕的需求文档拖累了。", focus:["suffered","from"], scene:"UX/UI"},
    {en:"We subscribed to that design tool.", cn:"我们订阅了那个设计工具。", focus:["subscribed","to"], scene:"UX/UI"},
    {en:"He objected to the new color.", cn:"他反对那个新颜色。", focus:["objected","to"], scene:"UX/UI"},
    {en:"I checked on the build this morning.", cn:"我今早查看了一下构建。", focus:["checked","on"], scene:"UX/UI"},
    {en:"We compared it with the old version.", cn:"我们把它和旧版本做了对比。", focus:["compared","with"], scene:"UX/UI"},
    {en:"She apologized for the late reply.", cn:"她为回复晚了道歉。", focus:["apologized","for"], scene:"UX/UI"},
    {en:"I apologized to the client.", cn:"我向客户道了歉。", focus:["apologized","to"], scene:"UX/UI"},
    {en:"They laughed at my first draft.", cn:"他们笑话我的初稿。", focus:["laughed","at"], scene:"UX/UI"},
    {en:"Please point at the problem area.", cn:"请指出有问题的地方。", focus:["point","at"], scene:"UX/UI"},
    {en:"We switched to a new font.", cn:"我们换成了一个新字体。", focus:["switched","to"], scene:"UX/UI"},
    {en:"I signed up for the course.", cn:"我报名了那门课。", focus:["signed","up","for"], scene:"UX/UI"},
    {en:"He gave up on that idea.", cn:"他放弃了那个想法。", focus:["gave","up","on"], scene:"UX/UI"},
    {en:"We ran out of time.", cn:"我们时间不够了。", focus:["ran","out","of"], scene:"UX/UI"},
    {en:"She came up with a good name.", cn:"她想出了一个好名字。", focus:["came","up","with"], scene:"UX/UI"},
    {en:"I looked into the issue.", cn:"我调查了这个问题。", focus:["looked","into"], scene:"UX/UI"},
    {en:"We looked through the whole file.", cn:"我们把整个文件翻了一遍。", focus:["looked","through"], scene:"UX/UI"},
    {en:"Please look after the handoff.", cn:"交付这块请你盯一下。", focus:["look","after"], scene:"UX/UI"},
    {en:"They looked forward to the launch.", cn:"他们很期待上线。", focus:["looked","forward","to"], scene:"UX/UI"},
    {en:"I filled in the form.", cn:"我把表单填了。", focus:["filled","in"], scene:"UX/UI"},
    {en:"We ended up with three options.", cn:"我们最后剩下三个方案。", focus:["ended","up","with"], scene:"UX/UI"},
    {en:"She got used to the new tool.", cn:"她已经习惯那个新工具了。", focus:["got","used","to"], scene:"UX/UI"},
    {en:"I am familiar with this pattern.", cn:"我熟悉这个模式。", focus:["familiar","with"], scene:"UX/UI"},
    {en:"He is responsible for the icons.", cn:"图标由他负责。", focus:["responsible","for"], scene:"UX/UI"},
    {en:"We are aware of the risk.", cn:"我们清楚这个风险。", focus:["aware","of"], scene:"UX/UI"},
    {en:"She is interested in motion design.", cn:"她对动效设计感兴趣。", focus:["interested","in"], scene:"UX/UI"},
    {en:"I am worried about the timeline.", cn:"我担心排期。", focus:["worried","about"], scene:"UX/UI"},
    {en:"They are satisfied with the result.", cn:"他们对结果很满意。", focus:["satisfied","with"], scene:"UX/UI"},
    {en:"We are ready for the review.", cn:"我们准备好评审了。", focus:["ready","for"], scene:"UX/UI"},
    {en:"He is good at prototyping.", cn:"他很擅长做原型。", focus:["good","at"], scene:"UX/UI"},
    {en:"This is different from the old one.", cn:"这个和旧的不一样。", focus:["different","from"], scene:"UX/UI"},
    {en:"The button is similar to that one.", cn:"这个按钮和那个很像。", focus:["similar","to"], scene:"UX/UI"},
    {en:"Our work is based on real data.", cn:"我们的工作基于真实数据。", focus:["based","on"], scene:"UX/UI"},
    {en:"She is used to remote meetings.", cn:"她习惯远程开会了。", focus:["used","to"], scene:"UX/UI"},
    {en:"I belong to the design team.", cn:"我属于设计团队。", focus:["belong","to"], scene:"UX/UI"},
    {en:"We agreed to their request.", cn:"我们答应了他们的要求。", focus:["agreed","to"], scene:"UX/UI"},
    {en:"He asked about the timeline.", cn:"他问了排期的事。", focus:["asked","about"], scene:"UX/UI"},
    {en:"I heard about the redesign.", cn:"我听说了改版的事。", focus:["heard","about"], scene:"UX/UI"},
    {en:"We learned about their process.", cn:"我们了解了他们的流程。", focus:["learned","about"], scene:"UX/UI"},
    {en:"She wrote to the whole team.", cn:"她给整个团队写了信。", focus:["wrote","to"], scene:"UX/UI"},
    {en:"I spoke to the engineer.", cn:"我和工程师谈过了。", focus:["spoke","to"], scene:"UX/UI"},
    {en:"We discussed it with the PM.", cn:"我们和产品经理讨论过了。", focus:["discussed","with"], scene:"UX/UI"},
    {en:"He pointed out a small mistake.", cn:"他指出了一个小错误。", focus:["pointed","out"], scene:"UX/UI"},
    {en:"They took care of the assets.", cn:"素材他们处理好了。", focus:["took","care","of"], scene:"UX/UI"},
    {en:"I kept up with the changes.", cn:"我跟上了这些改动。", focus:["kept","up","with"], scene:"UX/UI"},
    {en:"We moved on to the next screen.", cn:"我们进入下一个页面了。", focus:["moved","on","to"], scene:"UX/UI"},
    {en:"She backed up the file.", cn:"她把文件备份了。", focus:["backed","up"], scene:"UX/UI"},
    {en:"I turned to my manager for help.", cn:"我找经理帮忙了。", focus:["turned","to"], scene:"UX/UI"},
    {en:"We stuck to the original plan.", cn:"我们坚持了原计划。", focus:["stuck","to"], scene:"UX/UI"},
    {en:"He walked me through the flow.", cn:"他带我走了一遍流程。", focus:["walked","through"], scene:"UX/UI"},
    {en:"I reached out to the researcher.", cn:"我联系了那位研究员。", focus:["reached","out","to"], scene:"UX/UI"},
    {en:"We followed up on the feedback.", cn:"我们跟进了那些反馈。", focus:["followed","up","on"], scene:"UX/UI"},
    {en:"She checked in with the team.", cn:"她和团队对了一下进度。", focus:["checked","in","with"], scene:"UX/UI"},
    {en:"They pushed back on the deadline.", cn:"他们对截止时间提出了异议。", focus:["pushed","back","on"], scene:"UX/UI"},
    {en:"I signed off on the design.", cn:"我批准了这版设计。", focus:["signed","off","on"], scene:"UX/UI"},
    {en:"We accounted for every state.", cn:"每种状态我们都考虑到了。", focus:["accounted","for"], scene:"UX/UI"},
    {en:"He struggled with the new tool.", cn:"他用那个新工具很吃力。", focus:["struggled","with"], scene:"UX/UI"},
    {en:"I settled on a warmer gray.", cn:"我最后选了偏暖的灰色。", focus:["settled","on"], scene:"UX/UI"},
    {en:"We zoomed in on the details.", cn:"我们放大看了细节。", focus:["zoomed","in","on"], scene:"UX/UI"},
    {en:"She handed the file to me.", cn:"她把文件交给我了。", focus:["handed","to"], scene:"UX/UI"},
    {en:"I arrived at home around seven.", cn:"我七点左右到家的。", focus:["arrived","at"], scene:"生活"},
    {en:"She arrived in Shanghai yesterday.", cn:"她昨天到上海了。", focus:["arrived","in"], scene:"生活"},
    {en:"We listened to music all evening.", cn:"我们听了一晚上音乐。", focus:["listened","to"], scene:"生活"},
    {en:"He waited for the bus in the rain.", cn:"他冒着雨等公交。", focus:["waited","for"], scene:"生活"},
    {en:"I looked at the menu twice.", cn:"我看了两遍菜单。", focus:["looked","at"], scene:"生活"},
    {en:"She is looking for her keys.", cn:"她在找钥匙。", focus:["looking","for"], scene:"生活"},
    {en:"We paid for dinner together.", cn:"晚饭我们一起付的。", focus:["paid","for"], scene:"生活"},
    {en:"I asked for the bill.", cn:"我叫了买单。", focus:["asked","for"], scene:"生活"},
    {en:"He apologized for being late.", cn:"他为迟到道了歉。", focus:["apologized","for"], scene:"生活"},
    {en:"They complained about the noise.", cn:"他们抱怨太吵。", focus:["complained","about"], scene:"生活"},
    {en:"I worry about my parents.", cn:"我担心我爸妈。", focus:["worry","about"], scene:"生活"},
    {en:"She cares about her health.", cn:"她很在意健康。", focus:["cares","about"], scene:"生活"},
    {en:"We talked about the weekend.", cn:"我们聊了周末的事。", focus:["talked","about"], scene:"生活"},
    {en:"I talked to my neighbor.", cn:"我和邻居聊了。", focus:["talked","to"], scene:"生活"},
    {en:"He replied to my message.", cn:"他回了我的消息。", focus:["replied","to"], scene:"生活"},
    {en:"She belongs to a book club.", cn:"她参加了一个读书会。", focus:["belongs","to"], scene:"生活"},
    {en:"It depends on the weather.", cn:"这要看天气。", focus:["depends","on"], scene:"生活"},
    {en:"I rely on my alarm clock.", cn:"我靠闹钟叫醒。", focus:["rely","on"], scene:"生活"},
    {en:"We agreed with her plan.", cn:"我们同意她的计划。", focus:["agreed","with"], scene:"生活"},
    {en:"They agreed on a time.", cn:"他们定好了时间。", focus:["agreed","on"], scene:"生活"},
    {en:"I thought about moving out.", cn:"我想过搬出去。", focus:["thought","about"], scene:"生活"},
    {en:"She insisted on paying.", cn:"她坚持要付钱。", focus:["insisted","on"], scene:"生活"},
    {en:"This meal consists of three dishes.", cn:"这顿饭有三道菜。", focus:["consists","of"], scene:"生活"},
    {en:"The rain resulted in a delay.", cn:"下雨导致了延误。", focus:["resulted","in"], scene:"生活"},
    {en:"I suffer from allergies.", cn:"我有过敏。", focus:["suffer","from"], scene:"生活"},
    {en:"We benefited from the discount.", cn:"我们享受到了折扣。", focus:["benefited","from"], scene:"生活"},
    {en:"She participated in a marathon.", cn:"她参加了一场马拉松。", focus:["participated","in"], scene:"生活"},
    {en:"He dealt with the paperwork.", cn:"文件的事他处理了。", focus:["dealt","with"], scene:"生活"},
    {en:"I searched for my phone everywhere.", cn:"我到处找我的手机。", focus:["searched","for"], scene:"生活"},
    {en:"We ran out of milk.", cn:"我们牛奶用完了。", focus:["ran","out","of"], scene:"生活"},
    {en:"She came up with a plan.", cn:"她想出了一个办法。", focus:["came","up","with"], scene:"生活"},
    {en:"I looked after my sister.", cn:"我照看了我妹妹。", focus:["looked","after"], scene:"生活"},
    {en:"We looked forward to the trip.", cn:"我们很期待这次旅行。", focus:["looked","forward","to"], scene:"生活"},
    {en:"He gave up on the diet.", cn:"他放弃减肥了。", focus:["gave","up","on"], scene:"生活"},
    {en:"I signed up for a gym.", cn:"我办了健身房的卡。", focus:["signed","up","for"], scene:"生活"},
    {en:"She got used to the early shift.", cn:"她习惯早班了。", focus:["got","used","to"], scene:"生活"},
    {en:"I am familiar with this street.", cn:"我熟悉这条街。", focus:["familiar","with"], scene:"生活"},
    {en:"He is responsible for the rent.", cn:"房租由他负责。", focus:["responsible","for"], scene:"生活"},
    {en:"We are aware of the rules.", cn:"我们清楚这些规定。", focus:["aware","of"], scene:"生活"},
    {en:"She is interested in cooking.", cn:"她对做饭感兴趣。", focus:["interested","in"], scene:"生活"},
    {en:"They are satisfied with the flat.", cn:"他们对这套公寓很满意。", focus:["satisfied","with"], scene:"生活"},
    {en:"I am ready for bed.", cn:"我准备睡了。", focus:["ready","for"], scene:"生活"},
    {en:"He is good at fixing things.", cn:"他很会修东西。", focus:["good","at"], scene:"生活"},
    {en:"This one is different from mine.", cn:"这个和我的不一样。", focus:["different","from"], scene:"生活"},
    {en:"Your bag is similar to hers.", cn:"你的包和她的很像。", focus:["similar","to"], scene:"生活"},
    {en:"I am used to the noise now.", cn:"我现在习惯这个噪音了。", focus:["used","to"], scene:"生活"},
    {en:"She asked about my family.", cn:"她问起了我的家人。", focus:["asked","about"], scene:"生活"},
    {en:"I heard about the new cafe.", cn:"我听说了那家新咖啡馆。", focus:["heard","about"], scene:"生活"},
    {en:"We learned about it online.", cn:"我们在网上了解到的。", focus:["learned","about"], scene:"生活"},
    {en:"He wrote to his old teacher.", cn:"他给以前的老师写了信。", focus:["wrote","to"], scene:"生活"},
    {en:"I spoke to the doctor.", cn:"我和医生谈过了。", focus:["spoke","to"], scene:"生活"},
    {en:"She took care of the cat.", cn:"猫是她照顾的。", focus:["took","care","of"], scene:"生活"},
    {en:"We moved on to dessert.", cn:"我们接着上甜点了。", focus:["moved","on","to"], scene:"生活"},
    {en:"I turned to my friend for advice.", cn:"我找朋友要了建议。", focus:["turned","to"], scene:"生活"},
    {en:"He stuck to his decision.", cn:"他坚持了他的决定。", focus:["stuck","to"], scene:"生活"},
    {en:"I followed up on the repair.", cn:"维修的事我跟进了。", focus:["followed","up","on"], scene:"生活"},
    {en:"She checked in with her mom.", cn:"她跟她妈报了平安。", focus:["checked","in","with"], scene:"生活"},
    {en:"We settled on a quiet place.", cn:"我们最后选了个安静的地方。", focus:["settled","on"], scene:"生活"},
    {en:"I filled in the application.", cn:"我把申请表填了。", focus:["filled","in"], scene:"生活"},
    {en:"They ended up with too much food.", cn:"他们最后剩了太多吃的。", focus:["ended","up","with"], scene:"生活"},
    {en:"We arrived at the airport on time.", cn:"我们准时到了机场。", focus:["arrived","at"], scene:"旅行"},
    {en:"She arrived in Tokyo last night.", cn:"她昨晚到东京了。", focus:["arrived","in"], scene:"旅行"},
    {en:"I waited for the train for an hour.", cn:"我等了一个小时的火车。", focus:["waited","for"], scene:"旅行"},
    {en:"We listened to the guide carefully.", cn:"我们认真听了导游讲解。", focus:["listened","to"], scene:"旅行"},
    {en:"He looked at the map again.", cn:"他又看了一遍地图。", focus:["looked","at"], scene:"旅行"},
    {en:"I am looking for the gate.", cn:"我在找登机口。", focus:["looking","for"], scene:"旅行"},
    {en:"She asked for a window seat.", cn:"她要了个靠窗座位。", focus:["asked","for"], scene:"旅行"},
    {en:"We paid for the tickets online.", cn:"票我们在网上付的。", focus:["paid","for"], scene:"旅行"},
    {en:"They complained about the delay.", cn:"他们抱怨延误。", focus:["complained","about"], scene:"旅行"},
    {en:"I worry about missing the flight.", cn:"我担心误机。", focus:["worry","about"], scene:"旅行"},
    {en:"The trip depends on the visa.", cn:"这趟行程取决于签证。", focus:["depends","on"], scene:"旅行"},
    {en:"We rely on the hotel shuttle.", cn:"我们靠酒店班车。", focus:["rely","on"], scene:"旅行"},
    {en:"I agreed with the driver's route.", cn:"我同意司机走的路线。", focus:["agreed","with"], scene:"旅行"},
    {en:"We agreed on a meeting point.", cn:"我们约好了碰面地点。", focus:["agreed","on"], scene:"旅行"},
    {en:"She talked to the front desk.", cn:"她和前台谈了。", focus:["talked","to"], scene:"旅行"},
    {en:"Let's talk about tomorrow's plan.", cn:"我们聊聊明天的安排吧。", focus:["talk","about"], scene:"旅行"},
    {en:"I thought about changing hotels.", cn:"我想过换酒店。", focus:["thought","about"], scene:"旅行"},
    {en:"He replied to my booking email.", cn:"他回了我的订房邮件。", focus:["replied","to"], scene:"旅行"},
    {en:"This tour consists of three stops.", cn:"这个行程有三站。", focus:["consists","of"], scene:"旅行"},
    {en:"The storm resulted in a cancellation.", cn:"暴风雨导致了取消。", focus:["resulted","in"], scene:"旅行"},
    {en:"We suffered from jet lag.", cn:"我们受了时差的罪。", focus:["suffered","from"], scene:"旅行"},
    {en:"She participated in a cooking class.", cn:"她参加了一个烹饪课。", focus:["participated","in"], scene:"旅行"},
    {en:"I searched for a cheaper flight.", cn:"我找了更便宜的航班。", focus:["searched","for"], scene:"旅行"},
    {en:"We ran out of cash.", cn:"我们现金用完了。", focus:["ran","out","of"], scene:"旅行"},
    {en:"He came up with a shortcut.", cn:"他想出了一条近路。", focus:["came","up","with"], scene:"旅行"},
    {en:"I looked into the train schedule.", cn:"我查了火车时刻表。", focus:["looked","into"], scene:"旅行"},
    {en:"We looked forward to the beach.", cn:"我们很期待去海滩。", focus:["looked","forward","to"], scene:"旅行"},
    {en:"She signed up for a day tour.", cn:"她报了一日游。", focus:["signed","up","for"], scene:"旅行"},
    {en:"I got used to the time difference.", cn:"我适应时差了。", focus:["got","used","to"], scene:"旅行"},
    {en:"We are familiar with this city.", cn:"我们熟悉这座城市。", focus:["familiar","with"], scene:"旅行"},
    {en:"He is responsible for the booking.", cn:"订房由他负责。", focus:["responsible","for"], scene:"旅行"},
    {en:"They are aware of the curfew.", cn:"他们知道宵禁的事。", focus:["aware","of"], scene:"旅行"},
    {en:"I am interested in local food.", cn:"我对当地菜感兴趣。", focus:["interested","in"], scene:"旅行"},
    {en:"We are satisfied with the room.", cn:"我们对房间很满意。", focus:["satisfied","with"], scene:"旅行"},
    {en:"She is ready for the flight.", cn:"她准备好登机了。", focus:["ready","for"], scene:"旅行"},
    {en:"This hotel is different from the last one.", cn:"这家酒店和上一家不一样。", focus:["different","from"], scene:"旅行"},
    {en:"I asked about the return time.", cn:"我问了返程时间。", focus:["asked","about"], scene:"旅行"},
    {en:"We heard about that restaurant.", cn:"我们听说过那家餐厅。", focus:["heard","about"], scene:"旅行"},
    {en:"He spoke to the taxi driver.", cn:"他和出租车司机说了。", focus:["spoke","to"], scene:"旅行"},
    {en:"I checked in with my family.", cn:"我跟家里报了平安。", focus:["checked","in","with"], scene:"旅行"}
  ],
  "patterns": [
    {en:"Could you send me the Figma link?", cn:"你能把 Figma 链接发我吗？", focus:["could","you"], note:"句型：Could you + 动词？（请求）", scene:"UX/UI"},
    {en:"Could you check the spacing again?", cn:"你能再检查一下间距吗？", focus:["could","you"], note:"句型：Could you + 动词？（请求）", scene:"UX/UI"},
    {en:"Could you pass me the salt?", cn:"你能把盐递给我吗？", focus:["could","you"], note:"句型：Could you + 动词？（请求）", scene:"生活"},
    {en:"Could you call me back tonight?", cn:"你今晚能给我回个电话吗？", focus:["could","you"], note:"句型：Could you + 动词？（请求）", scene:"生活"},
    {en:"Could you show me the way to the station?", cn:"你能告诉我去车站怎么走吗？", focus:["could","you"], note:"句型：Could you + 动词？（请求）", scene:"旅行"},
    {en:"Would you mind reviewing my design?", cn:"你介意帮我看一下设计吗？", focus:["would","you","mind"], note:"句型：Would you mind + 动词ing？（客气请求）", scene:"UX/UI"},
    {en:"Would you mind moving the meeting to three?", cn:"你介意把会议挪到三点吗？", focus:["would","you","mind"], note:"句型：Would you mind + 动词ing？（客气请求）", scene:"UX/UI"},
    {en:"Would you mind closing the window?", cn:"你介意把窗关一下吗？", focus:["would","you","mind"], note:"句型：Would you mind + 动词ing？（客气请求）", scene:"生活"},
    {en:"Would you mind waiting a few minutes?", cn:"你介意等几分钟吗？", focus:["would","you","mind"], note:"句型：Would you mind + 动词ing？（客气请求）", scene:"生活"},
    {en:"Would you mind taking a photo of us?", cn:"你介意帮我们拍张照吗？", focus:["would","you","mind"], note:"句型：Would you mind + 动词ing？（客气请求）", scene:"旅行"},
    {en:"Do you mind if I change the color?", cn:"我改一下颜色，你介意吗？", focus:["do","you","mind","if"], note:"句型：Do you mind if I + 动词？（征求同意）", scene:"UX/UI"},
    {en:"Do you mind if I join the call late?", cn:"我晚点进会，你介意吗？", focus:["do","you","mind","if"], note:"句型：Do you mind if I + 动词？（征求同意）", scene:"UX/UI"},
    {en:"Do you mind if I open the window?", cn:"我开一下窗，你介意吗？", focus:["do","you","mind","if"], note:"句型：Do you mind if I + 动词？（征求同意）", scene:"生活"},
    {en:"Do you mind if I sit here?", cn:"我坐这儿，你介意吗？", focus:["do","you","mind","if"], note:"句型：Do you mind if I + 动词？（征求同意）", scene:"生活"},
    {en:"Do you mind if I take this seat?", cn:"我坐这个座位，你介意吗？", focus:["do","you","mind","if"], note:"句型：Do you mind if I + 动词？（征求同意）", scene:"旅行"},
    {en:"Is it OK if I use this font?", cn:"我用这个字体行不行？", focus:["is","it","ok","if"], note:"句型：Is it OK if I + 动词？（问行不行）", scene:"UX/UI"},
    {en:"Is it OK if I send it tomorrow?", cn:"我明天发行不行？", focus:["is","it","ok","if"], note:"句型：Is it OK if I + 动词？（问行不行）", scene:"UX/UI"},
    {en:"Is it OK if I leave early today?", cn:"我今天早点走行不行？", focus:["is","it","ok","if"], note:"句型：Is it OK if I + 动词？（问行不行）", scene:"生活"},
    {en:"Is it OK if I bring a friend?", cn:"我带个朋友行不行？", focus:["is","it","ok","if"], note:"句型：Is it OK if I + 动词？（问行不行）", scene:"生活"},
    {en:"Is it OK if I check in late?", cn:"我晚点办入住行不行？", focus:["is","it","ok","if"], note:"句型：Is it OK if I + 动词？（问行不行）", scene:"旅行"},
    {en:"Could I have edit access to the file?", cn:"能给我这个文件的编辑权限吗？", focus:["could","i","have"], note:"句型：Could I have + 名词？（要东西）", scene:"UX/UI"},
    {en:"Could I have a copy of the spec?", cn:"能给我一份需求文档吗？", focus:["could","i","have"], note:"句型：Could I have + 名词？（要东西）", scene:"UX/UI"},
    {en:"Could I have the menu, please?", cn:"能给我一份菜单吗？", focus:["could","i","have"], note:"句型：Could I have + 名词？（要东西）", scene:"生活"},
    {en:"Could I have a glass of water?", cn:"能给我一杯水吗？", focus:["could","i","have"], note:"句型：Could I have + 名词？（要东西）", scene:"生活"},
    {en:"Could I have a window seat?", cn:"能给我一个靠窗的座位吗？", focus:["could","i","have"], note:"句型：Could I have + 名词？（要东西）", scene:"旅行"},
    {en:"I was wondering if you could review this today.", cn:"不知道你今天能不能看一下这个。", focus:["wondering","if","could"], note:"句型：I was wondering if you could + 动词（委婉请求）", scene:"UX/UI"},
    {en:"I was wondering if you could share the file.", cn:"不知道你能不能把文件分享一下。", focus:["wondering","if","could"], note:"句型：I was wondering if you could + 动词（委婉请求）", scene:"UX/UI"},
    {en:"I was wondering if you could help me move.", cn:"不知道你能不能帮我搬家。", focus:["wondering","if","could"], note:"句型：I was wondering if you could + 动词（委婉请求）", scene:"生活"},
    {en:"I was wondering if you could pick me up.", cn:"不知道你能不能来接我。", focus:["wondering","if","could"], note:"句型：I was wondering if you could + 动词（委婉请求）", scene:"生活"},
    {en:"I was wondering if you could recommend a hotel.", cn:"不知道你能不能推荐一家酒店。", focus:["wondering","if","could"], note:"句型：I was wondering if you could + 动词（委婉请求）", scene:"旅行"},
    {en:"How about using a lighter gray?", cn:"用浅一点的灰怎么样？", focus:["how","about"], note:"句型：How about + 动词ing？（提议）", scene:"UX/UI"},
    {en:"How about testing it on mobile first?", cn:"先在手机上测怎么样？", focus:["how","about"], note:"句型：How about + 动词ing？（提议）", scene:"UX/UI"},
    {en:"How about eating out tonight?", cn:"今晚出去吃怎么样？", focus:["how","about"], note:"句型：How about + 动词ing？（提议）", scene:"生活"},
    {en:"How about going for a walk?", cn:"去散个步怎么样？", focus:["how","about"], note:"句型：How about + 动词ing？（提议）", scene:"生活"},
    {en:"How about taking the train instead?", cn:"改坐火车怎么样？", focus:["how","about"], note:"句型：How about + 动词ing？（提议）", scene:"旅行"},
    {en:"What if we remove this step?", cn:"要不我们把这一步去掉？", focus:["what","if","we"], note:"句型：What if we + 动词？（要不我们…）", scene:"UX/UI"},
    {en:"What if we launch next week instead?", cn:"要不我们改到下周上线？", focus:["what","if","we"], note:"句型：What if we + 动词？（要不我们…）", scene:"UX/UI"},
    {en:"What if we order takeout?", cn:"要不我们点外卖？", focus:["what","if","we"], note:"句型：What if we + 动词？（要不我们…）", scene:"生活"},
    {en:"What if we stay home this weekend?", cn:"要不我们这周末待在家？", focus:["what","if","we"], note:"句型：What if we + 动词？（要不我们…）", scene:"生活"},
    {en:"What if we book a later flight?", cn:"要不我们订晚一点的航班？", focus:["what","if","we"], note:"句型：What if we + 动词？（要不我们…）", scene:"旅行"},
    {en:"Why don't we ask the users?", cn:"我们何不问问用户？", focus:["why","don't","we"], note:"句型：Why don't we + 动词？（何不…）", scene:"UX/UI"},
    {en:"Why don't we try a simpler layout?", cn:"我们何不试试更简单的布局？", focus:["why","don't","we"], note:"句型：Why don't we + 动词？（何不…）", scene:"UX/UI"},
    {en:"Why don't we meet for coffee?", cn:"我们何不约个咖啡？", focus:["why","don't","we"], note:"句型：Why don't we + 动词？（何不…）", scene:"生活"},
    {en:"Why don't we split the bill?", cn:"我们何不平摊账单？", focus:["why","don't","we"], note:"句型：Why don't we + 动词？（何不…）", scene:"生活"},
    {en:"Why don't we rent a car?", cn:"我们何不租辆车？", focus:["why","don't","we"], note:"句型：Why don't we + 动词？（何不…）", scene:"旅行"},
    {en:"I think we should keep the old design.", cn:"我觉得我们应该保留旧设计。", focus:["think","we","should"], note:"句型：I think we should + 动词（建议）", scene:"UX/UI"},
    {en:"I think we should talk to the PM first.", cn:"我觉得我们应该先和产品经理谈。", focus:["think","we","should"], note:"句型：I think we should + 动词（建议）", scene:"UX/UI"},
    {en:"I think we should leave now.", cn:"我觉得我们应该现在走。", focus:["think","we","should"], note:"句型：I think we should + 动词（建议）", scene:"生活"},
    {en:"I think we should cook tonight.", cn:"我觉得我们今晚应该自己做饭。", focus:["think","we","should"], note:"句型：I think we should + 动词（建议）", scene:"生活"},
    {en:"I think we should book in advance.", cn:"我觉得我们应该提前订。", focus:["think","we","should"], note:"句型：I think we should + 动词（建议）", scene:"旅行"},
    {en:"It might be better to hide this button.", cn:"把这个按钮隐藏可能更好。", focus:["might","be","better","to"], note:"句型：It might be better to + 动词（…可能更好）", scene:"UX/UI"},
    {en:"It might be better to wait for feedback.", cn:"等一下反馈可能更好。", focus:["might","be","better","to"], note:"句型：It might be better to + 动词（…可能更好）", scene:"UX/UI"},
    {en:"It might be better to leave early.", cn:"早点出发可能更好。", focus:["might","be","better","to"], note:"句型：It might be better to + 动词（…可能更好）", scene:"生活"},
    {en:"It might be better to call first.", cn:"先打个电话可能更好。", focus:["might","be","better","to"], note:"句型：It might be better to + 动词（…可能更好）", scene:"生活"},
    {en:"It might be better to take a taxi.", cn:"打车可能更好。", focus:["might","be","better","to"], note:"句型：It might be better to + 动词（…可能更好）", scene:"旅行"},
    {en:"I'd rather keep it simple.", cn:"我宁愿保持简单。", focus:["i'd","rather"], note:"句型：I'd rather + 动词（宁愿）", scene:"UX/UI"},
    {en:"I'd rather fix it now.", cn:"我宁愿现在就修。", focus:["i'd","rather"], note:"句型：I'd rather + 动词（宁愿）", scene:"UX/UI"},
    {en:"I'd rather stay in tonight.", cn:"我今晚宁愿待在家。", focus:["i'd","rather"], note:"句型：I'd rather + 动词（宁愿）", scene:"生活"},
    {en:"I'd rather walk than wait for the bus.", cn:"我宁愿走路，也不想等公交。", focus:["i'd","rather"], note:"句型：I'd rather + 动词（宁愿）", scene:"生活"},
    {en:"I'd rather take the early flight.", cn:"我宁愿坐早班飞机。", focus:["i'd","rather"], note:"句型：I'd rather + 动词（宁愿）", scene:"旅行"},
    {en:"I'd prefer to use the new tool.", cn:"我更想用新工具。", focus:["i'd","prefer","to"], note:"句型：I'd prefer to + 动词（更想）", scene:"UX/UI"},
    {en:"I'd prefer to present on Friday.", cn:"我更想周五演示。", focus:["i'd","prefer","to"], note:"句型：I'd prefer to + 动词（更想）", scene:"UX/UI"},
    {en:"I'd prefer to eat at home.", cn:"我更想在家吃。", focus:["i'd","prefer","to"], note:"句型：I'd prefer to + 动词（更想）", scene:"生活"},
    {en:"I'd prefer to sleep early.", cn:"我更想早点睡。", focus:["i'd","prefer","to"], note:"句型：I'd prefer to + 动词（更想）", scene:"生活"},
    {en:"I'd prefer to sit by the window.", cn:"我更想坐靠窗的位置。", focus:["i'd","prefer","to"], note:"句型：I'd prefer to + 动词（更想）", scene:"旅行"},
    {en:"I'm not sure if this color works.", cn:"我不确定这个颜色行不行。", focus:["not","sure","if"], note:"句型：I'm not sure if + 句子（不确定）", scene:"UX/UI"},
    {en:"I'm not sure if the client saw it.", cn:"我不确定客户看到没有。", focus:["not","sure","if"], note:"句型：I'm not sure if + 句子（不确定）", scene:"UX/UI"},
    {en:"I'm not sure if the store is open.", cn:"我不确定店开没开。", focus:["not","sure","if"], note:"句型：I'm not sure if + 句子（不确定）", scene:"生活"},
    {en:"I'm not sure if I locked the door.", cn:"我不确定门锁没锁。", focus:["not","sure","if"], note:"句型：I'm not sure if + 句子（不确定）", scene:"生活"},
    {en:"I'm not sure if the train stops here.", cn:"我不确定火车在这儿停不停。", focus:["not","sure","if"], note:"句型：I'm not sure if + 句子（不确定）", scene:"旅行"},
    {en:"I'm afraid the file is too large.", cn:"恐怕文件太大了。", focus:["i'm","afraid"], note:"句型：I'm afraid + 句子（恐怕）", scene:"UX/UI"},
    {en:"I'm afraid we missed the deadline.", cn:"恐怕我们错过截止时间了。", focus:["i'm","afraid"], note:"句型：I'm afraid + 句子（恐怕）", scene:"UX/UI"},
    {en:"I'm afraid I can't come tonight.", cn:"恐怕我今晚来不了。", focus:["i'm","afraid"], note:"句型：I'm afraid + 句子（恐怕）", scene:"生活"},
    {en:"I'm afraid it's going to rain.", cn:"恐怕要下雨了。", focus:["i'm","afraid"], note:"句型：I'm afraid + 句子（恐怕）", scene:"生活"},
    {en:"I'm afraid the room is full.", cn:"恐怕房间满了。", focus:["i'm","afraid"], note:"句型：I'm afraid + 句子（恐怕）", scene:"旅行"},
    {en:"I have no idea why the build failed.", cn:"我完全不知道构建为什么失败。", focus:["have","no","idea"], note:"句型：I have no idea + 疑问词（完全不知道）", scene:"UX/UI"},
    {en:"I have no idea what the client wants.", cn:"我完全不知道客户想要什么。", focus:["have","no","idea"], note:"句型：I have no idea + 疑问词（完全不知道）", scene:"UX/UI"},
    {en:"I have no idea where my keys are.", cn:"我完全不知道钥匙在哪。", focus:["have","no","idea"], note:"句型：I have no idea + 疑问词（完全不知道）", scene:"生活"},
    {en:"I have no idea how to cook this.", cn:"我完全不知道这个怎么做。", focus:["have","no","idea"], note:"句型：I have no idea + 疑问词（完全不知道）", scene:"生活"},
    {en:"I have no idea which bus to take.", cn:"我完全不知道该坐哪趟公交。", focus:["have","no","idea"], note:"句型：I have no idea + 疑问词（完全不知道）", scene:"旅行"},
    {en:"It's worth testing on real users.", cn:"值得在真实用户身上测一下。", focus:["worth"], note:"句型：It's worth + 动词ing（值得）", scene:"UX/UI"},
    {en:"It's worth asking the engineer.", cn:"值得问问工程师。", focus:["worth"], note:"句型：It's worth + 动词ing（值得）", scene:"UX/UI"},
    {en:"It's worth trying that restaurant.", cn:"那家餐厅值得试试。", focus:["worth"], note:"句型：It's worth + 动词ing（值得）", scene:"生活"},
    {en:"It's worth getting up early for.", cn:"值得为它早起。", focus:["worth"], note:"句型：It's worth + 动词ing（值得）", scene:"生活"},
    {en:"It's worth visiting the old town.", cn:"老城区值得去一趟。", focus:["worth"], note:"句型：It's worth + 动词ing（值得）", scene:"旅行"},
    {en:"There's no need to redesign the whole page.", cn:"没必要把整页重做。", focus:["no","need","to"], note:"句型：There's no need to + 动词（没必要）", scene:"UX/UI"},
    {en:"There's no need to rush the review.", cn:"没必要赶着评审。", focus:["no","need","to"], note:"句型：There's no need to + 动词（没必要）", scene:"UX/UI"},
    {en:"There's no need to apologize.", cn:"没必要道歉。", focus:["no","need","to"], note:"句型：There's no need to + 动词（没必要）", scene:"生活"},
    {en:"There's no need to bring anything.", cn:"没必要带东西。", focus:["no","need","to"], note:"句型：There's no need to + 动词（没必要）", scene:"生活"},
    {en:"There's no need to print the ticket.", cn:"没必要把票打印出来。", focus:["no","need","to"], note:"句型：There's no need to + 动词（没必要）", scene:"旅行"},
    {en:"It doesn't matter which font we use.", cn:"用哪个字体无所谓。", focus:["doesn't","matter"], note:"句型：It doesn't matter + 疑问词/if（无所谓）", scene:"UX/UI"},
    {en:"It doesn't matter if it's a day late.", cn:"晚一天无所谓。", focus:["doesn't","matter"], note:"句型：It doesn't matter + 疑问词/if（无所谓）", scene:"UX/UI"},
    {en:"It doesn't matter what we eat.", cn:"吃什么无所谓。", focus:["doesn't","matter"], note:"句型：It doesn't matter + 疑问词/if（无所谓）", scene:"生活"},
    {en:"It doesn't matter who pays.", cn:"谁付钱无所谓。", focus:["doesn't","matter"], note:"句型：It doesn't matter + 疑问词/if（无所谓）", scene:"生活"},
    {en:"It doesn't matter where we stay.", cn:"住哪儿无所谓。", focus:["doesn't","matter"], note:"句型：It doesn't matter + 疑问词/if（无所谓）", scene:"旅行"},
    {en:"I can't help noticing the misalignment.", cn:"我忍不住注意到没对齐。", focus:["can't","help"], note:"句型：I can't help + 动词ing（忍不住）", scene:"UX/UI"},
    {en:"I can't help checking the messages.", cn:"我忍不住去看消息。", focus:["can't","help"], note:"句型：I can't help + 动词ing（忍不住）", scene:"UX/UI"},
    {en:"I can't help laughing at that photo.", cn:"我看到那张照片就忍不住笑。", focus:["can't","help"], note:"句型：I can't help + 动词ing（忍不住）", scene:"生活"},
    {en:"I can't help worrying about it.", cn:"我忍不住担心这事。", focus:["can't","help"], note:"句型：I can't help + 动词ing（忍不住）", scene:"生活"},
    {en:"I can't help taking photos everywhere.", cn:"我忍不住到处拍照。", focus:["can't","help"], note:"句型：I can't help + 动词ing（忍不住）", scene:"旅行"},
    {en:"It takes a week to finish the prototype.", cn:"做完原型要花一周。", focus:["takes","to"], note:"句型：It takes + 时间 + to 动词（要花…）", scene:"UX/UI"},
    {en:"It takes an hour to export everything.", cn:"全部导出要花一小时。", focus:["takes","to"], note:"句型：It takes + 时间 + to 动词（要花…）", scene:"UX/UI"},
    {en:"It takes ten minutes to walk there.", cn:"走过去要花十分钟。", focus:["takes","to"], note:"句型：It takes + 时间 + to 动词（要花…）", scene:"生活"},
    {en:"It takes time to get used to it.", cn:"习惯它要花时间。", focus:["takes","to"], note:"句型：It takes + 时间 + to 动词（要花…）", scene:"生活"},
    {en:"It takes two hours to reach the airport.", cn:"到机场要花两小时。", focus:["takes","to"], note:"句型：It takes + 时间 + to 动词（要花…）", scene:"旅行"},
    {en:"As soon as the file is ready, I'll send it.", cn:"文件一好我就发。", focus:["as","soon","as"], note:"句型：As soon as + 句子（一…就…）", scene:"UX/UI"},
    {en:"As soon as we get feedback, we'll fix it.", cn:"我们一收到反馈就修。", focus:["as","soon","as"], note:"句型：As soon as + 句子（一…就…）", scene:"UX/UI"},
    {en:"As soon as I get home, I'll call you.", cn:"我一到家就给你打电话。", focus:["as","soon","as"], note:"句型：As soon as + 句子（一…就…）", scene:"生活"},
    {en:"As soon as it stops raining, we'll go.", cn:"雨一停我们就走。", focus:["as","soon","as"], note:"句型：As soon as + 句子（一…就…）", scene:"生活"},
    {en:"As soon as we land, I'll text you.", cn:"我们一落地我就给你发消息。", focus:["as","soon","as"], note:"句型：As soon as + 句子（一…就…）", scene:"旅行"},
    {en:"What do you mean by too busy?", cn:"你说的太乱是什么意思？", focus:["what","do","you","mean","by"], note:"句型：What do you mean by + 名词？（你说的…是什么意思）", scene:"UX/UI"},
    {en:"What do you mean by the final version?", cn:"你说的最终版是什么意思？", focus:["what","do","you","mean","by"], note:"句型：What do you mean by + 名词？（你说的…是什么意思）", scene:"UX/UI"},
    {en:"What do you mean by later?", cn:"你说的待会儿是什么意思？", focus:["what","do","you","mean","by"], note:"句型：What do you mean by + 名词？（你说的…是什么意思）", scene:"生活"},
    {en:"What do you mean by that?", cn:"你说的那个是什么意思？", focus:["what","do","you","mean","by"], note:"句型：What do you mean by + 名词？（你说的…是什么意思）", scene:"生活"},
    {en:"What do you mean by the last stop?", cn:"你说的终点站是什么意思？", focus:["what","do","you","mean","by"], note:"句型：What do you mean by + 名词？（你说的…是什么意思）", scene:"旅行"},
    {en:"Let me check the file first.", cn:"让我先看一下文件。", focus:["let","me"], note:"句型：Let me + 动词（让我…）", scene:"UX/UI"},
    {en:"Let me walk you through the flow.", cn:"让我带你走一遍流程。", focus:["let","me"], note:"句型：Let me + 动词（让我…）", scene:"UX/UI"},
    {en:"Let me think about it.", cn:"让我想一想。", focus:["let","me"], note:"句型：Let me + 动词（让我…）", scene:"生活"},
    {en:"Let me get the door.", cn:"让我来开门。", focus:["let","me"], note:"句型：Let me + 动词（让我…）", scene:"生活"},
    {en:"Let me check the map.", cn:"让我看一下地图。", focus:["let","me"], note:"句型：Let me + 动词（让我…）", scene:"旅行"},
    {en:"Do you know who owns this component?", cn:"你知道这个组件谁负责吗？", focus:["do","you","know"], note:"句型：Do you know + 疑问词句？（你知道…吗）", scene:"UX/UI"},
    {en:"Do you know when the review is?", cn:"你知道评审是什么时候吗？", focus:["do","you","know"], note:"句型：Do you know + 疑问词句？（你知道…吗）", scene:"UX/UI"},
    {en:"Do you know what time it is?", cn:"你知道现在几点吗？", focus:["do","you","know"], note:"句型：Do you know + 疑问词句？（你知道…吗）", scene:"生活"},
    {en:"Do you know where she lives?", cn:"你知道她住哪儿吗？", focus:["do","you","know"], note:"句型：Do you know + 疑问词句？（你知道…吗）", scene:"生活"},
    {en:"Do you know how far the beach is?", cn:"你知道海滩有多远吗？", focus:["do","you","know"], note:"句型：Do you know + 疑问词句？（你知道…吗）", scene:"旅行"},
    {en:"Could you tell me where the spec is?", cn:"你能告诉我需求文档在哪吗？", focus:["could","you","tell","me"], note:"句型：Could you tell me + 疑问词句？（你能告诉我…吗）", scene:"UX/UI"},
    {en:"Could you tell me what changed?", cn:"你能告诉我改了什么吗？", focus:["could","you","tell","me"], note:"句型：Could you tell me + 疑问词句？（你能告诉我…吗）", scene:"UX/UI"},
    {en:"Could you tell me how much it costs?", cn:"你能告诉我这个多少钱吗？", focus:["could","you","tell","me"], note:"句型：Could you tell me + 疑问词句？（你能告诉我…吗）", scene:"生活"},
    {en:"Could you tell me when it opens?", cn:"你能告诉我它几点开门吗？", focus:["could","you","tell","me"], note:"句型：Could you tell me + 疑问词句？（你能告诉我…吗）", scene:"生活"},
    {en:"Could you tell me which gate it is?", cn:"你能告诉我是哪个登机口吗？", focus:["could","you","tell","me"], note:"句型：Could you tell me + 疑问词句？（你能告诉我…吗）", scene:"旅行"},
    {en:"Just to confirm, the deadline is Friday.", cn:"确认一下，截止时间是周五。", focus:["just","to","confirm"], note:"句型：Just to confirm, + 句子（确认一下）", scene:"UX/UI"},
    {en:"Just to confirm, we're using the new logo.", cn:"确认一下，我们用新 logo。", focus:["just","to","confirm"], note:"句型：Just to confirm, + 句子（确认一下）", scene:"UX/UI"},
    {en:"Just to confirm, dinner is at seven.", cn:"确认一下，晚饭是七点。", focus:["just","to","confirm"], note:"句型：Just to confirm, + 句子（确认一下）", scene:"生活"},
    {en:"Just to confirm, you're picking me up.", cn:"确认一下，是你来接我。", focus:["just","to","confirm"], note:"句型：Just to confirm, + 句子（确认一下）", scene:"生活"},
    {en:"Just to confirm, the tour starts at nine.", cn:"确认一下，行程九点开始。", focus:["just","to","confirm"], note:"句型：Just to confirm, + 句子（确认一下）", scene:"旅行"},
    {en:"The simpler the flow, the better.", cn:"流程越简单越好。", focus:["the","the"], note:"句型：The 比较级, the 比较级（越…越…）", scene:"UX/UI"},
    {en:"The earlier we test, the fewer bugs we get.", cn:"我们测得越早，bug 越少。", focus:["the","the"], note:"句型：The 比较级, the 比较级（越…越…）", scene:"UX/UI"},
    {en:"The more I sleep, the better I feel.", cn:"我睡得越多，感觉越好。", focus:["the","the"], note:"句型：The 比较级, the 比较级（越…越…）", scene:"生活"},
    {en:"The sooner we book, the cheaper it is.", cn:"我们订得越早越便宜。", focus:["the","the"], note:"句型：The 比较级, the 比较级（越…越…）", scene:"生活"},
    {en:"The earlier we leave, the less traffic there is.", cn:"我们走得越早，路上车越少。", focus:["the","the"], note:"句型：The 比较级, the 比较级（越…越…）", scene:"旅行"},
    {en:"If we change the color, users will notice.", cn:"如果我们改颜色，用户就会注意到。", focus:["if","will"], note:"句型：If + 现在时, ... will（如果…就…）", scene:"UX/UI"},
    {en:"If the test fails, we will delay the launch.", cn:"如果测试失败，我们就推迟上线。", focus:["if","will"], note:"句型：If + 现在时, ... will（如果…就…）", scene:"UX/UI"},
    {en:"If it rains, we will stay home.", cn:"如果下雨，我们就待在家。", focus:["if","will"], note:"句型：If + 现在时, ... will（如果…就…）", scene:"生活"},
    {en:"If you're free, I will call you.", cn:"如果你有空，我就给你打电话。", focus:["if","will"], note:"句型：If + 现在时, ... will（如果…就…）", scene:"生活"},
    {en:"If we miss the train, we will take a taxi.", cn:"如果错过火车，我们就打车。", focus:["if","will"], note:"句型：If + 现在时, ... will（如果…就…）", scene:"旅行"},
    {en:"Unless the client agrees, we won't change it.", cn:"除非客户同意，否则我们不改。", focus:["unless"], note:"句型：Unless + 句子（除非…否则…）", scene:"UX/UI"},
    {en:"Unless it's urgent, it can wait.", cn:"除非很急，否则可以等。", focus:["unless"], note:"句型：Unless + 句子（除非…否则…）", scene:"UX/UI"},
    {en:"Unless you're busy, come join us.", cn:"除非你忙，否则来一起吧。", focus:["unless"], note:"句型：Unless + 句子（除非…否则…）", scene:"生活"},
    {en:"Unless it rains, we'll go hiking.", cn:"除非下雨，否则我们去徒步。", focus:["unless"], note:"句型：Unless + 句子（除非…否则…）", scene:"生活"},
    {en:"Unless the flight is delayed, we'll land at six.", cn:"除非航班延误，否则我们六点落地。", focus:["unless"], note:"句型：Unless + 句子（除非…否则…）", scene:"旅行"},
    {en:"Even if it's late, send it today.", cn:"就算晚了，也今天发。", focus:["even","if"], note:"句型：Even if + 句子（就算…也…）", scene:"UX/UI"},
    {en:"Even if they say no, we'll try again.", cn:"就算他们拒绝，我们也再试一次。", focus:["even","if"], note:"句型：Even if + 句子（就算…也…）", scene:"UX/UI"},
    {en:"Even if I'm tired, I'll go.", cn:"就算累，我也去。", focus:["even","if"], note:"句型：Even if + 句子（就算…也…）", scene:"生活"},
    {en:"Even if it's expensive, it's worth it.", cn:"就算贵，也值得。", focus:["even","if"], note:"句型：Even if + 句子（就算…也…）", scene:"生活"},
    {en:"Even if it rains, the tour goes on.", cn:"就算下雨，行程也照旧。", focus:["even","if"], note:"句型：Even if + 句子（就算…也…）", scene:"旅行"},
    {en:"There's something wrong with the alignment.", cn:"对齐有点问题。", focus:["something","wrong","with"], note:"句型：There's something wrong with + 名词（…有问题）", scene:"UX/UI"},
    {en:"There's something wrong with the export.", cn:"导出有点问题。", focus:["something","wrong","with"], note:"句型：There's something wrong with + 名词（…有问题）", scene:"UX/UI"},
    {en:"There's something wrong with my phone.", cn:"我手机有点问题。", focus:["something","wrong","with"], note:"句型：There's something wrong with + 名词（…有问题）", scene:"生活"},
    {en:"There's something wrong with the heater.", cn:"暖气有点问题。", focus:["something","wrong","with"], note:"句型：There's something wrong with + 名词（…有问题）", scene:"生活"},
    {en:"There's something wrong with my booking.", cn:"我的预订有点问题。", focus:["something","wrong","with"], note:"句型：There's something wrong with + 名词（…有问题）", scene:"旅行"},
    {en:"It looks like the button is too small.", cn:"看起来按钮太小了。", focus:["looks","like"], note:"句型：It looks like + 句子（看起来…）", scene:"UX/UI"},
    {en:"It looks like we need one more round.", cn:"看起来我们还需要再来一轮。", focus:["looks","like"], note:"句型：It looks like + 句子（看起来…）", scene:"UX/UI"},
    {en:"It looks like it's going to rain.", cn:"看起来要下雨了。", focus:["looks","like"], note:"句型：It looks like + 句子（看起来…）", scene:"生活"},
    {en:"It looks like the shop is closed.", cn:"看起来店关门了。", focus:["looks","like"], note:"句型：It looks like + 句子（看起来…）", scene:"生活"},
    {en:"It looks like the flight is delayed.", cn:"看起来航班延误了。", focus:["looks","like"], note:"句型：It looks like + 句子（看起来…）", scene:"旅行"},
    {en:"It sounds like a good plan.", cn:"听起来是个好计划。", focus:["sounds","like"], note:"句型：It sounds like + 句子（听起来…）", scene:"UX/UI"},
    {en:"It sounds like the client is happy.", cn:"听起来客户很满意。", focus:["sounds","like"], note:"句型：It sounds like + 句子（听起来…）", scene:"UX/UI"},
    {en:"It sounds like you had a long day.", cn:"听起来你今天很累。", focus:["sounds","like"], note:"句型：It sounds like + 句子（听起来…）", scene:"生活"},
    {en:"It sounds like a fun weekend plan.", cn:"听起来是个有意思的周末计划。", focus:["sounds","like"], note:"句型：It sounds like + 句子（听起来…）", scene:"生活"},
    {en:"It sounds like a great place to stay.", cn:"听起来是个很棒的住处。", focus:["sounds","like"], note:"句型：It sounds like + 句子（听起来…）", scene:"旅行"},
    {en:"The icons seem to be misaligned.", cn:"这些图标好像没对齐。", focus:["seem","to"], note:"句型：seem to + 动词（好像…）", scene:"UX/UI"},
    {en:"Users seem to like the new flow.", cn:"用户好像喜欢新流程。", focus:["seem","to"], note:"句型：seem to + 动词（好像…）", scene:"UX/UI"},
    {en:"You seem to be tired.", cn:"你好像累了。", focus:["seem","to"], note:"句型：seem to + 动词（好像…）", scene:"生活"},
    {en:"They seem to know each other.", cn:"他们好像认识。", focus:["seem","to"], note:"句型：seem to + 动词（好像…）", scene:"生活"},
    {en:"The trains seem to run late here.", cn:"这里的火车好像总晚点。", focus:["seem","to"], note:"句型：seem to + 动词（好像…）", scene:"旅行"},
    {en:"I used to work on mobile apps.", cn:"我以前做手机应用。", focus:["used","to"], note:"句型：I used to + 动词（我以前…）", scene:"UX/UI"},
    {en:"I used to use Sketch.", cn:"我以前用 Sketch。", focus:["used","to"], note:"句型：I used to + 动词（我以前…）", scene:"UX/UI"},
    {en:"I used to live near the park.", cn:"我以前住在公园附近。", focus:["used","to"], note:"句型：I used to + 动词（我以前…）", scene:"生活"},
    {en:"I used to drink a lot of coffee.", cn:"我以前喝很多咖啡。", focus:["used","to"], note:"句型：I used to + 动词（我以前…）", scene:"生活"},
    {en:"I used to travel every summer.", cn:"我以前每年夏天都旅行。", focus:["used","to"], note:"句型：I used to + 动词（我以前…）", scene:"旅行"},
    {en:"I'm supposed to send the file today.", cn:"我本该今天发文件。", focus:["supposed","to"], note:"句型：I'm supposed to + 动词（我本该/按理该…）", scene:"UX/UI"},
    {en:"I'm supposed to join the review.", cn:"我本该参加评审。", focus:["supposed","to"], note:"句型：I'm supposed to + 动词（我本该/按理该…）", scene:"UX/UI"},
    {en:"I'm supposed to call my mom.", cn:"我本该给我妈打电话。", focus:["supposed","to"], note:"句型：I'm supposed to + 动词（我本该/按理该…）", scene:"生活"},
    {en:"I'm supposed to be at the gym now.", cn:"我本该现在在健身房。", focus:["supposed","to"], note:"句型：I'm supposed to + 动词（我本该/按理该…）", scene:"生活"},
    {en:"I'm supposed to check out by noon.", cn:"我本该中午前退房。", focus:["supposed","to"], note:"句型：I'm supposed to + 动词（我本该/按理该…）", scene:"旅行"},
    {en:"I'm about to share my screen.", cn:"我正要共享屏幕。", focus:["about","to"], note:"句型：I'm about to + 动词（我正要…）", scene:"UX/UI"},
    {en:"I'm about to send the draft.", cn:"我正要发草稿。", focus:["about","to"], note:"句型：I'm about to + 动词（我正要…）", scene:"UX/UI"},
    {en:"I'm about to leave for work.", cn:"我正要出门上班。", focus:["about","to"], note:"句型：I'm about to + 动词（我正要…）", scene:"生活"},
    {en:"I'm about to have dinner.", cn:"我正要吃晚饭。", focus:["about","to"], note:"句型：I'm about to + 动词（我正要…）", scene:"生活"},
    {en:"I'm about to board the plane.", cn:"我正要登机。", focus:["about","to"], note:"句型：I'm about to + 动词（我正要…）", scene:"旅行"},
    {en:"I'm having trouble opening the file.", cn:"我打开这个文件很费劲。", focus:["having","trouble"], note:"句型：I'm having trouble + 动词ing（我…很费劲）", scene:"UX/UI"},
    {en:"I'm having trouble finding the layer.", cn:"我找这个图层很费劲。", focus:["having","trouble"], note:"句型：I'm having trouble + 动词ing（我…很费劲）", scene:"UX/UI"},
    {en:"I'm having trouble sleeping these days.", cn:"我这些天睡觉很费劲。", focus:["having","trouble"], note:"句型：I'm having trouble + 动词ing（我…很费劲）", scene:"生活"},
    {en:"I'm having trouble finding my keys.", cn:"我找钥匙很费劲。", focus:["having","trouble"], note:"句型：I'm having trouble + 动词ing（我…很费劲）", scene:"生活"},
    {en:"I'm having trouble reading the map.", cn:"我看这张地图很费劲。", focus:["having","trouble"], note:"句型：I'm having trouble + 动词ing（我…很费劲）", scene:"旅行"},
    {en:"Is there any way to speed this up?", cn:"有没有办法把这个加快？", focus:["any","way","to"], note:"句型：Is there any way to + 动词？（有没有办法…）", scene:"UX/UI"},
    {en:"Is there any way to undo this?", cn:"有没有办法撤销这个？", focus:["any","way","to"], note:"句型：Is there any way to + 动词？（有没有办法…）", scene:"UX/UI"},
    {en:"Is there any way to fix it today?", cn:"有没有办法今天修好？", focus:["any","way","to"], note:"句型：Is there any way to + 动词？（有没有办法…）", scene:"生活"},
    {en:"Is there any way to get a discount?", cn:"有没有办法打个折？", focus:["any","way","to"], note:"句型：Is there any way to + 动词？（有没有办法…）", scene:"生活"},
    {en:"Is there any way to change my seat?", cn:"有没有办法换个座位？", focus:["any","way","to"], note:"句型：Is there any way to + 动词？（有没有办法…）", scene:"旅行"}
  ],
  "modals": [
    {en:"You should take a break.", cn:"你应该休息一下。", focus:["should","take"], scene:"生活"},
    {en:"I can share the Figma link.", cn:"我可以分享 Figma 链接。", focus:["can","share"], scene:"UX/UI"},
    {en:"We must make the button bigger.", cn:"我们必须把按钮做大一点。", focus:["must","make"], scene:"UX/UI"},
    {en:"She might join later.", cn:"她可能晚点加入。", focus:["might","join"], scene:"UX/UI"},
    {en:"Could you say that again?", cn:"你能再说一遍吗？", focus:["Could","say"], scene:"生活"},
    {en:"You must try this cafe.", cn:"你一定要试试这家咖啡馆。", focus:["must","try"], scene:"生活"},
    {en:"I should fix the spacing now.", cn:"我现在应该修好间距。", focus:["should","fix"], scene:"UX/UI"},
    {en:"We can meet tomorrow.", cn:"我们明天可以见面。", focus:["can","meet"], scene:"UX/UI"},
    {en:"He may be late.", cn:"他可能会迟到。", focus:["may","be"], scene:"生活"},
    {en:"Would you help me find the gate?", cn:"你能帮我找登机口吗？", focus:["Would","help"], scene:"旅行"},
    {en:"Can you change this color?", cn:"你能改一下这个颜色吗？", focus:["Can","change"], scene:"UX/UI"},
    {en:"You should ask for feedback.", cn:"你应该要一下反馈。", focus:["should","ask"], scene:"UX/UI"},
    {en:"I could send it tonight.", cn:"我今晚可以发。", focus:["could","send"], scene:"UX/UI"},
    {en:"We must leave for the airport.", cn:"我们必须出发去机场了。", focus:["must","leave"], scene:"旅行"},
    {en:"Would you open the Figma file?", cn:"你能打开 Figma 文件吗？", focus:["Would","open"], scene:"UX/UI"},
    {en:"She can speak louder.", cn:"她可以把声音开大一点。", focus:["can","speak"], scene:"UX/UI"},
    {en:"I might stay near the metro.", cn:"我可能住在地铁附近。", focus:["might","stay"], scene:"旅行"},
    {en:"Could you recommend a quiet cafe?", cn:"你能推荐一家安静的咖啡馆吗？", focus:["Could","recommend"], scene:"生活"},
    {en:"You should try a simpler layout.", cn:"你应该试试更简单的布局。", focus:["should","try"], scene:"UX/UI"},
    {en:"Can I have a window seat?", cn:"我能要靠窗座位吗？", focus:["Can","have"], scene:"旅行"},
    {en:"Can you make the button bigger?", cn:"你能把按钮做大一点吗？", focus:["Can","make"], scene:"UX/UI"},
    {en:"Could you share the Figma link?", cn:"你能分享一下 Figma 链接吗？", focus:["Could","share"], scene:"UX/UI"},
    {en:"Should I change the color?", cn:"我应该改颜色吗？", focus:["Should","change"], scene:"UX/UI"},
    {en:"Can you check the alignment?", cn:"你能看一下对齐吗？", focus:["Can","check"], scene:"UX/UI"},
    {en:"Should we hide this button?", cn:"我们应该隐藏这个按钮吗？", focus:["Should","hide"], scene:"UX/UI"},
    {en:"You must save the file first.", cn:"你必须先保存文件。", focus:["must","save"], scene:"UX/UI"},
    {en:"Could you speak more slowly?", cn:"你能说慢一点吗？", focus:["Could","speak"], scene:"生活"},
    {en:"We can take the metro.", cn:"我们可以坐地铁。", focus:["can","take"], scene:"旅行"},
    {en:"He might miss the train.", cn:"他可能会误火车。", focus:["might","miss"], scene:"旅行"},
    {en:"Would you pass the salt?", cn:"你能把盐递给我吗？", focus:["Would","pass"], scene:"生活"}
]
};

const NUMS = [{en:"three",cn:"三个"},{en:"two",cn:"两个"},{en:"five",cn:"五个"},{en:"many",cn:"很多"},{en:"a few",cn:"几个"}];
const TPL = {
  plural:[
    {en:"There are {n} {0} on this page.",cn:"这个页面上有{nc}{0c}。",focus:["{0}"],scene:"UX/UI",pool:[{en:"buttons",cn:"按钮"},{en:"icons",cn:"图标"},{en:"colors",cn:"颜色"},{en:"steps",cn:"步骤"},{en:"menus",cn:"菜单"},{en:"tabs",cn:"标签页"},{en:"cards",cn:"卡片"},{en:"fields",cn:"字段"},{en:"links",cn:"链接"},{en:"images",cn:"图片"}]},
    {en:"I have {n} {0} this week.",cn:"我这周有{nc}{0c}。",focus:["{0}"],scene:"UX/UI",pool:[{en:"design reviews",cn:"设计评审"},{en:"meetings",cn:"会"},{en:"screens to finish",cn:"要做完的页面"},{en:"prototypes",cn:"原型"},{en:"user interviews",cn:"用户访谈"},{en:"deadlines",cn:"要交的东西"}]},
    {en:"We need more {0}.",cn:"我们需要更多{0c}。",focus:["{0}"],scene:"UX/UI",pool:[{en:"icons",cn:"图标"},{en:"white space",cn:"留白"},{en:"examples",cn:"示例"},{en:"feedback",cn:"反馈"},{en:"contrast",cn:"对比度"},{en:"labels",cn:"文字说明"}]},
    {en:"The screen has too many {0}.",cn:"这个页面{0c}太多了。",focus:["{0}"],scene:"UX/UI",pool:[{en:"buttons",cn:"按钮"},{en:"colors",cn:"颜色"},{en:"icons",cn:"图标"},{en:"words",cn:"文字"},{en:"popups",cn:"弹窗"},{en:"animations",cn:"动画"}]},
    {en:"She designed {n} {0}.",cn:"她设计了{nc}{0c}。",focus:["{0}"],scene:"UX/UI",pool:[{en:"screens",cn:"页面"},{en:"icons",cn:"图标"},{en:"components",cn:"组件"},{en:"flows",cn:"流程"}]},
    {en:"There are {n} {0} in this app.",cn:"这个应用里有{nc}{0c}。",focus:["{0}"],scene:"UX/UI",pool:[{en:"pages",cn:"页面"},{en:"features",cn:"功能"},{en:"errors",cn:"报错"},{en:"languages",cn:"语言"}]},
    {en:"I bought {n} {0}.",cn:"我买了{nc}{0c}。",focus:["{0}"],scene:"旅行",pool:[{en:"tickets",cn:"票"},{en:"bottles of water",cn:"瓶水"},{en:"snacks",cn:"零食"},{en:"SIM cards",cn:"电话卡"},{en:"postcards",cn:"明信片"}]},
    {en:"We booked {n} {0}.",cn:"我们订了{nc}{0c}。",focus:["{0}"],scene:"旅行",pool:[{en:"nights",cn:"晚"},{en:"seats",cn:"座位"},{en:"rooms",cn:"房间"},{en:"tours",cn:"游览"}]},
    {en:"There are {n} {0} nearby.",cn:"附近有{nc}{0c}。",focus:["{0}"],scene:"生活",pool:[{en:"cafes",cn:"咖啡馆"},{en:"restaurants",cn:"餐厅"},{en:"shops",cn:"店"},{en:"parks",cn:"公园"},{en:"pharmacies",cn:"药店"}]},
    {en:"I need {n} {0}.",cn:"我需要{nc}{0c}。",focus:["{0}"],scene:"生活",pool:[{en:"batteries",cn:"电池"},{en:"chargers",cn:"充电器"},{en:"cups",cn:"杯子"},{en:"keys",cn:"钥匙"}]}
  ],
  article:[
    {en:"Can you open the {0}?",cn:"帮我打开{0c}？",focus:["the"],scene:"UX/UI",pool:[{en:"Figma file",cn:"Figma 文件"},{en:"prototype",cn:"原型"},{en:"homepage",cn:"首页"},{en:"settings page",cn:"设置页"},{en:"design system",cn:"设计系统"},{en:"style guide",cn:"样式指南"}]},
    {en:"Can you close the {0}?",cn:"把{0c}关一下？",focus:["the"],scene:"UX/UI",pool:[{en:"modal",cn:"弹窗"},{en:"tab",cn:"标签页"},{en:"sidebar",cn:"侧边栏"},{en:"menu",cn:"菜单"}]},
    {en:"I need a {0}.",cn:"我需要一个{0c}。",focus:["a"],scene:"UX/UI",pool:[{en:"bigger button",cn:"更大的按钮"},{en:"cleaner layout",cn:"更干净的布局"},{en:"short break",cn:"歇一会儿"},{en:"new icon",cn:"新图标"},{en:"clearer label",cn:"更清楚的标签"},{en:"quiet place",cn:"安静的地方"}]},
    {en:"I need a {0}.",cn:"我需要一个{0c}。",focus:["a"],scene:"旅行",pool:[{en:"window seat",cn:"靠窗座位"},{en:"quiet table",cn:"安静的桌子"},{en:"taxi",cn:"出租车"},{en:"map",cn:"地图"},{en:"power bank",cn:"充电宝"},{en:"boarding pass",cn:"登机牌"}]},
    {en:"She is an {0}.",cn:"她是{0c}。",focus:["an"],scene:"UX/UI",pool:[{en:"experienced designer",cn:"有经验的设计师"},{en:"English teacher",cn:"英语老师"},{en:"intern",cn:"实习生"},{en:"expert",cn:"专家"}]},
    {en:"He is an {0}.",cn:"他是{0c}。",focus:["an"],scene:"UX/UI",pool:[{en:"UI designer",cn:"UI 设计师"},{en:"UX researcher",cn:"UX 研究员"},{en:"illustrator",cn:"插画师"}]},
    {en:"This is an {0}.",cn:"这是个{0c}。",focus:["an"],scene:"UX/UI",pool:[{en:"easy change",cn:"简单的修改"},{en:"old icon",cn:"旧图标"},{en:"important update",cn:"重要更新"},{en:"open question",cn:"开放问题"}]},
    {en:"This is an {0}.",cn:"这是个{0c}。",focus:["an"],scene:"旅行",pool:[{en:"early flight",cn:"早班飞机"},{en:"open seat",cn:"空座位"},{en:"easy route",cn:"简单路线"},{en:"urgent message",cn:"紧急消息"}]},
    {en:"Can you fix the {0}?",cn:"你能修一下{0c}吗？",focus:["the"],scene:"UX/UI",pool:[{en:"spacing",cn:"间距"},{en:"alignment",cn:"对齐"},{en:"contrast",cn:"对比度"},{en:"typo",cn:"错别字"}]}
  ],
  comparatives:[
    {en:"This layout is {0} than the old one.",cn:"这个布局比旧的{0c}。",focus:["{0}","than"],scene:"UX/UI",pool:[{en:"cleaner",cn:"更干净"},{en:"simpler",cn:"更简单"},{en:"clearer",cn:"更清楚"},{en:"nicer",cn:"更好看"},{en:"lighter",cn:"更轻"},{en:"safer",cn:"更安全"}]},
    {en:"This screen is more {0} than before.",cn:"这个页面比以前更{0c}。",focus:["more","than"],scene:"UX/UI",pool:[{en:"useful",cn:"有用"},{en:"friendly",cn:"友好"},{en:"simple",cn:"简单"},{en:"consistent",cn:"统一"},{en:"accessible",cn:"易用"}]},
    {en:"This button is {0} than that one.",cn:"这个按钮比那个{0c}。",focus:["{0}","than"],scene:"UX/UI",pool:[{en:"bigger",cn:"更大"},{en:"smaller",cn:"更小"},{en:"clearer",cn:"更清楚"},{en:"better",cn:"更好"}]},
    {en:"Figma is {0} than PowerPoint for design.",cn:"做设计时 Figma 比 PPT {0c}。",focus:["{0}","than"],scene:"UX/UI",pool:[{en:"better",cn:"更好"},{en:"faster",cn:"更快"},{en:"easier",cn:"更容易"}]},
    {en:"This cafe is {0} than the hotel lobby.",cn:"这家咖啡馆比酒店大堂{0c}。",focus:["{0}","than"],scene:"生活",pool:[{en:"quieter",cn:"更安静"},{en:"cheaper",cn:"更便宜"},{en:"nicer",cn:"更好"},{en:"busier",cn:"更忙"}]},
    {en:"This phone is {0} than my old one.",cn:"这部手机比我旧的{0c}。",focus:["{0}","than"],scene:"生活",pool:[{en:"faster",cn:"更快"},{en:"lighter",cn:"更轻"},{en:"better",cn:"更好"}]},
    {en:"The train is {0} than the bus.",cn:"火车比公交{0c}。",focus:["{0}","than"],scene:"旅行",pool:[{en:"faster",cn:"更快"},{en:"better",cn:"更好"},{en:"safer",cn:"更安全"},{en:"cleaner",cn:"更干净"}]},
    {en:"This hotel is more {0} than the last one.",cn:"这家酒店比上一家更{0c}。",focus:["more","than"],scene:"旅行",pool:[{en:"comfortable",cn:"舒适"},{en:"expensive",cn:"贵"},{en:"convenient",cn:"方便"}]}
  ],
  prepositions:[
    {en:"The design review is at {0}.",cn:"设计评审在{0c}。",focus:["at"],scene:"UX/UI",pool:[{en:"three",cn:"三点"},{en:"10 am",cn:"上午十点"},{en:"noon",cn:"中午"},{en:"2 pm",cn:"下午两点"},{en:"4:30",cn:"四点半"},{en:"9 am",cn:"上午九点"}]},
    {en:"I work in {0}.",cn:"我在{0c}工作。",focus:["in"],scene:"UX/UI",pool:[{en:"UI design",cn:"UI 设计"},{en:"a design team",cn:"一个设计团队"},{en:"a foreign company",cn:"一家外企"},{en:"product design",cn:"产品设计"},{en:"Shanghai",cn:"上海"}]},
    {en:"The icon is on the {0}.",cn:"图标在{0c}。",focus:["on"],scene:"UX/UI",pool:[{en:"left",cn:"左边"},{en:"right",cn:"右边"},{en:"top",cn:"顶部"},{en:"bottom",cn:"底部"}]},
    {en:"Can you put the button in the {0}?",cn:"帮我把按钮放在{0c}？",focus:["in"],scene:"UX/UI",pool:[{en:"header",cn:"页头"},{en:"footer",cn:"页脚"},{en:"corner",cn:"角落"},{en:"center",cn:"中间"}]},
    {en:"Let's go to {0}.",cn:"我们去{0c}吧。",focus:["to"],scene:"生活",pool:[{en:"lunch",cn:"吃午饭"},{en:"the cafe",cn:"咖啡馆"},{en:"the park",cn:"公园"},{en:"the gym",cn:"健身房"}]},
    {en:"Let's go to {0}.",cn:"我们去{0c}吧。",focus:["to"],scene:"旅行",pool:[{en:"the airport",cn:"机场"},{en:"the hotel",cn:"酒店"},{en:"the station",cn:"车站"},{en:"the museum",cn:"博物馆"}]},
    {en:"Send it to {0}.",cn:"发给{0c}。",focus:["to"],scene:"UX/UI",pool:[{en:"me",cn:"我"},{en:"my manager",cn:"我的经理"},{en:"the design team",cn:"设计团队"},{en:"the group chat",cn:"群聊"}]},
    {en:"I'll be there in {0}.",cn:"我{0c}到。",focus:["in"],scene:"生活",pool:[{en:"ten minutes",cn:"十分钟后"},{en:"an hour",cn:"一小时后"},{en:"a moment",cn:"一会儿"},{en:"five minutes",cn:"五分钟后"},{en:"half an hour",cn:"半小时后"}]},
    {en:"Meet me at {0}.",cn:"在{0c}见我。",focus:["at"],scene:"旅行",pool:[{en:"the gate",cn:"登机口"},{en:"the lobby",cn:"大堂"},{en:"the exit",cn:"出口"},{en:"platform 3",cn:"3 号站台"}]}
  ]
};
function fillTemplate(t){
  const f = t.pool ? rnd(t.pool) : null;
  let en=t.en, cn=t.cn;
  if(f){ en=en.split("{0}").join(f.en); cn=cn.split("{0c}").join(f.cn); }
  if(en.indexOf("{n}")>=0){ const n=rnd(NUMS); en=en.split("{n}").join(n.en); cn=cn.split("{nc}").join(n.cn); }
  const focus=t.focus.map(x=> x==="{0}" && f ? f.en : x);
  return {en, cn, focus, scene:t.scene||rnd(SCENES)};
}
function pickBank(id){
  const bank=SENTENCE_BANKS[id];
  if(!bank||!bank.length) return null;
  const s=rnd(bank);
  return {en:s.en, cn:s.cn, focus:(s.focus||[]).slice(), scene:s.scene};
}
const GEN = {
  "be": ()=>pickBank("be"),
  "present-cont": ()=>pickBank("present-cont"),
  "present-s": ()=>pickBank("present-s"),
  "present-neg": ()=>pickBank("present-neg"),
  "past": ()=>pickBank("past"),
  "past-neg": ()=>pickBank("past-neg"),
  "future": ()=>pickBank("future"),
  "present-perfect": ()=>pickBank("present-perfect"),
  "modals": ()=>pickBank("modals"),
  "verb-prep": ()=>pickBank("verb-prep"),
  "patterns": ()=>pickBank("patterns"),
  "plural": ()=>fillTemplate(rnd(TPL.plural)),
  "article": ()=>fillTemplate(rnd(TPL.article)),
  "comparatives": ()=>fillTemplate(rnd(TPL.comparatives)),
  "prepositions": ()=>fillTemplate(rnd(TPL.prepositions))
};

const BATCH_SIZE = 25;   // per mode
const RECENT_CAP = 200;  // remember last N per unit (shared across listen/speak)

function shuffleInPlace(a){
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}
function normEn(en){
  return (en||"").toLowerCase().replace(/[^a-z0-9\s]/g," ").replace(/\s+/g," ").trim();
}
/** One-time hygiene: drop duplicate English in banks / listen↔speak overlap. */
(function sanitizeSentenceSources(){
  const dedupe=list=>{
    const seen=new Set(), out=[];
    (list||[]).forEach(s=>{
      if(!s||!s.en) return;
      const n=normEn(s.en);
      if(!n||seen.has(n)) return;
      seen.add(n); out.push(s);
    });
    return out;
  };
  if(typeof SENTENCE_BANKS==="object"){
    Object.keys(SENTENCE_BANKS).forEach(id=>{
      SENTENCE_BANKS[id]=dedupe(SENTENCE_BANKS[id]);
    });
  }
  UNITS.forEach(u=>{
    u.listen=dedupe(u.listen);
    u.speak=dedupe(u.speak);
    // Same EN must not live in both Listen and Speak of one unit
    const listenNorm=new Set((u.listen||[]).map(s=>normEn(s.en)));
    u.speak=(u.speak||[]).filter(s=>!listenNorm.has(normEn(s.en)));
    // Bank should only add sentences not already in the unit
    if(SENTENCE_BANKS[u.id]){
      const unitNorm=new Set([...(u.listen||[]),...(u.speak||[])].map(s=>normEn(s.en)));
      SENTENCE_BANKS[u.id]=SENTENCE_BANKS[u.id].filter(s=>s&&s.en&&!unitNorm.has(normEn(s.en)));
    }
  });
})();
function recentKey(unitId, mode){ return unitId+"|"+mode; }
function usedKey(unitId, mode){ return unitId+"|"+mode; }
function otherMode(mode){ return mode==="speak"?"listen":"speak"; }
function getRecentList(unitId, mode){
  if(!state.recentEn) state.recentEn={};
  const k=recentKey(unitId, mode);
  if(!Array.isArray(state.recentEn[k])) state.recentEn[k]=[];
  return state.recentEn[k];
}
function getUsedList(unitId, mode){
  if(!state.usedEn) state.usedEn={};
  const k=usedKey(unitId, mode);
  if(!Array.isArray(state.usedEn[k])) state.usedEn[k]=[];
  return state.usedEn[k];
}
function rememberSentences(unitId, mode, list){
  const recent=getRecentList(unitId, mode);
  const ens=(list||[]).map(s=>s&&s.en).filter(Boolean);
  const merged=[...ens, ...recent.filter(e=>!ens.includes(e))];
  state.recentEn[recentKey(unitId, mode)]=merged.slice(0, RECENT_CAP);
}
function archiveUsed(unitId, mode, list){
  const used=getUsedList(unitId, mode);
  const ens=(list||[]).map(s=>s&&s.en).filter(Boolean);
  const merged=[...ens, ...used.filter(e=>!ens.includes(e))];
  state.usedEn[usedKey(unitId, mode)]=merged.slice(0, 500);
}
function addToAvoid(avoid, en){
  if(!en) return;
  avoid.add(en); avoid.add(normEn(en));
}
function expandTplPool(tplList){
  const out=[];
  if(!tplList) return out;
  for(const t of tplList){
    const pools=t.pool&&t.pool.length?t.pool:[null];
    const nums=(t.en||"").includes("{n}")?NUMS:[null];
    for(const f of pools){
      for(const n of nums){
        let en=t.en, cn=t.cn;
        if(f){ en=en.split("{0}").join(f.en); cn=cn.split("{0c}").join(f.cn); }
        if(n){ en=en.split("{n}").join(n.en); cn=cn.split("{nc}").join(n.cn); }
        const focus=(t.focus||[]).map(x=> x==="{0}" && f ? f.en : x);
        out.push({en, cn, focus, scene:t.scene||rnd(SCENES)});
      }
    }
  }
  return out;
}
function getUnitPool(unitIdx, mode){
  const u=UNITS[unitIdx];
  const primary=((mode==="speak")?u.speak:u.listen).slice();
  const secondary=((mode==="speak")?u.listen:u.speak).slice();
  const seen=new Set(), out=[];
  const add=s=>{
    if(!s||!s.en) return;
    const n=normEn(s.en);
    if(!n||seen.has(s.en)||seen.has(n)) return;
    seen.add(s.en); seen.add(n); out.push(s);
  };
  primary.forEach(add);
  secondary.forEach(add);
  const bank=SENTENCE_BANKS[u.id];
  if(bank) bank.forEach(add);
  // 用户改过的英文要盖住句库原文，否则下一批又发回旧句子
  const uf=state.userEnFixes;
  if(uf && Object.keys(uf).length){
    for(let i=0;i<out.length;i++){
      const nx=uf[out[i].en];
      if(nx) out[i]=Object.assign({}, out[i], { en:nx });
    }
  }
  if(typeof TPL!=="undefined" && TPL[u.id]) expandTplPool(TPL[u.id]).forEach(add);
  return out;
}
/** Drop exact / near-duplicate English inside one batch (safety net). */
function dedupeSentenceList(list){
  if(!Array.isArray(list)||!list.length) return list||[];
  const seen=new Set(), out=[];
  list.forEach(s=>{
    if(!s||!s.en) return;
    const n=normEn(s.en);
    if(seen.has(s.en)||seen.has(n)) return;
    seen.add(s.en); if(n) seen.add(n);
    out.push(s);
  });
  // preserve any metadata flags attached to the array
  out._favMixed=list._favMixed; out._favCount=list._favCount;
  out._favAppended=list._favAppended; out._favReplaced=list._favReplaced;
  out._coreCount=list._coreCount; out._newCount=list._newCount; out._partialFresh=list._partialFresh;
  out._reused=list._reused; out._freshLeft=list._freshLeft; out._exhausted=list._exhausted;
  return out;
}
function freshPoolRemaining(unitIdx, mode, avoid){
  return getUnitPool(unitIdx, mode).filter(s=>s&&s.en&&!avoid.has(s.en)&&!avoid.has(normEn(s.en))).length;
}
function lastBatchBlockSet(unitId, mode){
  const block=new Set();
  if(!state.lastBatchEn) return block;
  (state.lastBatchEn[usedKey(unitId, mode)]||[]).forEach(en=>addToAvoid(block, en));
  return block;
}
function sentenceSubject(en){
  const m=(en||"").match(/^([A-Za-z][A-Za-z'\-]*(?:\s+[A-Za-z][A-Za-z'\-]*){0,2})\b/);
  return m?m[1].toLowerCase():"";
}
/** Strip subject + helper verbs so "They are in Shanghai" ~= "My manager is in Shanghai". */
function predicateKey(en){
  let n=normEn(en);
  n=n.replace(/^(i|you|we|they|he|she|it)\s+/,"");
  n=n.replace(/^(my|our|the|this|that|these|those)\s+[a-z0-9\-]+\s+/,"");
  n=n.replace(/^(am|is|are|was|were|have|has|had|do|does|did|will|can|should|must|could|may|might|would)\s+/,"");
  n=n.replace(/^(don t|doesn t|didn t|won t|can t)\s+/,"");
  n=n.replace(/^going to\s+/,"");
  return n.trim();
}

/** Previously avoided Listen+Speak together; Listen mode is gone — only track Speak. */
function buildAvoidSet(unitId, mode){
  const avoid=new Set();
  getRecentList(unitId, mode).forEach(en=>addToAvoid(avoid, en));
  getUsedList(unitId, mode).forEach(en=>addToAvoid(avoid, en));
  const existing=state.batches&&state.batches[unitId];
  if(existing){
    (existing[mode]||[]).forEach(s=>{ if(s&&s.en) addToAvoid(avoid, s.en); });
  }
  return avoid;
}
function isBlocked(en, avoid, seen){
  if(!en) return true;
  if(seen.has(en)||seen.has(normEn(en))) return true;
  if(avoid.has(en)||avoid.has(normEn(en))) return true;
  return false;
}
function lookupSentence(en){
  if(!en) return null;
  const c=state.customFavs&&state.customFavs[en];
  if(c && !isPlaceholderCn(c.cn)) return c;
  for(const u of UNITS){
    for(const m of ["listen","speak"]){
      const hit=u[m].find(s=>s.en===en);
      if(hit) return hit;
    }
  }
  if(typeof SENTENCE_BANKS==="object"){
    for(const id in SENTENCE_BANKS){
      const hit=(SENTENCE_BANKS[id]||[]).find(s=>s&&s.en===en);
      if(hit) return {en:hit.en, cn:hit.cn, focus:(hit.focus||[]).slice(), scene:hit.scene||"", note:hit.note||""};
    }
  }
  if(c) return c;
  return null;
}
function isPlaceholderCn(cn){
  const t=String(cn||"").trim();
  return !t || /中文暂缺|旧收藏/.test(t);
}
/** Chat 收藏常用的占位中文 —— 仍保留句子，但需要补真实翻译 */
function isWeakFavCn(cn){
  const t=String(cn||"").trim();
  return isPlaceholderCn(t) || /^(（|\()?(对话收藏|对话练习纠正)(）|\))?$/.test(t);
}
/** Gemini 偶发把英文提示词漏进翻译 —— 这类不能当练习中文 */
function isContaminatedCn(cn){
  const t=String(cn||"").trim();
  if(!t) return true;
  if(/\b(intermediate|supportive|keep it simple|output|chinese only|learner|english|prefer spoken|do not)\b/i.test(t)) return true;
  if(/But keep it|for intermediate|Chinese only|speaking practice/i.test(t)) return true;
  const latin=(t.match(/[A-Za-z]/g)||[]).length;
  const han=(t.match(/[\u4e00-\u9fff]/g)||[]).length;
  if(han<2) return true;
  if(latin>=4 && latin/(han+latin)>0.12) return true;
  return false;
}
/** 从模型脏输出里只抽出可用中文 */
function extractSpeakPromptCn(raw){
  let t=String(raw||"").replace(/\s+/g," ").trim();
  if(!t) return "";
  // 常见泄漏：英文说明 + 冒号/引号 + 中文
  const afterLabel=t.match(/(?:intermediate|Chinese|中文|翻译)\s*[:：]\s*["「『“']?([\u4e00-\u9fff].+)$/i);
  if(afterLabel) t=afterLabel[1];
  const quoted=t.match(/["「『“']([\u4e00-\u9fff][^"」』”']*)["」』”']/);
  if(quoted) t=quoted[1];
  const runs=t.match(/[\u4e00-\u9fff][\u4e00-\u9fff，。！？、；：…—\-——\s《》]*[\u4e00-\u9fff。！？]|[\u4e00-\u9fff]+/g);
  if(runs&&runs.length){
    t=runs.slice().sort((a,b)=>b.length-a.length)[0].trim();
  }
  t=t.replace(/^["「『“'']+|["」』”'']+$/g,"").replace(/^[:：)\s]+/,"").trim();
  if(isContaminatedCn(t)) return "";
  return t;
}
function displayFavNote(s){
  const n=(s&&s.note)||"";
  if(/来自对话|来自选中|来自 AI/.test(n)) return "";
  return n;
}
function normalizePracticeEn(en){
  let t=String(en||"").replace(/\s+/g," ").trim();
  if(!t) return "";
  t=t.charAt(0).toUpperCase()+t.slice(1);
  if(!/[.?!…]$/.test(t)) t+=".";
  return t;
}
function scrubFavMetaNote(note){
  const n=String(note||"").trim();
  if(!n || /来自对话|来自选中|来自 AI/.test(n)) return "";
  return n;
}
function applyFavCn(en, cn, opts){
  if(!en || !cn) return;
  if(!state.customFavs) state.customFavs={};
  let clean=String(cn||"").trim();
  if(isContaminatedCn(clean)) clean=extractSpeakPromptCn(cn);
  if(!clean || isContaminatedCn(clean)) return;
  const prev=state.customFavs[en]||{ en, focus:[], scene:"对话", note:"" };
  state.customFavs[en]=Object.assign({}, prev, {
    en,
    cn:clean,
    note:scrubFavMetaNote(prev.note),
    scene:prev.scene||"对话",
    cnPracticeOk: !!(opts&&opts.ok)
  });
  if(state.inFavReview && state._favCache){
    state._favCache=state._favCache.map(s=>s&&(s.en===en||normEn(s.en)===normEn(en))?Object.assign({},s,{cn:clean,note:scrubFavMetaNote(s.note)}):s);
  }
}
function syncFavCacheCn(en){
  if(!state.inFavReview) return;
  const s=resolveFavSentence(en);
  if(!s) return;
  if(state._favCache){
    state._favCache=state._favCache.map(x=>x&&(x.en===en||normEn(x.en)===normEn(en))?Object.assign({},x,{cn:s.cn,note:s.note}):x);
  }
}
function needsPracticeCnRefresh(en, cn){
  if(isWeakFavCn(cn) || isContaminatedCn(cn)) return true;
  const snap=state.customFavs&&state.customFavs[en];
  if(snap && snap.cnPracticeOk && !isContaminatedCn(snap.cn||cn)) return false;
  if(state.favModes&&state.favModes[en]==="chat") return true;
  return false;
}
let _favCnRefreshing=new Set();
async function translateForSpeakPrompt(en){
  const text=normalizePracticeEn(en)||String(en||"").trim();
  if(!text) return null;
  if(typeof geminiReady==="function" && geminiReady()){
    try{
      const model=await ensureModel();
      const sys="把英文译成一句自然、口语化的简体中文，供口译练习倒译回该英文。要像日常说话，不要书面腔（少用「该 / 进行 / 予以」）。只输出中文句子，不要英文，不要解释，不要引号。";
      const contents=[{ role:"user", parts:[{ text:"英文：\n"+text+"\n\n只输出中文：" }] }];
      const out=await callGeminiOnce(model, contents, sys, { temperature:0.2, maxOutputTokens:120 });
      const cleaned=extractSpeakPromptCn(out);
      if(cleaned) return cleaned;
    }catch(e){}
  }
  try{
    const t=await translateText(text);
    const cleaned=extractSpeakPromptCn(t)||(t&&!isContaminatedCn(t)?String(t).trim():"");
    if(cleaned) return cleaned;
  }catch(e){}
  return null;
}
async function ensureFavCn(en, forceRender, force){
  if(!en || _favCnRefreshing.has(en)) return;
  const snap=state.customFavs&&state.customFavs[en];
  const resolved=resolveFavSentence(en);
  const curCn=(snap&&snap.cn)||(resolved&&resolved.cn)||"";
  if(!force && !needsPracticeCnRefresh(en, curCn)) return curCn;
  _favCnRefreshing.add(en);
  try{
    const t=await translateForSpeakPrompt(en);
    if(t){
      applyFavCn(en, t, { ok:true });
      saveFavs();
      if(forceRender!==false){
        const cur=current();
        if(cur&&(cur.en===en||normEn(cur.en)===normEn(en))) renderCard();
        else if(state.inFavReview) renderRail();
      }
      return t;
    }
  }catch(e){}
  finally{ _favCnRefreshing.delete(en); }
  return curCn;
}
function refreshWeakFavCns(list){
  (list||[]).forEach(s=>{
    if(!s||!s.en) return;
    // Chat 旧机翻通常不能倒译；未标记 cnPracticeOk 的会重译一次
    if(needsPracticeCnRefresh(s.en, s.cn)) ensureFavCn(s.en, true, true);
  });
}
/** 只在句库里按英文找句子（刻意不含 customFavs，用于把快照对齐回句库）。 */
function bankSentenceByEn(en){
  if(!en) return null;
  const n=normEn(en);
  for(const u of UNITS){
    for(const m of ["listen","speak"]){
      const hit=(u[m]||[]).find(x=>x&&(x.en===en||normEn(x.en)===n));
      if(hit) return hit;
    }
  }
  if(typeof SENTENCE_BANKS==="object"){
    for(const id in SENTENCE_BANKS){
      const hit=(SENTENCE_BANKS[id]||[]).find(x=>x&&(x.en===en||normEn(x.en)===n));
      if(hit) return hit;
    }
  }
  return null;
}
function buildSentenceIndex(){
  const byExact=new Map(), byNorm=new Map();
  const add=(s, prefer)=>{
    if(!s||!s.en) return;
    const prev=byExact.get(s.en);
    if(!prev || prefer || (isPlaceholderCn(prev.cn) && !isPlaceholderCn(s.cn)) || (s.cnPracticeOk && s.cn)){
      byExact.set(s.en, s);
    }
    const n=normEn(s.en); if(!n) return;
    const prevN=byNorm.get(n);
    const better=!prevN || prefer || (isPlaceholderCn(prevN.cn) && !isPlaceholderCn(s.cn)) || (s.cnPracticeOk && s.cn);
    if(better) byNorm.set(n, s);
  };
  UNITS.forEach(u=>["listen","speak"].forEach(m=>(u[m]||[]).forEach(s=>add(s,false))));
  if(typeof SENTENCE_BANKS==="object") Object.keys(SENTENCE_BANKS).forEach(id=>(SENTENCE_BANKS[id]||[]).forEach(s=>add(s,false)));
  // 收藏里改过的中文必须覆盖题库原译
  Object.values(state.customFavs||{}).forEach(s=>add(s,true));
  return {byExact, byNorm};
}
function resolveFavSentence(en, index){
  if(!en) return null;
  // 优先收藏快照（含用户/AI 重译的中文）
  const c=state.customFavs&&(state.customFavs[en]||Object.values(state.customFavs).find(x=>x&&normEn(x.en)===normEn(en)));
  if(c && !isPlaceholderCn(c.cn)){
    return {en:c.en||en, cn:c.cn, focus:(c.focus||[]).slice(), scene:c.scene||"", note:scrubFavMetaNote(c.note||"")};
  }
  const idx=index||buildSentenceIndex();
  let s=idx.byExact.get(en)||lookupSentence(en);
  if(s && !isPlaceholderCn(s.cn)) return {en:s.en, cn:s.cn, focus:(s.focus||[]).slice(), scene:s.scene||"", note:scrubFavMetaNote(s.note||"")};
  const hit=idx.byNorm.get(normEn(en));
  if(hit && !isPlaceholderCn(hit.cn)) return {en:hit.en, cn:hit.cn, focus:(hit.focus||[]).slice(), scene:hit.scene||"", note:scrubFavMetaNote(hit.note||"")};
  return null;
}
/** Keep a full copy when starring so bank updates won't drop 错题集 sentences. */
function snapshotFav(s){
  if(!s||!s.en || isPlaceholderCn(s.cn)) return;
  if(!state.customFavs) state.customFavs={};
  const prev=state.customFavs[s.en];
  state.customFavs[s.en]={
    en:s.en,
    cn:s.cn||(prev&&prev.cn)||"",
    focus:(s.focus&&s.focus.length)?s.focus.slice():(prev&&prev.focus)||[],
    scene:s.scene||(prev&&prev.scene)||"",
    note:scrubFavMetaNote(s.note||(prev&&prev.note)||""),
    cnPracticeOk: !!(prev&&prev.cnPracticeOk)
  };
}
/** Drop duplicates (same English ignoring punctuation) and favorites with no usable Chinese. */
function cleanupFavs(){
  if(!state.favs||!state.favs.size) return {removed:0, deduped:0};
  const index=buildSentenceIndex();
  const groups=new Map(); // norm -> best entry
  let removed=0, deduped=0;
  [...state.favs].forEach(en=>{
    const resolved=resolveFavSentence(en, index);
    if(!resolved){
      state.favs.delete(en);
      if(state.favModes) delete state.favModes[en];
      clearFavNote(en); clearFavStats(en);
      if(state.customFavs) delete state.customFavs[en];
      removed++;
      return;
    }
    const n=normEn(resolved.en)||resolved.en.toLowerCase();
    const fails=favFailCount(en), gots=favGotCount(en);
    const addedAt=(state.favAddedAt&&state.favAddedAt[en])||0;
    const note=getFavNote(en), mode=state.favModes&&state.favModes[en];
    if(groups.has(n)){
      const g=groups.get(n);
      g.fails+=fails; g.gots+=gots;
      if(addedAt>g.addedAt) g.addedAt=addedAt;
      if(!g.note && note) g.note=note;
      if(!g.mode && mode) g.mode=mode;
      deduped++;
    } else {
      groups.set(n, {en:resolved.en, s:resolved, fails, gots, addedAt, note, mode});
    }
  });
  const nextFavs=new Set();
  const nextFails={}, nextGots={}, nextNotes={}, nextModes={}, nextAdded={}, nextCustom={};
  groups.forEach(g=>{
    nextFavs.add(g.en);
    if(g.fails) nextFails[g.en]=g.fails;
    if(g.gots) nextGots[g.en]=g.gots;
    if(g.addedAt) nextAdded[g.en]=g.addedAt;
    if(g.note) nextNotes[g.en]=g.note;
    if(g.mode) nextModes[g.en]=g.mode;
    nextCustom[g.en]={
      en:g.s.en, cn:g.s.cn, focus:(g.s.focus||[]).slice(), scene:g.s.scene||"", note:scrubFavMetaNote(g.s.note||""),
      cnPracticeOk: !!(state.customFavs&&state.customFavs[g.en]&&state.customFavs[g.en].cnPracticeOk)
    };
  });
  state.favs=nextFavs;
  state.favFails=nextFails;
  state.favGots=nextGots;
  state.favAddedAt=nextAdded;
  state.favNotes=nextNotes;
  state.favModes=nextModes;
  state.customFavs=nextCustom;
  // Remap per-bucket orders onto surviving sentences
  ensureFavOrders();
  const nextOrders=emptyFavOrders();
  ["listen","speak","chat"].forEach(k=>{
    const seen=new Set();
    (state.favOrderByMode[k]||[]).forEach(en=>{
      const s=resolveFavSentence(en);
      if(!s||seen.has(s.en)||state.favModes[s.en]!==k) return;
      seen.add(s.en); nextOrders[k].push(s.en);
    });
    nextFavs.forEach(en=>{
      if(state.favModes[en]!==k||seen.has(en)) return;
      seen.add(en); nextOrders[k].push(en);
    });
  });
  state.favOrderByMode=nextOrders;
  return {removed, deduped};
}
/** Favorites tagged listen|speak when starred — only mix into the same mode. */
function isModeFavorite(en, mode){
  if(!en||!state.favs||!state.favs.size) return false;
  if(state.favs.has(en) && state.favModes&&state.favModes[en]===mode) return true;
  const n=normEn(en);
  if(!n) return false;
  for(const f of state.favs){
    if(state.favModes&&state.favModes[f]===mode && normEn(f)===n) return true;
  }
  return false;
}
function favCandidatesForMode(mode){
  const out=[], seen=new Set();
  const add=s=>{
    if(!s||!s.en) return;
    const n=normEn(s.en);
    if(seen.has(s.en)||(n&&seen.has(n))) return;
    seen.add(s.en); if(n) seen.add(n);
    out.push(s);
  };
  // 以错题集为准（不要依赖 UNITS 小数组），lookup 失败时仍用原文兜底
  if(!state.favs||!state.favs.size) return out;
  state.favs.forEach(en=>{
    if((state.favModes&&state.favModes[en])!==mode) return;
    const s=lookupSentence(en) || resolveFavSentence(en);
    if(!s||!s.en) return;
    if(isPlaceholderCn(s.cn) || isWeakFavCn(s.cn)) return; // 口译需要可用中文
    add({
      en:s.en,
      cn:s.cn||"",
      focus:(s.focus||[]).slice(),
      scene:s.scene||"",
      note:s.note||""
    });
  });
  return out;
}
const FAV_MIX_RECENT_CAP = 500;   // 存档上限，只防无限增长；真正的冷却窗口见下
/**
 * 混入错题的"冷却窗口"：最近混过的多少句算 stale。
 * 必须**略小于**候选池 —— 等于或大于池子会让 fresh 清空、全部落进 stale，
 * 于是又退化成"永远只挑错误次数最高的那几句"，低频错题一辈子轮不到。
 * 0.9 是实测最优点：覆盖率接近上限，同时高频错题仍有约 2 倍练习量。
 */
function favMixRecentWindow(poolSize){
  return Math.max(20, Math.floor((poolSize||0) * 0.9));
}
function rememberMixedFavs(ens){
  if(!state.recentMixedEn) state.recentMixedEn=[];
  const add=(state.recentMixedEn||[]).slice();
  (ens||[]).forEach(en=>{
    if(!en) return;
    const n=normEn(en);
    for(let i=add.length-1;i>=0;i--){
      if(add[i]===en || normEn(add[i])===n) add.splice(i,1);
    }
    add.unshift(en);
  });
  state.recentMixedEn=add.slice(0, FAV_MIX_RECENT_CAP);
}
/** Mix 3–4 same-mode 错题 into the batch. Prefer ones not recently mixed. */
/**
 * 某个单元自己的句子集合（含 normEn 形式），用来把错题限制在本单元内。
 * 错题集是全局的：单元 10 练现在完成时，混进单元 1 的 be 句会让人莫名其妙
 * （提示还会显示成另一个语法点的）。所以只混本单元的错题。
 */
const _unitEnCache = new Map();
function unitEnSet(u, mode){
  if(!u || !u.id) return null;
  const key = u.id + "|" + mode;
  if(_unitEnCache.has(key)) return _unitEnCache.get(key);
  const idx = UNITS.findIndex(x => x && x.id === u.id);
  if(idx < 0) return null;
  const set = new Set();
  getUnitPool(idx, mode).forEach(sn => {
    if(!sn || !sn.en) return;
    set.add(sn.en);
    const n = normEn(sn.en);
    if(n) set.add(n);
  });
  _unitEnCache.set(key, set);
  return set;
}
function mixFavoritesIntoBatch(all, mode, u, opts){
  // An empty core batch means there are no fresh sentences. Keep it empty so
  // the caller can switch to the normal old-sentence review path.
  if(!all.length) return { mixed:0, appended:0, replaced:0 };
  const preserveExisting=!!(opts&&opts.preserveExisting);
  const maxCount=Math.max(all.length, +(opts&&opts.maxCount)||all.length);
  const unitSet=unitEnSet(u, mode);
  // 只保留属于本单元的错题；unitSet 为空（拿不到单元）时退回原行为，不至于一句都混不进来
  const pool=favCandidatesForMode(mode).filter(s=>{
    if(!unitSet) return true;
    return !!(s && s.en && (unitSet.has(s.en) || unitSet.has(normEn(s.en))));
  });
  const cands=pool.filter(s=>{
    if(!s||!s.en) return false;
    const n=normEn(s.en);
    return !all.some(x=>x&&(x.en===s.en||normEn(x.en)===n));
  });
  if(!cands.length) return { mixed:0, appended:0, replaced:0 };
  // 冷却窗口按本模式的错题总数缩放；只取名单前 N 条，不截断存档本身，
  // 免得错题少的模式(如 listen)把错题多的模式(speak)的轮换记录冲掉。
  const win=favMixRecentWindow(pool.length);
  const recent=new Set();
  (state.recentMixedEn||[]).slice(0, win).forEach(en=>{
    if(!en) return;
    recent.add(en);
    const n=normEn(en); if(n) recent.add(n);
  });
  const fresh=[], stale=[];
  cands.forEach(s=>{
    if(recent.has(s.en)||recent.has(normEn(s.en))) stale.push(s);
    else fresh.push(s);
  });
  // 久未出现的优先；同档内错误次数高的略优先，再随机
  const rank=list=>{
    shuffleInPlace(list);
    list.sort((a,b)=>{
      const df=favFailCount(b.en)-favFailCount(a.en);
      if(Math.abs(df)>=2) return df;
      return Math.random()-0.5;
    });
    return list;
  };
  rank(fresh); rank(stale);
  const ordered=fresh.concat(stale);
  const already=all.filter(s=>s&&isModeFavorite(s.en, mode)).length;
  const target=3+Math.floor(Math.random()*2); // 3 or 4
  const n=Math.min(ordered.length, Math.max(0, target-already));
  let mixed=0, appended=0, replaced=0;
  const mixedEns=[];
  for(let i=0;i<n;i++){
    const s=ordered[i];
    // When only a few fresh/recycled sentences remain, keep every one of them
    // and use empty batch slots for favorites instead of replacing the core.
    if(preserveExisting){
      if(all.length>=maxCount) break;
      all.push({en:s.en,cn:s.cn,focus:s.focus,scene:s.scene||rnd(SCENES),note:s.note||u.cnDesc});
      mixedEns.push(s.en); mixed++; appended++; continue;
    }
    let slot=-1;
    for(let tries=0; tries<all.length; tries++){
      const j=Math.floor(Math.random()*all.length);
      if(!isModeFavorite(all[j]&&all[j].en, mode)){ slot=j; break; }
    }
    if(slot<0) slot=Math.floor(Math.random()*all.length);
    all[slot]={en:s.en,cn:s.cn,focus:s.focus,scene:s.scene||rnd(SCENES),note:s.note||u.cnDesc};
    mixedEns.push(s.en);
    mixed++; replaced++;
  }
  if(mixedEns.length) rememberMixedFavs(mixedEns);
  return { mixed, appended, replaced };
}
function migrateFavModes(){
  if(!state.favModes) state.favModes={};
  state.favs.forEach(en=>{
    let m=state.favModes[en];
    if(m==="listen"||m==="speak"||m==="chat") return;
    const c=state.customFavs&&state.customFavs[en];
    if(c&&(c.scene==="对话"||/对话/.test(c.cn||"")||/对话/.test(c.note||""))){
      state.favModes[en]="chat"; return;
    }
    let inListen=false, inSpeak=false;
    UNITS.forEach(u=>{
      if(u.listen.some(s=>s.en===en)) inListen=true;
      if(u.speak.some(s=>s.en===en)) inSpeak=true;
    });
    if(inListen&&!inSpeak) state.favModes[en]="speak"; // 旧 LISTEN 收藏并入口译
    else if(inSpeak&&!inListen) state.favModes[en]="speak";
    else state.favModes[en]="speak";
  });
}
/** Remove Listen mode / LISTEN 错题集 from saved state (one-time migration). */
function migrateAwayFromListen(){
  if(state.mode==="listen") state.mode="speak";
  if(state.favReviewMode==="listen") state.favReviewMode="speak";
  if(state.favModes){
    Object.keys(state.favModes).forEach(en=>{
      if(state.favModes[en]==="listen") state.favModes[en]="speak";
    });
  }
  ensureFavOrders();
  const L=state.favOrderByMode.listen||[];
  const S=state.favOrderByMode.speak||(state.favOrderByMode.speak=[]);
  L.forEach(en=>{
    if(!en) return;
    if(!S.some(x=>x===en||normEn(x)===normEn(en))) S.push(en);
  });
  state.favOrderByMode.listen=[];
  if(state.pos){
    if(state.pos["fav|speak"]==null && typeof state.pos["fav|listen"]==="number")
      state.pos["fav|speak"]=state.pos["fav|listen"];
  }
  if(state.posFavEn){
    if(!state.posFavEn["fav|speak"] && state.posFavEn["fav|listen"])
      state.posFavEn["fav|speak"]=state.posFavEn["fav|listen"];
  }
}
/** Remap favorited / custom keys when bank EN is corrected. */
function migrateBankEnFixes(){
  const map=BANK_EN_FIXES||{};
  const keys=Object.keys(map);
  if(!keys.length) return;
  const remapObj=(obj)=>{
    if(!obj||typeof obj!=="object") return;
    keys.forEach(old=>{
      const neu=map[old];
      if(!neu||old===neu||!(old in obj)) return;
      if(!(neu in obj)) obj[neu]=obj[old];
      else if(obj[neu] && typeof obj[neu]==="object" && obj[old] && typeof obj[old]==="object"){
        obj[neu]=Object.assign({}, obj[old], obj[neu]);
      }
      delete obj[old];
    });
  };
  const remapArr=(arr)=>{
    if(!Array.isArray(arr)) return arr;
    return arr.map(en=>map[en]||en).filter((en,i,a)=>a.indexOf(en)===i);
  };
  if(state.favs&&state.favs.size){
    const next=new Set();
    state.favs.forEach(en=>next.add(map[en]||en));
    state.favs=next;
  }
  remapObj(state.favModes);
  remapObj(state.favNotes);
  remapObj(state.favFails);
  remapObj(state.favGots);
  remapObj(state.favAddedAt);
  remapObj(state.customFavs);
  if(state.customFavs){
    keys.forEach(old=>{
      const neu=map[old];
      const snap=state.customFavs[neu];
      if(!snap) return;
      snap.en=neu;
      // 改正英文时同步用句库中文盖掉旧译（如「已导出」→「可以导出了」）
      let hit=null;
      if(typeof SENTENCE_BANKS==="object"){
        for(const id in SENTENCE_BANKS){
          hit=(SENTENCE_BANKS[id]||[]).find(s=>s&&s.en===neu);
          if(hit) break;
        }
      }
      if(hit&&hit.cn&&!isPlaceholderCn(hit.cn)) snap.cn=hit.cn;
    });
  }
  if(state.favOrderByMode){
    ["listen","speak","chat"].forEach(k=>{
      state.favOrderByMode[k]=remapArr(state.favOrderByMode[k]||[]);
    });
  }
}
/**
 * 练习记录（哪些句子已经发过）也要跟着改正后的英文走，否则修过的句子会被当成"没练过"重新发一遍。
 * 必须在 usedEn / recentEn / lastBatchEn 从存档读出来之后再调用 —— migrateBankEnFixes() 跑得太早。
 */
function migratePracticeHistoryEn(){
  const map=BANK_EN_FIXES||{};
  if(!Object.keys(map).length) return;
  [state.usedEn, state.recentEn, state.lastBatchEn].forEach(obj=>{
    if(!obj||typeof obj!=="object") return;
    for(const k in obj){
      if(!Array.isArray(obj[k])) continue;
      obj[k]=obj[k].map(en=>map[en]||en).filter((en,i,a)=>a.indexOf(en)===i);
    }
  });
}
function favCount(mode){
  let n=0;
  state.favs.forEach(en=>{ if(state.favModes&&state.favModes[en]===mode) n++; });
  return n;
}
function removeFromFavOrders(en){
  ensureFavOrders();
  const n=normEn(en);
  ["listen","speak","chat"].forEach(k=>{
    state.favOrderByMode[k]=(state.favOrderByMode[k]||[]).filter(x=>x!==en && normEn(x)!==n);
  });
}
function appendFavOrder(mode, en){
  ensureFavOrders();
  const arr=state.favOrderByMode[mode]||(state.favOrderByMode[mode]=[]);
  if(!arr.some(x=>x===en||normEn(x)===normEn(en))) arr.push(en);
}
/** Add / move a sentence into one of the 3 错题集. Returns "added"|"moved"|"exists". */
function upsertFav(en, mode, meta){
  if(!en) return "";
  const bucket=(mode==="chat")?"chat":"speak";
  const had=state.favs.has(en);
  const prev=state.favModes&&state.favModes[en];
  state.favs.add(en);
  if(!state.favModes) state.favModes={};
  state.favModes[en]=bucket;
  if(!state.favFails) state.favFails={};
  if(!state.favFails[en]) state.favFails[en]=1;
  if(!had) touchFavAdded(en);
  else if(prev!==bucket) touchFavAdded(en); // 换到新错题集时当作新收藏，方便「最新」排序
  const cn=(meta&&meta.cn)||"";
  const s={
    en,
    cn: cn || (state.customFavs&&state.customFavs[en]&&state.customFavs[en].cn) || "（对话收藏）",
    focus:(meta&&meta.focus)||[],
    scene:(meta&&meta.scene)||(bucket==="chat"?"对话":""),
    note:(meta&&meta.note)||(bucket==="chat"?"来自对话选中收藏":"")
  };
  snapshotFav(s);
  removeFromFavOrders(en);
  appendFavOrder(bucket, en);
  if(had && prev===bucket) return "exists";
  if(had) return "moved";
  return "added";
}
function removeFav(en){
  if(!en||!state.favs.has(en)) return;
  state.favs.delete(en);
  if(state.favModes) delete state.favModes[en];
  clearFavNote(en);
  clearFavStats(en);
  removeFromFavOrders(en);
}
function genModeSentences(unitIdx, count, mode, extraAvoidList, opts){
  const allowRecycle=!!(opts&&opts.allowRecycle);
  const u=UNITS[unitIdx], gen=GEN[u.id];
  const avoid=buildAvoidSet(u.id, mode);
  // Also avoid sentences already chosen for the other mode in the same genBatch
  (extraAvoidList||[]).forEach(s=>{
    const en=s&&s.en; if(!en) return;
    addToAvoid(avoid, en);
  });
  const seen=new Set();
  const all=[];
  const subjCount=new Map();
  // Only diversify within THIS batch — do not block whole history by similar endings
  const predSeen=new Set();
  (extraAvoidList||[]).forEach(s=>{ const pk=predicateKey(s&&s.en); if(pk) predSeen.add(pk); });

  // Speak uses Speak bank first; Listen uses Listen bank first (same difficulty/topics, different sentences)
  const primary=((mode==="speak")?u.speak:u.listen).slice();
  const secondary=((mode==="speak")?u.listen:u.speak).slice();
  const unitPool=getUnitPool(unitIdx, mode);

  const take=(s, softDiversify)=>{
    if(!s||!s.en) return false;
    if(isBlocked(s.en, avoid, seen)) return false;
    const pk=predicateKey(s.en);
    if(pk && predSeen.has(pk)) return false;
    const subj=sentenceSubject(s.en);
    if(softDiversify && subj && (subjCount.get(subj)||0)>=2) return false;
    seen.add(s.en); seen.add(normEn(s.en));
    if(pk) predSeen.add(pk);
    if(subj) subjCount.set(subj,(subjCount.get(subj)||0)+1);
    all.push({en:s.en, cn:s.cn, focus:s.focus, scene:s.scene||rnd(SCENES), note:s.note||u.cnDesc});
    return true;
  };

  // Prefer scanning the full unique pool (deterministic freshness) over random gen()
  // Skip same-mode 错题 first — they'll be mixed back in as exactly 3–4 later
  const fresh=unitPool.filter(s=>s&&s.en&&!avoid.has(s.en)&&!avoid.has(normEn(s.en)));
  const freshNonFav=fresh.filter(s=>!isModeFavorite(s.en, mode));
  const freshFavOnly=fresh.filter(s=>isModeFavorite(s.en, mode));
  shuffleInPlace(freshNonFav);
  for(const s of freshNonFav){ if(all.length>=count) break; take(s, true); }
  if(all.length<count){
    for(const s of freshNonFav){ if(all.length>=count) break; take(s, false); }
  }

  // Soft fill from mode banks / generator only for never-used exact sentences (still skip favs)
  if(all.length<count){
    shuffleInPlace(primary);
    for(const s of primary){
      if(all.length>=count) break;
      if(isModeFavorite(s.en, mode)) continue;
      take(s, false);
    }
  }
  if(gen && all.length<count){
    let guard=0;
    while(all.length<count && guard++<6000){
      const s=gen();
      if(s&&isModeFavorite(s.en, mode)) continue;
      take(s, false);
    }
  }
  if(all.length<count){
    shuffleInPlace(secondary);
    for(const s of secondary){
      if(all.length>=count) break;
      if(isModeFavorite(s.en, mode)) continue;
      take(s, false);
    }
  }
  // Only if still short: allow unused fav sentences (unit nearly exhausted of non-favs)
  if(all.length<count){
    shuffleInPlace(freshFavOnly);
    for(const s of freshFavOnly){ if(all.length>=count) break; take(s, false); }
  }

  // Recycle ONLY when caller asks (pool exhausted) — never pad a fresh batch with old sentences
  let reused=0;
  if(allowRecycle && all.length<count){
    const lastBlock=lastBatchBlockSet(u.id, mode);
    // Also block the batch before last if we have it stored in recent
    getRecentList(u.id, mode).slice(0, BATCH_SIZE).forEach(en=>addToAvoid(lastBlock, en));
    const old=getUsedList(u.id, mode).slice().reverse(); // oldest first
    for(const en of old){
      if(all.length>=count) break;
      if(!en||seen.has(en)||seen.has(normEn(en))) continue;
      if(lastBlock.has(en)||lastBlock.has(normEn(en))) continue;
      const hit=unitPool.find(s=>s&&(s.en===en||normEn(s.en)===normEn(en)))||lookupSentence(en);
      if(!hit) continue;
      const pk=predicateKey(hit.en);
      if(pk && predSeen.has(pk)) continue;
      seen.add(hit.en); seen.add(normEn(hit.en));
      if(pk) predSeen.add(pk);
      all.push({en:hit.en, cn:hit.cn, focus:hit.focus||[], scene:hit.scene||rnd(SCENES), note:hit.note||u.cnDesc});
      reused++;
    }
  }

  const coreCount=all.length;
  const partialCore=coreCount>0 && coreCount<count;
  const favMix=mixFavoritesIntoBatch(all, mode, u, {preserveExisting:partialCore, maxCount:count});
  all._favMixed=favMix.mixed;
  all._favCount=all.filter(s=>s&&isModeFavorite(s.en, mode)).length;
  all._favAppended=favMix.appended;
  all._favReplaced=favMix.replaced;
  all._coreCount=coreCount;
  all._partialFresh=!allowRecycle && partialCore;
  const freshConsumed=allowRecycle?0:Math.max(0, coreCount-favMix.replaced);
  all._newCount=allowRecycle?0:Math.max(0, all.length-all._favCount);
  all._reused=allowRecycle?Math.max(0, all.length-all._favCount):0;
  all._freshLeft=Math.max(0, freshPoolRemaining(unitIdx, mode, avoid)-freshConsumed);
  all._exhausted=!allowRecycle && all.length===0;
  return dedupeSentenceList(all);
}
function unwrapBatch(list){
  // genModeSentences may attach ._reused; normalize callers
  if(Array.isArray(list)) return list;
  return [];
}
function showBatchReuseTip(reused, extra){
  const el=$("batchTip"); if(!el) return;
  if(!reused && !extra){ el.style.display="none"; el.textContent=""; return; }
  el.style.display="block";
  if(extra){ el.innerHTML=extra; }
  else {
    el.innerHTML=`本批有 <b>${reused}</b> 句是复习旧题（这一单元的新句已经练完）。上一批的句子不会紧挨着再出现。<br><span style="opacity:.85">同模式错题集每批会混入 3–4 句。</span>`;
  }
  clearTimeout(showBatchReuseTip._t);
  showBatchReuseTip._t=setTimeout(()=>{ if(el) el.style.display="none"; }, 10000);
}
function migrateBatchShape(b, unitId){
  if(!b) return b;
  if(b.listenNo==null){
    const shared=b.no||1;
    b.listenNo=shared;
    b.speakNo=(batchDoneSize(unitId+"|speak")>0 || (state.doneByKey[unitId+"|speak"]||0)>0) ? shared : 1;
  }
  if(!Array.isArray(b.listen)) b.listen=[];
  if(!Array.isArray(b.speak)) b.speak=unwrapBatch(genModeSentences(UNITS.findIndex(u=>u.id===unitId), BATCH_SIZE, "speak"));
  return b;
}
function genBatch(unitIdx){
  // Speak-only practice; listen[] kept empty for older saved shape
  const speak=genModeSentences(unitIdx, BATCH_SIZE, "speak", null, {allowRecycle:false});
  const id=UNITS[unitIdx].id;
  rememberSentences(id, "speak", speak);
  archiveUsed(id, "speak", speak);
  return { listenNo:1, speakNo:1, listen:[], speak };
}

/* ============================================================
   STATE
   ============================================================ */
const state = {
  unit:0, idx:0, mode:"speak",
  revealed:false, checked:false, pendingSpeech:null,
  order:[], shuffle:false,               // play order within a batch
  batches:{},                            // unitId -> {no, listen[], speak[]}  (current batch)
  undoBatch:{},                          // unitId -> snapshot for undoing a 换一批
  batchDone:{},                          // "unitId|mode" -> Set of completed indices in the current batch
  learnedByUnit:{},                      // unitId -> total practiced (for bottom stats)
  doneByKey:{},                          // "unitId|mode" -> completed count
  inFavReview:false, favReviewMode:"speak", // which 错题集: chat|speak
  favs:new Set(), favModes:{}, favNotes:{}, favFails:{}, favGots:{}, favAddedAt:{}, _favCache:[],
  favOrderByMode:{ listen:[], speak:[], chat:[] }, // listen kept empty (migrated → speak)
  posFavEn:{},                           // "fav|chat|speak" -> current sentence en
  customFavs:{},                         // en -> sentence object for favorites not in UNITS (e.g. from Chat)
  pos:{},                                // "unitId|mode" or "fav|review" -> sentence index
  chats:{},                              // unitId -> chat message history
  chat:{ unitId:null, history:[], busy:false },      // conversation state (active unit)
  settings:{ accent:"en-US", voiceURI:"", rate:1.0, autoplay:true, showcn:false, silenceMs:5000, geminiKey:"", geminiModel:"gemini-3.5-flash", jsonbinKey:"", favSort:"fails", favAudio:false, favLoop:0, favShowCn:false, favShowNote:false, favSyncId:"", favSyncAuto:true, favListenPublicUrl:"https://ZoeZeng1992.github.io/speak-right-listen", ghToken:"", ghRepo:"ZoeZeng1992/speak-right-listen", ghPath:"fav-listen-data.json", progressBinId:"" },
  stats:{ attempt:0, good:0, learned:0, batches:0, chatReplies:0 },
  chatByUnit:{},                         // unitId -> number of user chat replies
  recentEn:{},                           // unitId|mode -> [en, ...] recently used
  usedEn:{},                             // unitId|mode -> [en, ...] all batched sentences
  lastBatchEn:{},                        // unitId|mode -> [en] previous batch (no immediate repeat)
  recentMixedEn:[],                      // 最近混入练习的错题，避免总抽到同一批
  userEnFixes:{}                         // 用户在收藏编辑里改过的英文：旧写法 -> 新写法
};

/* ---- Per-context position (unit×mode and favorites) ---- */
function favBucket(){
  const m=state.favReviewMode;
  return m==="chat"?"chat":"speak";
}
/** Which 错题集 a new favorite should enter — always by current practice source. */
function sourceFavBucket(){
  if(state.inFavReview) return favBucket();
  if(state.mode==="chat") return "chat";
  return "speak";
}
function favModeLabel(m){
  return m==="chat"?"CHAT":"SPEAK";
}
function isFavInBucket(en, mode){
  if(!en||!state.favs||!state.favs.has(en)) return false;
  return (state.favModes&&state.favModes[en])===mode;
}
function emptyFavOrders(){ return { listen:[], speak:[], chat:[] }; }
function ensureFavOrders(){
  if(!state.favOrderByMode || typeof state.favOrderByMode!=="object") state.favOrderByMode=emptyFavOrders();
  ["listen","speak","chat"].forEach(k=>{
    if(!Array.isArray(state.favOrderByMode[k])) state.favOrderByMode[k]=[];
  });
}
function progressKey(){
  // 三个错题集各自独立进度
  if(state.inFavReview) return "fav|"+favBucket();
  return UNITS[state.unit].id+"|"+state.mode;
}
function rememberPos(){
  if(state.mode==="chat") return;
  const key=progressKey();
  state.pos[key]=state.idx;
  if(state.inFavReview){
    if(!state.posFavEn) state.posFavEn={};
    const s=current();
    if(s&&s.en) state.posFavEn[key]=s.en;
  }
}
function recallPos(){
  if(state.mode==="chat"){ state.idx=0; return; }
  const key=progressKey();
  if(state.inFavReview && state.posFavEn && state.posFavEn[key]){
    const want=state.posFavEn[key];
    const list=curList();
    const i=list.findIndex(s=>s&&(s.en===want||normEn(s.en)===normEn(want)));
    if(i>=0){ state.idx=i; return; }
  }
  const v=state.pos[key];
  state.idx=(typeof v==="number" && v>=0)?v:0;
}
function clampIdx(){
  const n=state.order.length;
  if(!n){ state.idx=0; return; }
  if(state.idx>=n) state.idx=n-1;
  if(state.idx<0) state.idx=0;
}
function stashChat(){
  if(state.chat.unitId && state.chat.history && state.chat.history.length)
    state.chats[state.chat.unitId]=state.chat.history.slice();
}
function loadChatForUnit(unitId){
  const hist=state.chats[unitId];
  if(hist && hist.length){
    state.chat={ unitId, history:hist.slice(), busy:false };
    return true;
  }
  return false;
}

/* ---- Persistence: favorites, progress, stats, settings all survive a refresh ---- */
function saveProgress(){
  try{
    rememberPos();
    stashChat();
    const bd={}; for(const k in state.batchDone) bd[k]=[...state.batchDone[k]];
    localStorage.setItem("sr_state", JSON.stringify({
      v:4, bankVer:BANK_VER, favs:[...state.favs], favModes:state.favModes||{}, favNotes:state.favNotes||{}, favFails:state.favFails||{}, favGots:state.favGots||{}, favAddedAt:state.favAddedAt||{}, stats:state.stats, settings:state.settings,
      unit:state.unit, mode:state.mode, inFavReview:!!state.inFavReview, favReviewMode:state.favReviewMode||"listen",
      learnedByUnit:state.learnedByUnit, doneByKey:state.doneByKey,
      batches:state.batches, idx:state.idx, pos:state.pos, posFavEn:state.posFavEn||{}, favOrderByMode:state.favOrderByMode||emptyFavOrders(), batchDone:bd,
      undoBatch:state.undoBatch, customFavs:state.customFavs, chats:state.chats,
      chatByUnit:state.chatByUnit, recentEn:state.recentEn, usedEn:state.usedEn, lastBatchEn:state.lastBatchEn,
      recentMixedEn:state.recentMixedEn||[], userEnFixes:state.userEnFixes||{}
    }));
  }catch(e){}
}
function saveFavs(){
  saveProgress();
  scheduleFavListenSync();
}

const JSONBIN_API="https://api.jsonbin.io/v3/b";
const JSONBLOB_API="https://jsonblob.com/api/jsonBlob";
let _favSyncTimer=null;
let _favSyncBusy=false;
function sleep(ms){ return new Promise(r=>setTimeout(r, ms)); }
function parseFavSyncId(raw){
  const s=String(raw||"").trim();
  if(!s) return { provider:"", id:"" };
  if(/^bin:/i.test(s)) return { provider:"jsonbin", id:s.slice(4).trim() };
  if(/^blob:/i.test(s)) return { provider:"jsonblob", id:s.slice(5).trim() };
  if(/^[a-f0-9]{24}$/i.test(s)) return { provider:"jsonbin", id:s };
  if(/^[0-9a-f]{8}-[0-9a-f-]{27,}$/i.test(s) || s.includes("-")) return { provider:"jsonblob", id:s };
  return { provider:"jsonblob", id:s };
}
function formatFavSyncId(provider, id){
  if(!id) return "";
  return provider==="jsonbin" ? ("bin:"+id) : id;
}
async function fetchWithRetry(url, init, tries){
  let lastErr=null;
  const n=tries||4;
  for(let i=0;i<n;i++){
    try{
      const res=await fetch(url, init);
      if(res.status===429 || res.status===503){
        lastErr=new Error("服务限流 "+res.status);
        await sleep(2500*(i+1));
        continue;
      }
      return res;
    }catch(e){
      lastErr=e;
      await sleep(1200*(i+1));
    }
  }
  throw lastErr||new Error("网络失败");
}
async function pushLocalFavFile(pack){
  try{
    const res=await fetch("/api/fav-sync", {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify(pack)
    });
    return !!res.ok;
  }catch(e){ return false; }
}

/* ---- 本机声音 A：自动检查，手动增量生成，确认后才安全清理 ---- */
let _favAudioStatusData=null;
let _favAudioPollTimer=null;
let _favAudioCheckTimer=null;
function formatFavAudioBytes(bytes){
  const n=+(bytes||0)||0;
  if(n<1024) return n+" B";
  if(n<1024*1024) return (n/1024).toFixed(n<10*1024?1:0)+" KB";
  return (n/1024/1024).toFixed(n<10*1024*1024?1:0)+" MB";
}
function setFavAudioBusy(busy){
  ["favAudioGenerateBtn","favAudioCheckBtn","favAudioCleanupBtn"].forEach(id=>{
    const el=$(id); if(el) el.disabled=!!busy;
  });
}
function renderFavAudioStatus(data, message, isErr){
  const el=$("favAudioStatus"), gen=$("favAudioGenerateBtn"), clean=$("favAudioCleanupBtn");
  if(!el) return;
  if(!data || !data.ok){
    el.textContent=message||((data&&data.error)||"本机音频检查失败");
    el.style.color=isErr?"var(--bad)":"var(--muted)";
    if(gen) gen.textContent="检查声音 A";
    return;
  }
  _favAudioStatusData=data;
  const ready=+(data.ready||0), total=+(data.total||0), missing=+(data.missing||0), orphaned=+(data.orphaned||0);
  const parts=[`声音 A：已生成 ${ready}/${total}`];
  parts.push(missing?`缺少 ${missing}`:"当前全部就绪");
  if(orphaned) parts.push(`待清理 ${orphaned}（${formatFavAudioBytes(data.orphanBytes)}）`);
  parts.push(`线上音频 ${formatFavAudioBytes(data.audioBytes)}`);
  parts.push(`整站预计 ${formatFavAudioBytes(data.projectedBytes||data.siteBytes)}`);
  if(data.warnings&&data.warnings.length) parts.push(data.warnings.join("；"));
  el.textContent=message ? (message+" · "+parts.join(" · ")) : parts.join(" · ");
  el.style.color=(data.capacityBlocked||isErr)?"var(--bad)":"var(--muted)";
  if(gen){
    gen.textContent=missing?`生成缺少音频（${missing}）`:"声音 A 已齐全";
    gen.disabled=!missing||!!data.capacityBlocked;
  }
  if(clean){
    clean.style.display=orphaned?"inline-flex":"none";
    clean.textContent=orphaned?`预览待清理（${orphaned}）`:"预览待清理";
  }
}
async function checkFavAudioStatus(opts){
  if(!IS_LOCAL) return null;          // 只有本机 serve.py 才有这个接口
  const quiet=!!(opts&&opts.quiet);
  if(!quiet) renderFavAudioStatus(_favAudioStatusData,"正在重新检查…",false);
  try{
    const res=await fetch("/api/fav-audio/status?t="+Date.now(), { cache:"no-store" });
    const data=await res.json();
    if(!res.ok||!data.ok) throw new Error(data.error||("检查失败 "+res.status));
    renderFavAudioStatus(data,"",false);
    return data;
  }catch(e){
    renderFavAudioStatus(null,"音频检查不可用："+((e&&e.message)||e)+"。请用“打开-Speak-Right.command”启动。",true);
    return null;
  }
}
function scheduleFavAudioCheck(){
  clearTimeout(_favAudioCheckTimer);
  _favAudioCheckTimer=setTimeout(()=>checkFavAudioStatus({quiet:true}),1200);
}
function renderFavAudioJob(job){
  const el=$("favAudioJobMsg"); if(!el) return;
  const running=job&&job.state==="running";
  setFavAudioBusy(running);
  if(running){
    const done=+(job.done||0), total=+(job.total||0);
    const count=total?` ${done}/${total}`:"";
    const current=job.current?` · ${String(job.current).slice(0,70)}`:"";
    el.textContent=(job.stage||"正在处理")+count+current;
    el.style.color="var(--accent)";
  }else if(job&&job.state==="error"){
    el.textContent="音频任务失败："+(job.error||"未知错误");
    el.style.color="var(--bad)";
  }else if(job&&job.state==="complete"){
    const r=job.result||{};
    if(job.action==="cleanup") el.textContent=`已安全清理 ${+(r.removed||0)} 个音频并发布；本机回收备份已保留。`;
    else el.textContent=`声音 A 已完成：新增 ${+(r.generated||0)} 个音频并发布到手机网页。`;
    el.style.color="var(--good)";
  }else{
    el.textContent="";
  }
}
async function pollFavAudioJob(){
  clearTimeout(_favAudioPollTimer);
  try{
    const res=await fetch("/api/fav-audio/job?t="+Date.now(), { cache:"no-store" });
    const job=await res.json();
    renderFavAudioJob(job);
    if(job.state==="running" || job.processRunning){
      _favAudioPollTimer=setTimeout(pollFavAudioJob,1500);
    }else{
      await checkFavAudioStatus({quiet:true});
    }
  }catch(e){
    renderFavAudioJob({state:"error",error:(e&&e.message)||String(e)});
  }
}
async function startFavAudioGenerate(){
  const status=_favAudioStatusData||await checkFavAudioStatus({quiet:false});
  if(!status||!status.ok||!status.missing) return;
  if(status.capacityBlocked){
    renderFavAudioStatus(status,"达到容量安全线，已停止生成",true); return;
  }
  setFavAudioBusy(true);
  if($("favAudioJobMsg")) $("favAudioJobMsg").textContent="正在启动声音 A 增量生成…";
  try{
    const res=await fetch("/api/fav-audio/generate", {method:"POST",headers:{"Content-Type":"application/json"},body:"{}"});
    const data=await res.json();
    if(!res.ok||!data.ok) throw new Error(data.error||("启动失败 "+res.status));
    setTimeout(pollFavAudioJob,400);
  }catch(e){
    renderFavAudioJob({state:"error",error:(e&&e.message)||String(e)});
  }
}
async function previewAndCleanFavAudio(){
  const status=await checkFavAudioStatus({quiet:false});
  if(!status||!status.orphaned) return;
  const examples=(status.orphanExamples||[]).slice(0,5).map(x=>"• "+x).join("\n");
  const ok=confirm(
    `发现 ${status.orphaned} 个已不在 SPEAK/CHAT 错题集里的音频（${formatFavAudioBytes(status.orphanBytes)}）。\n\n`+
    (examples?(examples+"\n\n"):"")+
    "确认后会先移入这台电脑的回收备份，再从手机网页发布目录移除。确定继续吗？"
  );
  if(!ok) return;
  setFavAudioBusy(true);
  try{
    const res=await fetch("/api/fav-audio/cleanup", {
      method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({cleanupToken:status.cleanupToken})
    });
    const data=await res.json();
    if(!res.ok||!data.ok) throw new Error(data.error||("清理启动失败 "+res.status));
    setTimeout(pollFavAudioJob,400);
  }catch(e){
    renderFavAudioJob({state:"error",error:(e&&e.message)||String(e)});
  }
}
/* ---- 云同步包压缩：Jsonbin 免费版单个 record 上限 100KB ----
   414 句明文 117KB 会被拒（Free users cannot update a record over 100kb）。
   gzip+base64 后约 52KB，可容纳约 800 句。本机/局域网文件与备用下载仍存明文，
   因为 serve.py 要校验 items 数组，手机的隔空投送导入也读明文。            */
function _u8ToB64(bytes){
  let bin="";
  const CH=0x8000;                       // 分块，避免 apply 参数过多爆栈
  for(let i=0;i<bytes.length;i+=CH) bin+=String.fromCharCode.apply(null, bytes.subarray(i, i+CH));
  return btoa(bin);
}
function _b64ToU8(b64){
  const bin=atob(b64), out=new Uint8Array(bin.length);
  for(let i=0;i<bin.length;i++) out[i]=bin.charCodeAt(i);
  return out;
}
async function encodeFavPack(pack){
  try{
    if(typeof CompressionStream!=="function") return pack;   // 老浏览器：退回明文
    const src=new Blob([new TextEncoder().encode(JSON.stringify(pack))]);
    const buf=await new Response(src.stream().pipeThrough(new CompressionStream("gzip"))).arrayBuffer();
    return { v:5, enc:"gzip-b64", updatedAt:pack.updatedAt||Date.now(),
             n:(pack.items||[]).length, data:_u8ToB64(new Uint8Array(buf)) };
  }catch(e){ return pack; }
}
async function decodeFavPack(raw){
  if(!raw || typeof raw!=="object") return raw;
  if(raw.enc!=="gzip-b64" || !raw.data) return raw;          // v4 明文包，原样返回
  if(typeof DecompressionStream!=="function")
    throw new Error("此设备不支持解压同步包（需 iOS 16.4+ 或新版浏览器）");
  const src=new Blob([_b64ToU8(raw.data)]);
  const buf=await new Response(src.stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer();
  return JSON.parse(new TextDecoder().decode(buf));
}
/* ---- GitHub 仓库存包：Jsonbin 免费版 100KB 封顶，错题按当前速度约 18 天就会再撞上。
   把大包改存到 GitHub Pages 的静态文件（无实际大小限制），手机端只是读一个公开
   网址，不需要任何 token。Jsonbin 保留给手机回写「不会」次数用——那个包只有 8KB。 */
const GH_API="https://api.github.com";
function ghConf(){
  // 直接兜底读输入框：粘贴后若还没失焦，onchange 不会触发，state 里就是空的
  const el=id=>{ const n=$(id); return n&&n.value!=null ? String(n.value) : ""; };
  const token=((state.settings.ghToken||"").trim() || el("ghToken").trim());
  const repo=((state.settings.ghRepo||"").trim() || el("ghRepo").trim())
    .replace(/^https?:\/\/github\.com\//i,"").replace(/\.git$/,"").replace(/^\/|\/$/g,"");
  const path=(state.settings.ghPath||"fav-listen-data.json").trim().replace(/^\//,"");
  return { token, repo, path, ok:!!(token&&repo&&path) };
}
function _utf8ToB64(str){
  return _u8ToB64(new TextEncoder().encode(str));
}
async function ghRequest(url, opts){
  const c=ghConf();
  const res=await fetch(url, Object.assign({}, opts, {
    headers: Object.assign({
      "Authorization":"Bearer "+c.token,
      "Accept":"application/vnd.github+json",
      "X-GitHub-Api-Version":"2022-11-28"
    }, (opts&&opts.headers)||{})
  }));
  return res;
}
/** 读当前文件的 sha —— GitHub 更新已有文件必须带上，否则 409。文件不存在返回 "" */
async function ghGetSha(){
  const c=ghConf();
  const res=await ghRequest(`${GH_API}/repos/${c.repo}/contents/${encodeURIComponent(c.path)}?ref=main&t=${Date.now()}`, { method:"GET" });
  if(res.status===404) return "";
  if(!res.ok){
    let tip="读取仓库失败 "+res.status;
    try{ const j=await res.clone().json(); if(j&&j.message) tip=j.message; }catch(e){}
    if(res.status===401) tip="Token 无效或已过期";
    if(res.status===403) tip="Token 权限不足（需要该仓库的 Contents 读写）";
    throw new Error(tip);
  }
  const j=await res.json();
  return j.sha||"";
}
async function pushGithubPack(pack){
  const c=ghConf();
  if(!c.ok) throw new Error("未填写 GitHub Token / 仓库");
  const sha=await ghGetSha();
  const body={
    message:`Sync fav listen pack (${(pack.items||[]).length} items)`,
    content:_utf8ToB64(JSON.stringify(await encodeFavPack(pack))),
    branch:"main"
  };
  if(sha) body.sha=sha;
  const res=await ghRequest(`${GH_API}/repos/${c.repo}/contents/${encodeURIComponent(c.path)}`, {
    method:"PUT",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify(body)
  });
  if(!res.ok){
    let tip="GitHub 上传失败 "+res.status;
    try{ const j=await res.clone().json(); if(j&&j.message) tip=j.message; }catch(e){}
    if(res.status===409) tip="仓库有更新冲突，请再点一次";
    throw new Error(tip);
  }
  return `https://${c.repo.split("/")[0]}.github.io/${c.repo.split("/")[1]}/${c.path}`;
}
async function pushJsonbinPack(pack, rawId){
  const key=(state.settings.jsonbinKey||"").trim();
  if(!key) throw new Error("未填写 Jsonbin Key");
  const body=JSON.stringify(await encodeFavPack(pack));
  let parsed=parseFavSyncId(rawId);
  let id=(parsed.provider==="jsonbin") ? parsed.id : "";
  if(id){
    const res=await fetch(JSONBIN_API+"/"+encodeURIComponent(id), {
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        "X-Master-Key":key,
        "X-Bin-Private":"false"
      },
      body
    });
    if(res.status===404) id="";
    else if(!res.ok){
      let tip="Jsonbin 更新失败 "+res.status;
      try{ const j=await res.clone().json(); if(j&&j.message) tip=j.message; }catch(e){}
      throw new Error(tip);
    }
    else return formatFavSyncId("jsonbin", id);
  }
  const res=await fetch(JSONBIN_API, {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "X-Master-Key":key,
      "X-Bin-Private":"false",
      "X-Bin-Name":"speak-right-fav-listen"
    },
    body
  });
  if(!res.ok){
    let tip="Jsonbin 创建失败 "+res.status;
    try{ const j=await res.clone().json(); if(j&&j.message) tip=j.message; }catch(e){}
    throw new Error(tip);
  }
  const j=await res.json();
  id=(j.metadata&&j.metadata.id)||"";
  if(!id) throw new Error("Jsonbin 未返回同步码");
  return formatFavSyncId("jsonbin", id);
}
async function pushJsonblobPack(pack, rawId){
  const body=JSON.stringify(pack);
  const headers={ "Content-Type":"application/json", "Accept":"application/json" };
  let parsed=parseFavSyncId(rawId);
  let id=(parsed.provider==="jsonblob") ? parsed.id : "";
  if(id){
    const res=await fetchWithRetry(JSONBLOB_API+"/"+encodeURIComponent(id), { method:"PUT", headers, body });
    if(res.status===404) id="";
    else if(!res.ok) throw new Error("JSONBlob 更新失败 "+res.status);
    else return id;
  }
  const res=await fetchWithRetry(JSONBLOB_API, { method:"POST", headers, body }, 5);
  if(!res.ok){
    if(res.status===429) throw new Error("JSONBlob 429 限流（VPN 共享 IP 常中招）");
    throw new Error("JSONBlob 创建失败 "+res.status);
  }
  const loc=res.headers.get("Location")||res.headers.get("location")||"";
  const m=loc.match(/jsonBlob\/([^\/\s?]+)/i);
  id=(m&&m[1])||"";
  if(!id){
    try{ const j=await res.clone().json(); id=j.id||j.blobId||""; }catch(e){}
  }
  if(!id){
    const hdr=res.headers.get("X-jsonblob-id")||res.headers.get("x-jsonblob-id")||"";
    id=hdr.trim();
  }
  if(!id) throw new Error("JSONBlob 未拿到同步码");
  return id;
}
function buildFavListenPack(){
  ensureFavAddedAt();
  const items=[];
  const seen=new Set();
  const addEn=en=>{
    if(!en||seen.has(en)||seen.has(normEn(en))) return;
    const mode=(state.favModes&&state.favModes[en])||"";
    if(mode!=="speak" && mode!=="chat") return;
    const s=resolveFavSentence(en);
    if(!s||!s.en) return;
    seen.add(s.en); seen.add(normEn(s.en));
    const addedAt=favAddedAt(s.en)||favAddedAt(en)||0;
    const fails=favFailCount(s.en)||favFailCount(en)||0;
    const gots=favGotCount(s.en)||favGotCount(en)||0;
    items.push({
      en:s.en,
      cn:(function(){ const raw=(s.cn&&!isPlaceholderCn(s.cn))?s.cn:""; const fix=(typeof FAV_CN_FIXES==="object")&&(FAV_CN_FIXES[s.en]||FAV_CN_FIXES[en]); if(fix) return fix; if(/我只想刷刷手机/.test(raw)&&/scroll on my phone/i.test(s.en)&&/unwind/i.test(s.en)) return "我就刷刷手机放松一下。"; if((/画了草图/.test(raw)||/s\*\* it a bit messy/i.test(s.en))&&/messy/i.test(s.en)&&/sketches/i.test(s.en)) return "是不是有点乱，到处是草图和笔记？"; return raw; })(),
      note:scrubFavMetaNote(getFavNote(s.en)||s.note||""),
      // 句型单独一格：用户自己写的备注会盖掉 note，句型不能跟着丢（2026-09-22）
      pat:(function(){ const b=bankSentenceByEn(s.en)||bankSentenceByEn(en); const n=String((b&&b.note)||"").trim(); return /^句型[：:]/.test(n)?n:""; })(),
      mode,
      fails,
      gots,
      addedAt
    });
  };
  ["speak","chat"].forEach(m=>{
    (state.favOrderByMode&&state.favOrderByMode[m]||[]).forEach(addEn);
    state.favs.forEach(en=>{ if(state.favModes&&state.favModes[en]===m) addEn(en); });
  });
  // 导出时不预排序：留给手机按用户选项排，避免缓存成单一顺序
  return { v:4, updatedAt:Date.now(), items };
}
function favListenPublicBase(){
  const u=(state.settings&&state.settings.favListenPublicUrl||"").trim();
  return u || "https://winter-rain-9302.zerodeploy.app";
}
function favListenPublicLink(){
  const base=favListenPublicBase().replace(/\/$/,"");
  const id=(state.settings&&state.settings.favSyncId||"").trim();
  return id ? (base+"/?id="+encodeURIComponent(id)) : (base+"/");
}
/**
 * 顶部同步失败横幅。传空字符串表示同步成功 —— 立刻收掉，并解除「本次不再提示」，
 * 这样下次再失败还会亮（否则关一次就永远看不到了，等于回到老问题）。
 */
let _syncAlertMuted=false;
function showSyncAlert(msg){
  const bar=$("syncAlert"), txt=$("syncAlertMsg");
  if(!bar) return;
  if(!msg){
    _syncAlertMuted=false;
    bar.classList.remove("show");
    if(txt) txt.textContent="";
    return;
  }
  if(_syncAlertMuted) return;
  if(txt) txt.textContent=msg;
  bar.classList.add("show");
}
function updateFavSyncUI(msg, isErr){
  const lab=$("favSyncIdLabel");
  const id=(state.settings&&state.settings.favSyncId)||"";
  if(lab) lab.textContent=id||"（尚未生成）";
  const pub=$("favListenPublicLabel");
  if(pub) pub.textContent=favListenPublicLink();
  const m=$("favSyncMsg");
  if(m && msg!=null){
    m.textContent=msg;
    m.style.color=isErr?"var(--bad)":"var(--muted)";
  }
  // 同步失败要在收起状态下也看得见——设置面板默认是收起的
  if(msg!=null) showSyncAlert(isErr?msg:"");
  const open=$("favListenOpenBtn");
  if(open){
    open.href=favListenPublicLink();
  }
  if($("favSyncAutoChk")) $("favSyncAutoChk").checked=state.settings.favSyncAuto!==false;
}
function downloadFavListenPack(pack){
  const blob=new Blob([JSON.stringify(pack,null,2)],{type:"application/json"});
  const a=document.createElement("a");
  a.href=URL.createObjectURL(blob);
  a.download="fav-listen-data.json";
  document.body.appendChild(a);
  a.click();
  setTimeout(()=>{ URL.revokeObjectURL(a.href); a.remove(); }, 800);
}
/* ============================================================
   跨设备同步：电脑 ⇄ iPad（2026-10-08）
   方向和通道：
     电脑 → 云：GitHub 上的 trainer-state.json（电脑有 token，文件无大小限制）
     iPad → 云：Jsonbin 的一个小 bin，只传"我这台新增的那点东西"（增量）
     两边读：都读 GitHub 公开文件 + 那个 Jsonbin 小 bin，合并
   为什么 iPad 不直接写 GitHub：那需要把仓库写权限的 token 放在平板上，
   而 token 能改写这个仓库 = 能改写你每天打开的网页。Jsonbin key 风险小得多，
   而且手机端本来就是这么用的。
   合并规则：练过的句子取并集、各种计数取 max —— 谁都不会把对方的进度盖掉。
   ⚠️ Jsonbin 免费版单条 100KB，所以 iPad 只传增量，并且超过 90KB 会亮横幅
      （2026-08 就因为撞上这个上限静默失败了一天多）。
   ============================================================ */
const STATE_PATH="trainer-state.json";
const PROGRESS_BIN_LIMIT=90*1024;

function usedKeysSnapshot(){
  const out={};
  for(const k in (state.usedEn||{})) out[k]=(state.usedEn[k]||[]).slice();
  return out;
}
/** 上次和云端对齐时见过的东西，用来算"我这台新增了什么" */
function loadSyncSeen(){
  try{
    const d=JSON.parse(localStorage.getItem("sr_sync_seen")||"null");
    if(d&&typeof d==="object") return { used:d.used||{}, favs:new Set(d.favs||[]) };
  }catch(e){}
  return { used:{}, favs:new Set() };
}
function saveSyncSeen(){
  try{
    localStorage.setItem("sr_sync_seen", JSON.stringify({
      used:usedKeysSnapshot(), favs:[...state.favs]
    }));
  }catch(e){}
}
/** 一条收藏的完整快照（新设备靠它把错题集整个建起来） */
function favEntry(en){
  const snap=(state.customFavs&&state.customFavs[en])||null;
  return {
    en,
    cn:(snap&&snap.cn)||"",
    note:getFavNote(en)||(snap&&snap.note)||"",   // 备注可能只存在快照里，两处都要看
    mode:(state.favModes&&state.favModes[en])||"",
    fails:favFailCount(en)||0,
    gots:favGotCount(en)||0,
    addedAt:favAddedAt(en)||0,
    focus:(snap&&snap.focus)||[],
    scene:(snap&&snap.scene)||"",
    cnOk:!!(snap&&snap.cnPracticeOk)
  };
}
/**
 * 打包本机状态。delta=true 时只打"上次对齐之后新增的"，给 iPad 走 Jsonbin 用。
 * 不打包的东西：settings（含各种 Key，绝不能上云）、chats、batches/pos/idx（各设备自己的位置）。
 */
function buildTrainerState(opts){
  const delta=!!(opts&&opts.delta);
  const seen=delta?loadSyncSeen():{used:{},favs:new Set()};
  // 云端已经有的也算"不用再传" —— 否则第一次同步会把刚拉下来的 800 多条
  // 原样推回去，撞爆 Jsonbin 的 100KB。
  const cloud=(opts&&opts.cloud)||null;
  const cloudUsed=(cloud&&cloud.used)||{};
  const cloudFavs=new Set(((cloud&&cloud.favs)||[]).map(f=>f&&f.en).filter(Boolean));
  const used={};
  for(const k in (state.usedEn||{})){
    const mine=state.usedEn[k]||[];
    const had=new Set((seen.used[k]||[]).concat(cloudUsed[k]||[]));
    const add=delta ? mine.filter(en=>!had.has(en)) : mine.slice();
    if(add.length) used[k]=add;
  }
  const favs=[...state.favs].filter(en=>delta ? (!seen.favs.has(en) && !cloudFavs.has(en)) : true).map(favEntry);
  // 取消收藏只认"我这台确实见过又删掉的"，新设备 seen 为空，不会误删云端
  const removed=delta ? [...seen.favs].filter(en=>!state.favs.has(en)) : [];
  return {
    v:1, kind:"trainer-state", delta, updatedAt:Date.now(), bankVer:BANK_VER,
    used, favs, removed,
    doneByKey:Object.assign({}, state.doneByKey||{}),
    learnedByUnit:Object.assign({}, state.learnedByUnit||{}),
    userEnFixes:Object.assign({}, state.userEnFixes||{})
  };
}
/** 合并云端状态进本机：并集 / 取 max，不做覆盖 */
function applyTrainerState(pack, out){
  if(!pack || pack.kind!=="trainer-state") return false;
  let changed=false;
  const mark=()=>{ changed=true; if(out) out.favs=true; };
  // 练过的句子：并集（保留本机在前，沿用句库 500 条上限）
  if(pack.used && typeof pack.used==="object"){
    if(!state.usedEn) state.usedEn={};
    for(const k in pack.used){
      const theirs=pack.used[k]||[];
      if(!theirs.length) continue;
      const mine=Array.isArray(state.usedEn[k])?state.usedEn[k]:[];
      const have=new Set(mine);
      const add=theirs.filter(en=>en&&!have.has(en));
      if(add.length){ state.usedEn[k]=mine.concat(add).slice(0,500); changed=true; }
    }
  }
  // 计数：取 max
  ["doneByKey","learnedByUnit"].forEach(f=>{
    const theirs=pack[f]; if(!theirs||typeof theirs!=="object") return;
    if(!state[f]) state[f]={};
    for(const k in theirs){
      const v=+(theirs[k]||0)||0;
      if(v > (+(state[f][k]||0)||0)){ state[f][k]=v; changed=true; }
    }
  });
  // 对方取消的收藏
  if(Array.isArray(pack.removed)){
    pack.removed.forEach(en=>{
      if(en && state.favs.has(en)){ removeFav(en); if(state.customFavs) delete state.customFavs[en]; mark(); }
    });
  }
  // 收藏：没有的补进来，已有的次数取 max
  if(Array.isArray(pack.favs)){
    if(!state.customFavs) state.customFavs={};
    pack.favs.forEach(f=>{
      if(!f||!f.en) return;
      const en=f.en;
      if(!state.favs.has(en)){
        state.favs.add(en);
        if(f.mode) (state.favModes=state.favModes||{})[en]=f.mode;
        if(f.addedAt) (state.favAddedAt=state.favAddedAt||{})[en]=f.addedAt;
        appendFavOrder(f.mode||"speak", en);
        mark();
      }
      if(f.cn && !state.customFavs[en]){
        state.customFavs[en]={ en, cn:f.cn, focus:f.focus||[], scene:f.scene||"", note:f.note||"", cnPracticeOk:!!f.cnOk };
        mark();
      }
      const cf=+(f.fails||0)||0, cg=+(f.gots||0)||0;
      if(cf>favFailCount(en)){ (state.favFails=state.favFails||{})[en]=cf; mark(); }
      if(cg>favGotCount(en)){ (state.favGots=state.favGots||{})[en]=cg; mark(); }
      if(f.note && !getFavNote(en)){ setFavNote(en, f.note); mark(); }
    });
  }
  if(pack.userEnFixes && typeof pack.userEnFixes==="object"){
    state.userEnFixes=state.userEnFixes||{};
    for(const k in pack.userEnFixes){
      if(!(k in state.userEnFixes)){ state.userEnFixes[k]=pack.userEnFixes[k]; changed=true; }
    }
  }
  return changed;
}

/* ---------------- 传输：电脑走 GitHub，iPad 走 Jsonbin ---------------- */
async function ghPutFile(path, obj, msg){
  const c=ghConf();
  if(!c.ok) throw new Error("未填写 GitHub Token / 仓库");
  let sha="";
  const head=await ghRequest(`${GH_API}/repos/${c.repo}/contents/${encodeURIComponent(path)}?ref=main&t=${Date.now()}`,{method:"GET"});
  if(head.ok){ try{ sha=(await head.json()).sha||""; }catch(e){} }
  else if(head.status!==404){
    let tip="读取仓库失败 "+head.status;
    try{ const j=await head.clone().json(); if(j&&j.message) tip=j.message; }catch(e){}
    throw new Error(tip);
  }
  const body={ message:msg, content:_utf8ToB64(JSON.stringify(obj)), branch:"main" };
  if(sha) body.sha=sha;
  const res=await ghRequest(`${GH_API}/repos/${c.repo}/contents/${encodeURIComponent(path)}`,{
    method:"PUT", headers:{"Content-Type":"application/json"}, body:JSON.stringify(body)
  });
  if(!res.ok){
    let tip="GitHub 上传失败 "+res.status;
    try{ const j=await res.clone().json(); if(j&&j.message) tip=j.message; }catch(e){}
    if(res.status===409) tip="仓库有更新冲突，请再点一次";
    throw new Error(tip);
  }
}
async function jsonbinPutRaw(id, obj, name){
  const key=(state.settings.jsonbinKey||"").trim();
  if(!key) throw new Error("iPad 上需要填 Jsonbin Key 才能把进度传回去");
  const body=JSON.stringify(obj);
  if(body.length>PROGRESS_BIN_LIMIT)
    throw new Error("进度包 "+Math.round(body.length/1024)+"KB，超过 Jsonbin 安全线，请先在电脑上同步一次");
  const hdr={ "Content-Type":"application/json", "X-Master-Key":key, "X-Bin-Private":"false" };
  if(id){
    const res=await fetch(JSONBIN_API+"/"+encodeURIComponent(id),{method:"PUT",headers:hdr,body});
    if(res.ok) return id;
    if(res.status!==404){
      let tip="Jsonbin 更新失败 "+res.status;
      try{ const j=await res.clone().json(); if(j&&j.message) tip=j.message; }catch(e){}
      throw new Error(tip);
    }
  }
  const res=await fetch(JSONBIN_API,{method:"POST",headers:Object.assign({"X-Bin-Name":name},hdr),body});
  if(!res.ok){
    let tip="Jsonbin 创建失败 "+res.status;
    try{ const j=await res.clone().json(); if(j&&j.message) tip=j.message; }catch(e){}
    throw new Error(tip);
  }
  const j=await res.json();
  const nid=(j.metadata&&j.metadata.id)||"";
  if(!nid) throw new Error("Jsonbin 未返回同步码");
  return nid;
}
async function jsonbinGetRaw(id){
  if(!id) return null;
  const res=await fetch(JSONBIN_API+"/"+encodeURIComponent(id)+"/latest?meta=false&t="+Date.now(),{cache:"no-store"});
  if(!res.ok) return null;
  return await res.json();
}
/** 云端那份状态（电脑写的），公开可读，iPad 不需要任何 Key */
async function fetchCloudState(){
  const base=favListenPublicBase().replace(/\/$/,"");
  try{
    const res=await fetch(base+"/"+STATE_PATH+"?t="+Date.now(),{cache:"no-store"});
    if(res.status===404) return { ok:true, pack:null };   // 还没同步过，正常
    if(!res.ok) return { ok:false, pack:null };           // 拉失败：这时绝不能推
    return { ok:true, pack:await decodeFavPack(await res.json()) };
  }catch(e){ return { ok:false, pack:null }; }
}

let _stateSyncBusy=false;
/**
 * 拉 → 合并 → 推。两边都调这一个函数，差别只在推到哪：
 * 电脑（有 GitHub token）推全量到仓库；iPad 推增量到 Jsonbin。
 */
async function syncTrainerState(opts){
  if(_stateSyncBusy) return false;
  _stateSyncBusy=true;
  const quiet=!!(opts&&opts.quiet);
  try{
    let changed=false;
    const applied={favs:false};      // 合并进来的东西里有没有收藏
    const got=await fetchCloudState();
    const cloud=got.pack;
    // 拉不到就不要推。否则一台"空"设备（新浏览器/清过数据）会把云端整个盖掉 ——
    // 2026-08 清 usedEn 那次就是这类错误，这里绝不能重演。
    if(!got.ok) throw new Error("云端进度拉取失败，本次不上传（避免把云端盖成空的）");
    if(cloud && applyTrainerState(cloud, applied)) changed=true;
    const binId=(state.settings.progressBinId||(cloud&&cloud.progressBinId)||"").trim();
    if(binId){
      state.settings.progressBinId=binId;
      const delta=await decodeFavPack(await jsonbinGetRaw(binId));
      // 电脑不要把自己刚推上去的增量再吃回来
      if(delta && delta.deviceId!==deviceId() && applyTrainerState(delta, applied)) changed=true;
    }
    const gh=ghConf();
    if(gh.ok){
      // 电脑：推全量，并把 Jsonbin 的 bin id 写进去告诉 iPad 往哪传
      const full=buildTrainerState({delta:false});
      // 第二道闸：合并之后本机的收藏数反而比云端少一大截 = 哪里不对，停手让人看
      const cloudFavs=(cloud&&Array.isArray(cloud.favs))?cloud.favs.length:0;
      if(cloudFavs>20 && full.favs.length < cloudFavs*0.5)
        throw new Error("本机只有 "+full.favs.length+" 条收藏，云端有 "+cloudFavs+" 条，差太多，已停止上传");
      full.progressBinId=state.settings.progressBinId||"";
      full.deviceId=deviceId();
      if(cloud && stateFingerprint(full)===stateFingerprint(cloud) && cloud.progressBinId===full.progressBinId){
        saveSyncSeen();
        if(changed) saveProgress();
        if(applied.favs) scheduleFavListenSync();
        showSyncAlert("");
        if(!quiet) updateStateSyncUI("已经是最新的，无需上传");
        return changed;
      }
      if(!full.progressBinId && (state.settings.jsonbinKey||"").trim()){
        try{
          full.progressBinId=await jsonbinPutRaw("", {v:1,kind:"trainer-state",used:{},favs:[],removed:[],deviceId:"seed"}, "speak-right-progress");
          state.settings.progressBinId=full.progressBinId;
        }catch(e){}
      }
      await ghPutFile(STATE_PATH, await encodeFavPack(full), "Sync trainer state");
    }else{
      // iPad：只推增量
      const d=buildTrainerState({delta:true, cloud});
      d.deviceId=deviceId();
      const hasSomething=Object.keys(d.used).length||d.favs.length||d.removed.length;
      if(hasSomething){
        if(!binId) throw new Error("还没拿到进度同步位置：先在电脑上点一次「同步进度」");
        await jsonbinPutRaw(binId, await encodeFavPack(d), "speak-right-progress");
      }
    }
    saveSyncSeen();
    if(changed) saveProgress();
    // iPad 上收的错题合并进来之后，必须重新生成手机听练包 ——
    // 否则电脑这边看得到新句子，手机听练页永远停在旧包（2026-10-09 就是这么漏的）。
    // 只有持有 GitHub token 的那台（电脑）负责推这个大包。
    if(applied.favs && ghConf().ok) scheduleFavListenSync();
    showSyncAlert("");
    if(!quiet) updateStateSyncUI("进度已同步 · "+new Date().toLocaleTimeString()+(applied.favs?"（错题有更新，正在重新生成手机听练包）":""));
    return changed;
  }catch(e){
    const msg="进度同步失败："+((e&&e.message)||e);
    showSyncAlert(msg);
    if(!quiet) updateStateSyncUI(msg);
    return false;
  }finally{ _stateSyncBusy=false; }
}
/** 内容指纹：和云端一模一样就别再提交一次，免得每次开页都给仓库加一个 commit
    （这个仓库的 .git 曾经涨到 65MB，就是这么来的） */
function stateFingerprint(p){
  if(!p) return "";
  let used=0; for(const k in (p.used||{})) used+=(p.used[k]||[]).length;
  let done=0; for(const k in (p.doneByKey||{})) done+=+(p.doneByKey[k]||0)||0;
  let learned=0; for(const k in (p.learnedByUnit||{})) learned+=+(p.learnedByUnit[k]||0)||0;
  let fails=0; ((p.favs)||[]).forEach(f=>{ fails+=(+(f.fails||0)||0)+(+(f.gots||0)||0); });
  return [((p.favs)||[]).length, used, done, learned, fails].join("/");
}
function deviceId(){
  let id="";
  try{ id=localStorage.getItem("sr_device_id")||""; }catch(e){}
  if(!id){
    id=(IS_TOUCH?"pad-":"pc-")+Math.random().toString(36).slice(2,9);
    try{ localStorage.setItem("sr_device_id", id); }catch(e){}
  }
  return id;
}
function updateStateSyncUI(msg){
  const el=$("stateSyncMsg"); if(el) el.textContent=msg||"";
}

async function pushFavListenSync(opts){
  if(_favSyncBusy){
    if(!(opts&&opts.quiet)) updateFavSyncUI("正在同步中，请稍候…");
    return state.settings.favSyncId||"";
  }
  _favSyncBusy=true;
  const quiet=!!(opts&&opts.quiet);
  const alsoDownload=!!(opts&&opts.download);
  // 先拉手机回写的次数，再推，避免覆盖
  try{ await pullAndMergeFavStats({ quiet:true, skipSave:true }); }catch(e){}
  const pack=buildFavListenPack();
  const hasJsonbin=!!((state.settings.jsonbinKey||"").trim());
  if(!quiet) updateFavSyncUI("正在同步（"+pack.items.length+" 句）…"+(hasJsonbin?" Jsonbin":""));
  if(alsoDownload){ try{ downloadFavListenPack(pack); }catch(e){} }
  const localOk=await pushLocalFavFile(pack);
  const gh=ghConf();
  try{
    let id=state.settings.favSyncId||"";
    if(gh.ok){
      // 大包走 GitHub（无大小限制）；Jsonbin 只留给手机回写次数用，不再传整包
      await pushGithubPack(pack);
    }else if(hasJsonbin){
      id=await pushJsonbinPack(pack, id);
    }else{
      // 无 Key：仍尝试公共云，但 VPN 共享 IP 很容易 429
      id=await pushJsonblobPack(pack, id);
    }
    state.settings.favSyncId=id;
    saveProgress();
    if(!gh.ok){ try{ await navigator.clipboard.writeText(id); }catch(e){} }
    const extra=localOk ? " 本机文件已更新。" : "";
    updateFavSyncUI(
      gh.ok
        ? (quiet
            ? ("已自动同步 "+pack.items.length+" 句到 GitHub"+extra)
            : ("已上传 "+pack.items.length+" 句到 GitHub。手机刷新即可（Pages 生效约十几秒）。"+extra))
        : (quiet
            ? ("已自动同步 "+pack.items.length+" 句"+extra)
            : ("已上传 "+pack.items.length+" 句。同步码已复制——手机听练页粘贴保存一次即可。"+extra))
    );
    if(localOk) scheduleFavAudioCheck();
    return id;
  }catch(e){
    const tip=(e&&e.message)||String(e);
    if(!quiet){
      try{ downloadFavListenPack(pack); }catch(err){}
    }
    const hint=gh.ok
      ? "请检查 GitHub Token 是否过期、是否勾了该仓库的 Contents 读写。"
      : (hasJsonbin
        ? "请检查 Jsonbin Key；或用备用文件隔空投送。"
        : "请填写上方 Jsonbin Master Key 后再点生成（免费）；或用已下载的备用文件。");
    updateFavSyncUI(
      "云同步失败："+tip+(localOk?"（本机/局域网文件已就绪）":"")+"。"+hint,
      true
    );
    return "";
  }finally{
    _favSyncBusy=false;
  }
}
async function fetchFavListenPack(rawId){
  const parsed=parseFavSyncId(rawId);
  if(!parsed.id) throw new Error("同步码无效");
  if(parsed.provider==="jsonbin"){
    const res=await fetchWithRetry(JSONBIN_API+"/"+encodeURIComponent(parsed.id)+"/latest", {
      headers:{ "Accept":"application/json" }
    }, 3);
    if(!res.ok) throw new Error("Jsonbin 拉取失败 "+res.status);
    const j=await res.json();
    return await decodeFavPack(j.record || j);
  }
  const res=await fetchWithRetry(JSONBLOB_API+"/"+encodeURIComponent(parsed.id), {
    headers:{ "Accept":"application/json" }
  }, 3);
  if(!res.ok) throw new Error("云拉取失败 "+res.status);
  return await decodeFavPack(await res.json());
}
function mergeFavStatsFromPack(pack){
  if(!pack) return false;
  if(!state.favFails) state.favFails={};
  if(!state.favGots) state.favGots={};
  // 取消收藏 / 备注这两类手机改动也要算进返回值，否则调用方不会保存、不会重推
  let sideChanged=false;
  // 手机上取消的收藏：把它们从错题集里删掉，否则电脑下次同步又推回手机
  if(Array.isArray(pack.removed) && pack.removed.length){
    let gone=0;
    pack.removed.forEach(en=>{
      if(!en) return;
      const hit=state.favs.has(en)
        ? en
        : [...state.favs].find(x=>normEn(x)===normEn(en));
      if(!hit) return;
      removeFav(hit);
      if(state.customFavs) delete state.customFavs[hit];
      gone++;
    });
    if(gone){ console.info("[Speak Right] 手机取消收藏 "+gone+" 句，已同步删除"); sideChanged=true; }
  }
  // 手机上写的备注：只回传手机改过的那几条，直接覆盖本地同名备注
  if(pack.notes && typeof pack.notes==="object"){
    let n=0;
    for(const en in pack.notes){
      if(!en) continue;
      const hit=state.favs.has(en) ? en : [...state.favs].find(x=>normEn(x)===normEn(en));
      if(!hit) continue;
      const text=String(pack.notes[en]||"");
      if(getFavNote(hit)===text) continue;
      setFavNote(hit, text);
      if(state.customFavs && state.customFavs[hit]) state.customFavs[hit].note=text;
      n++;
    }
    if(n){ console.info("[Speak Right] 手机备注同步 "+n+" 条"); sideChanged=true; }
  }
  // v6：手机只回传次数（en -> [fails, gots]），整包已改走 GitHub，不再塞进 Jsonbin
  if(!Array.isArray(pack.items) && pack.stats && typeof pack.stats==="object"){
    let ch=false;
    for(const en in pack.stats){
      const v=pack.stats[en];
      if(!en||!Array.isArray(v)) continue;
      const cf=+(v[0]||0)||0, cg=+(v[1]||0)||0;
      if(cf > favFailCount(en)){ state.favFails[en]=cf; ch=true; }
      if(cg > favGotCount(en)){ state.favGots[en]=cg; ch=true; }
    }
    return ch || sideChanged;
  }
  if(!Array.isArray(pack.items)) return sideChanged;
  let changed=sideChanged;
  for(const item of pack.items){
    if(!item||!item.en) continue;
    const en=item.en;
    const cf=+(item.fails||0)||0;
    const cg=+(item.gots||0)||0;
    if(cf > favFailCount(en)){
      state.favFails[en]=cf;
      changed=true;
    }
    if(cg > favGotCount(en)){
      state.favGots[en]=cg;
      changed=true;
    }
  }
  return changed;
}
async function pullAndMergeFavStats(opts){
  const quiet=!!(opts&&opts.quiet);
  const skipSave=!!(opts&&opts.skipSave);
  const id=(state.settings&&state.settings.favSyncId||"").trim();
  if(!id) return false;
  try{
    const pack=await fetchFavListenPack(id);
    const changed=mergeFavStatsFromPack(pack);
    if(changed){
      if(!skipSave) saveProgress();
      if(state.inFavReview){
        try{ syncFavOrder(true); renderCard(); renderRail(); }catch(e){}
      }
      if(!quiet) updateFavSyncUI("已合并手机错误次数");
    }else if(!quiet){
      updateFavSyncUI("已检查云端，无更高次数");
    }
    return changed;
  }catch(e){
    if(!quiet) updateFavSyncUI("拉取手机进度失败："+((e&&e.message)||e), true);
    return false;
  }
}
function scheduleFavListenSync(){
  // 走 GitHub 大包通道时不产生「同步码」，这里原来只认 favSyncId，
  // 导致收藏变了也不会自动上传，手机只能靠手动点「生成 / 更新云同步」才更新（2026-10-09）
  const hasTarget = !!(state.settings&&state.settings.favSyncId) || ghConf().ok;
  if(!hasTarget) return;
  if(state.settings.favSyncAuto===false) return;
  clearTimeout(_favSyncTimer);
  _favSyncTimer=setTimeout(()=>{ pushFavListenSync({ quiet:true }); }, 2500);
}
function loadProgress(){
  try{
    let d=JSON.parse(localStorage.getItem("sr_state")||"null");
    if(!d){ const f=JSON.parse(localStorage.getItem("sr_favs")||"null"); if(f) d={favs:f}; }
    if(!d) return;
    if(Array.isArray(d.favs)) state.favs=new Set(d.favs);
    state.favModes=(d.favModes&&typeof d.favModes==="object")?d.favModes:{};
    state.favNotes=(d.favNotes&&typeof d.favNotes==="object")?d.favNotes:{};
    state.favFails=(d.favFails&&typeof d.favFails==="object")?d.favFails:{};
    state.favGots=(d.favGots&&typeof d.favGots==="object")?d.favGots:{};
    state.favAddedAt=(d.favAddedAt&&typeof d.favAddedAt==="object")?d.favAddedAt:{};
    migrateBankEnFixes();
    try{ applyFavCnFixes(); }catch(e){}
    migrateFavModes();
    if(d.stats) state.stats=Object.assign(state.stats, d.stats);
    if(d.settings){
      state.settings=Object.assign(state.settings, d.settings);
      // gemini-2.0 常不可用；2.5 保留作忙线备用
      const m=(state.settings.geminiModel||"").trim();
      if(!m || /^gemini-2\.0(-|$)/.test(m)) state.settings.geminiModel="gemini-3.5-flash";
      if(state.settings.favSort!=="recent" && state.settings.favSort!=="random") state.settings.favSort="fails";
      if(typeof state.settings.favLoop!=="number") state.settings.favLoop=0;
      state.settings.favAudio=!!state.settings.favAudio;
      state.settings.favShowCn=!!state.settings.favShowCn;
      state.settings.favShowNote=!!state.settings.favShowNote;
      if(state.settings.favSyncAuto==null) state.settings.favSyncAuto=true;
      else state.settings.favSyncAuto=!!state.settings.favSyncAuto;
      if(!(state.settings.favListenPublicUrl||"").trim() || /zerodeploy\.app/i.test(state.settings.favListenPublicUrl||"")){
        state.settings.favListenPublicUrl="https://ZoeZeng1992.github.io/speak-right-listen";
      }
    }
    if(d.learnedByUnit) state.learnedByUnit=d.learnedByUnit;
    if(d.doneByKey && typeof d.doneByKey==="object") state.doneByKey=d.doneByKey;
    if(typeof d.unit==="number" && d.unit>=0 && d.unit<UNITS.length) state.unit=d.unit;
    if(d.mode==="speak"||d.mode==="chat") state.mode=d.mode;
    else if(d.mode==="listen") state.mode="speak";
    // resume the exact batch, position, completion + undo availability
    if(d.batches && typeof d.batches==="object") state.batches=d.batches;
    if(d.pos && typeof d.pos==="object") state.pos=d.pos;
    if(d.posFavEn && typeof d.posFavEn==="object") state.posFavEn=d.posFavEn;
    else if(!state.posFavEn) state.posFavEn={};
    ensureFavOrders();
    if(d.favOrderByMode && typeof d.favOrderByMode==="object"){
      ["listen","speak","chat"].forEach(k=>{
        if(Array.isArray(d.favOrderByMode[k])) state.favOrderByMode[k]=d.favOrderByMode[k];
      });
    } else if(Array.isArray(d.favOrder)){
      // migrate flat favOrder → split by favModes
      const next=emptyFavOrders();
      d.favOrder.forEach(en=>{
        const m=(state.favModes&&state.favModes[en])||"speak";
        const bucket=m==="chat"?"chat":"speak";
        if(!next[bucket].some(x=>x===en||normEn(x)===normEn(en))) next[bucket].push(en);
      });
      state.favOrderByMode=next;
    }
    if(d.favReviewMode==="speak"||d.favReviewMode==="chat")
      state.favReviewMode=d.favReviewMode;
    else if(d.favReviewMode==="listen")
      state.favReviewMode="speak";
    // migrate old shared fav|review progress into SPEAK bucket
    if(state.pos){
      if(state.pos["fav|speak"]==null && typeof state.pos["fav|review"]==="number")
        state.pos["fav|speak"]=state.pos["fav|review"];
      if(state.posFavEn && !state.posFavEn["fav|speak"] && state.posFavEn["fav|review"])
        state.posFavEn["fav|speak"]=state.posFavEn["fav|review"];
    }
    if(typeof d.idx==="number") state.idx=d.idx;
    if(d.batchDone){ state.batchDone={}; for(const k in d.batchDone) state.batchDone[k]=new Set(d.batchDone[k]); }
    if(d.undoBatch && typeof d.undoBatch==="object") state.undoBatch=d.undoBatch;
    if(d.customFavs && typeof d.customFavs==="object") state.customFavs=d.customFavs;
    // 每次加载都把收藏快照的中文对齐句库，不依赖 BANK_VER。
    // 快照优先级高于句库（resolveFavSentence），所以订正过的中文若不同步过来，
    // 用户刷新后看到的还是收藏当时的旧译文 —— 而且升过一次版本号后就再也不会自动修了。
    // 只覆盖中文，note 等用户自己写的内容一律不动。
    try{
      if(state.customFavs){
        for(const en in state.customFavs){
          const snap=state.customFavs[en];
          if(!snap||!en) continue;
          // 用户在「收藏编辑」里改过（或点过 AI 重译）的中文带 cnPracticeOk 标记，
          // 那是人工确认过的译文，句库不许覆盖它 —— 否则用户改完一刷新就被改回去。
          if(snap.cnPracticeOk) continue;
          // 必须直接查句库，不能用 lookupSentence：它的索引把收藏快照
          // 以更高优先级盖在句库之上，拿它刷新快照等于拿快照刷新自己，永远是空操作。
          const hit=bankSentenceByEn(en);
          if(hit && hit.cn && !isPlaceholderCn(hit.cn) && snap.cn!==hit.cn) snap.cn=hit.cn;
        }
      }
    }catch(e){}
    // 批次里存的是发牌当时的句子副本，句库订正后必须原地刷新，否则用户看到的
    // 还是旧中文。这里**不能**放在 bankVer 变化的条件里：升过一次版本号之后
    // 存档里的 bankVer 就等于当前值，条件永远为假，旧中文再也刷不掉。
    try{
      let refreshed=0, migrated=0;
      for(const uid in (state.batches||{})){
        const b=state.batches[uid];
        if(!b) continue;
        for(const mode of ["listen","speak"]){
          if(!Array.isArray(b[mode])) continue;
          b[mode]=b[mode].map(item=>{
            if(!item||!item.en) return item;
            // 英文本身被订正过时（如 before Monday → by Monday），先按 BANK_EN_FIXES
            // 迁到新写法，否则拿旧英文查句库查不到，批次里会一直留着错句。
            const fixedEn=(typeof BANK_EN_FIXES==="object" && BANK_EN_FIXES[item.en]) || item.en;
            const hit=bankSentenceByEn(fixedEn);     // 只查句库，不含收藏快照
            if(!hit) return fixedEn!==item.en ? Object.assign({}, item, { en:fixedEn }) : item;
            if(fixedEn!==item.en) migrated++;
            if(hit.cn && hit.cn!==item.cn) refreshed++;
            return Object.assign({}, item, {
              en: hit.en || fixedEn,
              cn: hit.cn || item.cn,
              focus: hit.focus || item.focus,
              scene: hit.scene || item.scene
            });
          });
        }
      }
      if(refreshed||migrated) console.info(`[Speak Right] 批次内 ${refreshed} 句中文对齐、${migrated} 句英文迁移（进度保留）`);
    }catch(e){}
    if(d.chats && typeof d.chats==="object") state.chats=d.chats;
    if(d.chatByUnit && typeof d.chatByUnit==="object") state.chatByUnit=d.chatByUnit;
    if(d.recentEn && typeof d.recentEn==="object"){
      state.recentEn={};
      for(const k in d.recentEn){
        const list=d.recentEn[k]; if(!Array.isArray(list)) continue;
        if(k.includes("|")) state.recentEn[k]=list.slice(0, RECENT_CAP);
        else {
          // old shared per-unit list → split into listen/speak
          state.recentEn[recentKey(k,"listen")]=list.slice(0, RECENT_CAP);
          state.recentEn[recentKey(k,"speak")]=list.slice(0, RECENT_CAP);
        }
      }
    }
    if(d.usedEn && typeof d.usedEn==="object") state.usedEn=d.usedEn;
    else if(!state.usedEn) state.usedEn={};
    if(d.lastBatchEn && typeof d.lastBatchEn==="object") state.lastBatchEn=d.lastBatchEn;
    else if(!state.lastBatchEn) state.lastBatchEn={};
    if(d.userEnFixes && typeof d.userEnFixes==="object") state.userEnFixes=d.userEnFixes;
    if(Array.isArray(d.recentMixedEn)) state.recentMixedEn=d.recentMixedEn.filter(Boolean).slice(0, FAV_MIX_RECENT_CAP);
    else if(!state.recentMixedEn) state.recentMixedEn=[];
    // backfill usedEn from old shared recent lists
    for(const k in (state.recentEn||{})){
      if(!k.includes("|")) continue;
      const [unitId, mode]=k.split("|");
      if(!unitId||!mode) continue;
      if(!getUsedList(unitId, mode).length) archiveUsed(unitId, mode, (state.recentEn[k]||[]).map(en=>({en})));
    }
    migratePracticeHistoryEn();
    // Drop cached batches from older (combinatorial / nonsense) banks.
    // 只丢批次缓存，保留 usedEn / recentEn / lastBatchEn —— 那是"哪些句子已经练过"的记录，
    // 不是句库数据；清掉会让整个单元的进度归零、已练过的句子重新发一遍。
    if(d.bankVer!==BANK_VER){
      // Refresh favorited CN from bank so translation fixes reach 错题集 too
      if(state.customFavs && typeof SENTENCE_BANKS==="object"){
        for(const en in state.customFavs){
          const snap=state.customFavs[en];
          if(!snap||!en) continue;
          let hit=null;
          for(const id in SENTENCE_BANKS){
            hit=(SENTENCE_BANKS[id]||[]).find(s=>s&&s.en===en);
            if(hit) break;
          }
          if(hit && hit.cn && !isPlaceholderCn(hit.cn)) snap.cn=hit.cn;
        }
      }
      console.info("[Speak Right] Sentence bank updated — refreshed practice batches.");
      // 句库改正后尽快推到手机听练
      try{ scheduleFavListenSync(); }catch(e){}
    }

    // Seed history from current batches so the next 换一批 avoids what's on screen
    if(state.batches){
      for(const id in state.batches){
        const b=state.batches[id];
        if(!b) continue;
        if(!(state.recentEn[recentKey(id,"listen")]||[]).length && b.listen){
          rememberSentences(id,"listen",b.listen);
          archiveUsed(id,"listen",b.listen);
        }
        if(!(state.recentEn[recentKey(id,"speak")]||[]).length && b.speak){
          rememberSentences(id,"speak",b.speak);
          archiveUsed(id,"speak",b.speak);
        }
      }
    }
    // backfill chat counts from saved histories if stats missing
    if(!state.stats.chatReplies){
      let total=0; const by={};
      for(const id in state.chats){
        const n=(state.chats[id]||[]).filter(m=>m.role==="user").length;
        if(n){ by[id]=n; total+=n; }
      }
      if(total){ state.stats.chatReplies=total; state.chatByUnit=Object.assign(by, state.chatByUnit); }
    }
    if(d.inFavReview && state.favs.size){
      cleanupFavs();
      state.inFavReview=true;
      state.mode="speak";
      ensureFavOrders();
      state._favCache=favList();
      setTimeout(()=>refreshWeakFavCns(state._favCache), 0);
    } else if(state.favs.size){
      cleanupFavs();
    }
    migrateAwayFromListen();
    ensureFavAddedAt();
    if(state.inFavReview) state._favCache=favList();
    // migrate: seed pos from last global idx if missing for current context
    const pk=progressKey();
    if(state.pos[pk]==null && typeof d.idx==="number") state.pos[pk]=d.idx;
    recallPos();
  }catch(e){}
}
loadProgress();

/* ============================================================
   TEXT-TO-SPEECH
   ============================================================ */
let voices = [];
function loadVoices(){
  voices = window.speechSynthesis ? speechSynthesis.getVoices() : [];
  buildVoiceSelect();
}
/* Curated female voices, best-first. Robotic novelty voices are excluded. */
const FEMALE_VOICES = ["ava","allison","samantha","susan","zoe","nicky","joelle","serena",
  "stephanie","catherine","kate","martha","fiona","karen","moira","tessa","sandy","shelley",
  "flo","kathy","google us english","google uk english female","google uk english"];
function isGoodVoice(v){
  const n = v.name.toLowerCase();
  return FEMALE_VOICES.some(f=>n.includes(f)) || /premium|enhanced/.test(n);
}
function voiceScore(v){
  const n = v.name.toLowerCase(); let s = 0;
  if(/premium/.test(n)) s += 1000;
  else if(/enhanced/.test(n)) s += 600;
  if(n.includes("google")) s += 400;              // natural neural voice, no install needed
  const idx = FEMALE_VOICES.findIndex(f=>n.includes(f));
  if(idx>=0) s += (300 - idx*9);
  if(v.lang === state.settings.accent) s += 60;    // exact locale (e.g. en-US)
  return s;
}
function candidateVoices(){
  const acc = state.settings.accent;
  let list = voices.filter(v=>v.lang===acc && isGoodVoice(v));
  if(!list.length) list = voices.filter(v=>v.lang && v.lang.toLowerCase().startsWith("en") && isGoodVoice(v));
  return list.sort((a,b)=>voiceScore(b)-voiceScore(a));
}
function cleanName(n){ return n.replace(/\s*\(.*\)\s*/g,"").trim(); }
function buildVoiceSelect(){
  const sel = document.getElementById("voiceSel");
  if(!sel) return;              // 元素不在就安静退出，别让它掀翻整个脚本
  const list = candidateVoices();
  sel.innerHTML = list.length
    ? list.map(v=>`<option value="${v.voiceURI}">${cleanName(v.name)} · ${v.lang}</option>`).join("")
    : `<option value="">System default</option>`;
  if(list.find(v=>v.voiceURI===state.settings.voiceURI)) sel.value = state.settings.voiceURI;
  else { state.settings.voiceURI = list[0]?.voiceURI || ""; sel.value = state.settings.voiceURI; }
  updateVoiceHint(list[0]);
}
function isNatural(v){ const n=(v&&v.name||"").toLowerCase(); return /premium|enhanced/.test(n)||n.includes("google"); }
function updateVoiceHint(best){
  const el = document.getElementById("voiceHint");
  const warn = document.getElementById("voiceWarn");
  if(best && isNatural(best)){
    if(el) el.innerHTML = `<span class="ok-dot"></span> Using a natural voice: <b>${cleanName(best.name)}</b>.`;
    if(warn) warn.classList.remove("show");
  } else {
    if(el) el.innerHTML = `<b>${best?cleanName(best.name):"System"}</b> is a basic built-in voice. For a natural young US voice, install a <b>Premium</b> voice (see the note above) or open in <b>Chrome</b>.`;
    if(warn) warn.classList.add("show");
  }
}
function pickVoice(){
  return voices.find(v=>v.voiceURI===state.settings.voiceURI)
      || candidateVoices()[0]
      || voices.find(v=>v.lang===state.settings.accent)
      || voices.find(v=>v.lang && v.lang.startsWith("en"));
}
/* ⚠️ 这个调用必须留在这里 —— 它下面依赖的 FEMALE_VOICES 等等是 const，
   放到声明之前就会撞上暂时性死区（TDZ）。Chrome 第一次 getVoices() 返回空数组，
   碰不到那些常量所以看不出问题；iOS Safari 刷新时语音列表已经就绪、立刻返回完整列表，
   于是 ReferenceError 让整个脚本评估中断，页面只剩静态骨架（2026-10-08 查了很久）。 */
if(window.speechSynthesis){
  loadVoices();
  speechSynthesis.onvoiceschanged = loadVoices;
}
/* ============================================================
   声音 A（Kokoro af_heart）—— 和手机听练同一套音频，电脑/iPad 共用
   规则必须和 audio-tools/generate_audio.py 与 app-h17.js 三处完全一致：
   文件名 = SHA-256("声音配置\n规范化英文")，同形异音词再多拼一段 "pron"。
   取不到就退回系统语音，绝不让朗读卡死。
   iOS 只允许在用户手势里开始播放，所以 URL 和音频元素在句子渲染时就准备好，
   speak() 本身保持同步。
   ============================================================ */
const VOICE_A_PROFILE="kokoro-82m-v1.0-q8f16|af_heart|en-us|1.00";
const VOICE_A_OVERRIDES=new Set(["wind down"]);
const _voiceACache=new Map();     // canonical -> {url, el, ready}
let _voiceAEl=null;
function voiceABase(){ return favListenPublicBase().replace(/\/$/,""); }
function canonicalAudioText(text){
  let v=String(text||"");
  try{ v=v.normalize("NFC"); }catch(e){}
  v=v.replace(/\*/g,"").replace(/`/g,"");
  const han=/[㐀-䶿一-鿿豈-﫿]/;
  if(han.test(v)){
    v=v.replace(/[㐀-䶿一-鿿豈-﫿]/g," ");
    v=v.replace(/[，。！？：；、“”《》【】（）…·\/\\|]+/g," ");
  }
  return v.trim().replace(/\s+/g," ");
}
async function _sha256Hex(text){
  if(!(window.crypto&&crypto.subtle&&window.TextEncoder)) throw new Error("no subtle");
  const d=await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(d),b=>b.toString(16).padStart(2,"0")).join("");
}
/** 预加载这句的声音 A；拿不到就算了，speak() 会退回系统语音 */
async function prefetchVoiceA(en){
  const canonical=canonicalAudioText(en);
  if(!canonical || _voiceACache.has(canonical)) return;
  _voiceACache.set(canonical, {url:"", el:null, ready:false});
  try{
    let raw=VOICE_A_PROFILE+"\n"+canonical;
    if(VOICE_A_OVERRIDES.has(canonical)) raw+="\npron";
    const h=await _sha256Hex(raw);
    const url=voiceABase()+"/audio/"+h.slice(0,2)+"/"+h+".mp3";
    const el=new Audio();
    el.preload="auto";
    el.src=url;
    const rec={url, el, ready:false};
    el.addEventListener("canplaythrough", ()=>{ rec.ready=true; }, {once:true});
    el.addEventListener("error", ()=>{ rec.ready=false; rec.el=null; }, {once:true});
    _voiceACache.set(canonical, rec);
    // 缓存别无限涨
    if(_voiceACache.size>60){
      const first=_voiceACache.keys().next().value;
      if(first!==canonical) _voiceACache.delete(first);
    }
  }catch(e){ _voiceACache.set(canonical,{url:"",el:null,ready:false}); }
}
function stopVoiceA(){
  if(_voiceAEl){ try{ _voiceAEl.pause(); _voiceAEl.currentTime=0; }catch(e){} _voiceAEl=null; }
}
/** 能用声音 A 就播并返回 true；否则返回 false 交给系统语音 */
function playVoiceA(text, rate){
  const canonical=canonicalAudioText(text);
  const rec=_voiceACache.get(canonical);
  if(!rec || !rec.el || !rec.ready) return false;
  try{
    stopVoiceA();
    const el=rec.el;
    el.playbackRate=Math.max(0.5, Math.min(2, rate ?? state.settings.rate ?? 1));
    el.currentTime=0;
    const p=el.play();
    if(p && p.catch) p.catch(()=>{ _voiceAEl=null; speakSystem(text, rate); });
    _voiceAEl=el;
    return true;
  }catch(e){ return false; }
}

function speak(text, rate){
  stopFavLoop(false);
  stopVoiceA();
  try{ if(window.speechSynthesis) speechSynthesis.cancel(); }catch(e){}
  if(playVoiceA(text, rate)) return;      // 先用声音 A，没有才退回系统语音
  speakSystem(text, rate);
}
function speakSystem(text, rate){
  if(!window.speechSynthesis) return;
  _chatSpeakIdx=null;
  document.querySelectorAll(".msg-speak.playing").forEach(el=>el.classList.remove("playing"));
  try{ speechSynthesis.resume(); }catch(e){}   // TTS can get stuck "paused" after a tab switch (e.g. joining a meeting)
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const v = pickVoice();
  if(v){ u.voice=v; u.lang=v.lang; } else { u.lang = state.settings.accent; }
  u.rate = rate ?? state.settings.rate;
  u.pitch = 1;
  speechSynthesis.speak(u);
}

/* ---- 错题集听练：循环播放 ---- */
let _favLoopToken=0;
let _favLoopPlaying=false;
let _favLoopCount=0;
function favLoopLimit(){
  const n=+state.settings.favLoop;
  return (n===0 || n>0) ? n : 0; // 0 = ∞
}
function isFavAudioMode(){ return !!(state.inFavReview && state.settings && state.settings.favAudio); }
function stopFavLoop(updateUI){
  _favLoopToken++;
  _favLoopPlaying=false;
  _favLoopCount=0;
  try{ if(window.speechSynthesis) speechSynthesis.cancel(); }catch(e){}
  if(updateUI!==false) updateFavAudioUI();
}
function updateFavLoopStatus(){
  const el=$("favLoopStatus"); if(!el) return;
  if(!_favLoopPlaying){ el.textContent=""; return; }
  const lim=favLoopLimit();
  el.textContent = lim>0 ? (`第 ${_favLoopCount}/${lim} 遍`) : (`第 ${_favLoopCount} 遍 · ∞`);
}
function startFavLoop(rate){
  const s=current();
  if(!s||!s.en||!window.speechSynthesis) return;
  stopFavLoop(false);
  const token=++_favLoopToken;
  _favLoopPlaying=true;
  _favLoopCount=0;
  const lim=favLoopLimit();
  const playRate = rate ?? state.settings.rate;
  updateFavAudioUI();
  const finishOrNext=()=>{
    if(token!==_favLoopToken) return;
    _favLoopPlaying=false;
    // 有限遍数播完 → 自动下一句；∞ 或已是最后一句则停
    if(lim>0 && state.inFavReview && state.idx < state.order.length-1){
      updateFavLoopStatus();
      setTimeout(()=>{
        if(token!==_favLoopToken) return;
        next();
      }, 500);
      return;
    }
    updateFavAudioUI();
    const st=$("favLoopStatus");
    if(st && lim>0 && state.idx >= state.order.length-1)
      st.textContent="已到最后一句";
  };
  const playOnce=()=>{
    if(token!==_favLoopToken) return;
    if(lim>0 && _favLoopCount>=lim){
      finishOrNext();
      return;
    }
    _favLoopCount++;
    updateFavLoopStatus();
    try{ speechSynthesis.resume(); }catch(e){}
    const u=new SpeechSynthesisUtterance(s.en);
    const v=pickVoice();
    if(v){ u.voice=v; u.lang=v.lang; } else { u.lang=state.settings.accent; }
    u.rate=playRate; u.pitch=1;
    u.onend=()=>{
      if(token!==_favLoopToken) return;
      setTimeout(playOnce, 450);
    };
    u.onerror=()=>{
      if(token!==_favLoopToken) return;
      _favLoopPlaying=false;
      updateFavAudioUI();
    };
    speechSynthesis.speak(u);
  };
  playOnce();
}
function toggleFavAudioMode(){
  if(!state.inFavReview) return;
  state.settings.favAudio=!state.settings.favAudio;
  saveProgress();
  if(!state.settings.favAudio) stopFavLoop();
  renderAll();
  if(state.settings.favAudio) setTimeout(()=>startFavLoop(), 200);
}
function updateFavAudioUI(){
  const on=isFavAudioMode();
  const bar=$("favAudioBar");
  const modeBtn=$("favAudioModeBtn");
  const modeLabel=$("favAudioModeLabel");
  const card=document.querySelector(".card");
  if(bar) bar.classList.toggle("show", on);
  if(card) card.classList.toggle("fav-audio-mode", on);
  if(modeBtn){
    modeBtn.style.display=state.inFavReview?"inline-flex":"none";
    modeBtn.classList.toggle("on", on);
    modeBtn.style.color=on?"var(--brand)":"";
    modeBtn.style.borderColor=on?"#c7cff8":"";
    modeBtn.style.background=on?"var(--brand-weak)":"";
  }
  if(modeLabel) modeLabel.textContent=on?"听练中":"听练";
  const lim=favLoopLimit();
  document.querySelectorAll("#favLoopSeg button").forEach(b=>{
    b.classList.toggle("on", +b.dataset.loop===lim);
  });
  const cnBtn=$("favShowCnBtn"), noteBtn=$("favShowNoteBtn");
  if(cnBtn) cnBtn.classList.toggle("on", !!state.settings.favShowCn);
  if(noteBtn) noteBtn.classList.toggle("on", !!state.settings.favShowNote);
  const play=$("playBtn");
  if(play && on){
    play.innerHTML = _favLoopPlaying
      ? `<svg class="icon sm" viewBox="0 0 24 24"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg>停止循环`
      : `<svg class="icon sm" viewBox="0 0 24 24"><path d="M5 3l14 9-14 9V3z"/></svg>循环播放`;
  } else if(play && !on){
    play.innerHTML = `<svg class="icon sm" viewBox="0 0 24 24"><path d="M5 3l14 9-14 9V3z"/></svg>Play <span class="kbd">Space</span>`;
  }
  updateFavLoopStatus();
}

let _chatSpeakIdx = null;
function stopChatSpeak(){
  try{ speechSynthesis.cancel(); }catch(e){}
  _chatSpeakIdx=null;
  document.querySelectorAll(".msg-speak.playing").forEach(el=>el.classList.remove("playing"));
}
function toggleChatSpeak(idx, text, btn){
  if(!window.speechSynthesis) return;
  if(_chatSpeakIdx===idx){ stopChatSpeak(); return; }
  stopChatSpeak();
  _chatSpeakIdx=idx;
  if(btn) btn.classList.add("playing");
  const clean=(text||"").replace(/【正确】\s*/g,"").replace(/【地道】\s*/g,"").replace(/^⚠️.*$/gm,"").trim();
  if(!clean){ stopChatSpeak(); return; }
  try{ speechSynthesis.resume(); }catch(e){}
  const u=new SpeechSynthesisUtterance(clean);
  const v=pickVoice();
  if(v){ u.voice=v; u.lang=v.lang; } else { u.lang=state.settings.accent; }
  u.rate=state.settings.rate; u.pitch=1;
  u.onend=()=>{ if(_chatSpeakIdx===idx) stopChatSpeak(); };
  u.onerror=()=>{ if(_chatSpeakIdx===idx) stopChatSpeak(); };
  speechSynthesis.speak(u);
}

/* ============================================================
   SPEECH RECOGNITION
   ============================================================ */
/* ============================================================
   运行环境：同一个文件，电脑和 iPad 共用，靠运行时判断决定藏什么
   - IS_LOCAL：跑在本机 serve.py 上。只有这时才有 /api/fav-audio/*
     （Kokoro 模型和 Python 环境只在电脑上，GitHub Pages 上调不到）
   - IS_TOUCH：手指操作的设备。iPad Safari 其实有 webkitSpeechRecognition，
     但 continuous 不稳、每次还要授权麦克风，用户明确说 iPad 不要录音，只要朗读
   ============================================================ */
window.__srScriptStarted=true;
try{ sessionStorage.removeItem("srBootRetry"); }catch(e){}   // 跑起来了，清掉重试标记
const TRAINER_BUILD = "20261009-tokencopy";
const IS_LOCAL = location.protocol==="file:" || /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
const IS_TOUCH = (window.matchMedia && matchMedia("(pointer:coarse)").matches) || false;
const NO_MIC   = IS_TOUCH;   // 朗读照常，只去掉录音识别
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
let recog = null, active = false, finalized = false;
let priorFinal = "", sessionFinal = "", lastInterim = "";
let silenceTimer = null, noSpeechTimer = null, restartTimer = null, stableTimer = null, recordStart = 0;
const MAX_REC_MS = 40000;   // hard cap so it never runs away
if(!SR && !NO_MIC){ document.getElementById("micWarn").classList.add("show"); }
if(NO_MIC){
  // iPad：去掉麦克风按钮和识别结果区，保留 Play / Slow / Reveal
  ["micBtn","transcript"].forEach(id=>{ const el=document.getElementById(id); if(el) el.style.display="none"; });
  // 那条"去 macOS 系统设置下载 Ava/Zoe"的提示在 iPad 上没有意义，别让人白跑一趟
  const vw=document.getElementById("voiceWarn");
  if(vw){ vw.style.display="none"; vw.classList.remove("show"); }
}

function clearRecogTimers(){
  clearTimeout(silenceTimer); clearTimeout(noSpeechTimer);
  clearTimeout(restartTimer); clearTimeout(stableTimer);
}
function heardText(){ return (priorFinal+sessionFinal+lastInterim).trim(); }
function armSilence(){
  clearTimeout(silenceTimer);
  const ms = state.settings.silenceMs;      // auto-stop only after a long, deliberate pause
  if(ms>0) silenceTimer = setTimeout(stopRecognition, ms);
}
// Once the heard line stops changing, finish quickly (don't hang waiting on background noise).
function armStableStop(shown){
  clearTimeout(stableTimer);
  if(!shown || !active) return;
  const wait = Math.min(Math.max((state.settings.silenceMs||5000)*0.35, 1200), 2200);
  const snap = shown;
  stableTimer = setTimeout(()=>{
    if(active && heardText()===snap) stopRecognition();
  }, wait);
}
// One click starts, next click stops (this is the toggle the mic button calls).
function startRecognition(){
  if(!SR) return;
  if(active){ stopRecognition(); return; }
  active=true; finalized=false;
  priorFinal=""; sessionFinal=""; lastInterim="";
  recordStart=Date.now();
  const micBtn = document.getElementById("micBtn"), tr = document.getElementById("transcript");
  micBtn.classList.add("recording"); setMicLabel("Stop");
  tr.innerHTML = '<span style="color:var(--bad);font-weight:700">● Listening…</span> 说完后停顿一下，会自动出结果；也可点 <b>Stop</b>';
  clearRecogTimers();
  noSpeechTimer = setTimeout(()=>{ if(!heardText()) stopRecognition(); }, 12000);
  launchRecog();
}
// Create + start one recognition session. Chrome ends a session on its own after
// a short pause; we relaunch a fresh session (async — a synchronous restart throws
// InvalidStateError) so slow, word-by-word speech is never cut off mid-sentence.
function launchRecog(){
  recog = new SR();
  recog.lang = state.settings.accent;
  recog.interimResults = true;
  recog.maxAlternatives = 1;
  recog.continuous = true;
  recog.onresult = (e)=>{
    clearTimeout(noSpeechTimer);
    sessionFinal=""; let interim="";
    for(let i=0;i<e.results.length;i++){
      const r=e.results[i];
      if(r.isFinal) sessionFinal += r[0].transcript+" "; else interim += r[0].transcript;
    }
    lastInterim = interim;
    const shown = heardText();
    document.getElementById("transcript").innerHTML = `听到 · Heard: <b>${shown||"…"}</b>`;
    armSilence();
    armStableStop(shown);
  };
  recog.onerror = (e)=>{
    const tr = document.getElementById("transcript");
    if(e.error==="not-allowed" || e.error==="service-not-allowed"){
      tr.innerHTML = "麦克风被拦截 —— 请在浏览器允许麦克风访问。"; stopRecognition();
    } else if(e.error==="audio-capture"){
      tr.innerHTML = "用不了麦克风 —— 可能被<b>腾讯会议 / Zoom</b> 占用，或没有可用麦克风。退出会议后刷新重试。"; stopRecognition();
    }
    // "no-speech" / "aborted" are transient during pauses — ignored; onend decides.
  };
  recog.onend = ()=>{
    if(!active){ finalizeRecording(); return; }
    if((Date.now()-recordStart) >= MAX_REC_MS){ finalizeRecording(); return; }
    // Keep what we have, then relaunch so slow speech isn't cut off —
    // but re-arm silence/stable timers, otherwise we hang forever with "Heard" and no Got it.
    priorFinal += sessionFinal; sessionFinal=""; lastInterim = lastInterim||"";
    const already = heardText();
    clearTimeout(restartTimer);
    restartTimer = setTimeout(()=>{
      if(!active) return;
      try{
        launchRecog();
        if(already){ armSilence(); armStableStop(already); }
      }catch(err){ finalizeRecording(); }
    }, 180);
  };
  try{ recog.start(); }
  catch(err){ restartTimer = setTimeout(()=>{ if(active){ try{ recog.start(); }catch(e){ finalizeRecording(); } } }, 180); }
}
// Any stop path (Stop click, long silence, no-speech timeout) funnels through here.
function stopRecognition(){
  if(!active) return;
  active=false;
  clearRecogTimers();
  if(recog){ try{ recog.stop(); }catch(e){} }
  setTimeout(finalizeRecording, 250);                    // backstop if onend never fires
}
// Idempotent: shows the result exactly once, no matter how many paths call it.
function finalizeRecording(){
  if(finalized) return; finalized=true; active=false;
  clearRecogTimers();
  document.getElementById("micBtn").classList.remove("recording"); setMicLabel("Speak");
  const text = heardText();
  if(text) checkSpoken(text);
  else document.getElementById("transcript").innerHTML = "没听到声音 —— 点 Speak 再试一次。";
}
function setMicLabel(txt){ document.getElementById("micLabel").textContent = txt; }

/* ============================================================
   NORMALIZATION + CHECKING (the grammar diff)
   ============================================================ */
const CONTRACTIONS = {
  "i'm":"i am","you're":"you are","he's":"he is","she's":"she is","it's":"it is",
  "we're":"we are","they're":"they are","that's":"that is","there's":"there is",
  "what's":"what is","who's":"who is","here's":"here is","isn't":"is not","aren't":"are not",
  "wasn't":"was not","weren't":"were not","don't":"do not","doesn't":"does not","didn't":"did not",
  "can't":"cannot","won't":"will not","i've":"i have","you've":"you have","we've":"we have",
  "they've":"they have","i'll":"i will","you'll":"you will","he'll":"he will","she'll":"she will",
  "we'll":"we will","they'll":"they will","let's":"let us","i'd":"i would"
};
function normWords(s){
  s = " "+s.toLowerCase()+" ";
  for(const k in CONTRACTIONS){ s = s.split(k).join(CONTRACTIONS[k]); }
  return s.replace(/[^a-z0-9\s]/g," ").replace(/\s+/g," ").trim().split(" ").filter(Boolean);
}
function stem(w){
  return w.replace(/ies$/,"y").replace(/(ches|shes|xes|zes|ses)$/,m=>m.slice(0,-2))
          .replace(/ing$/,"").replace(/ed$/,"").replace(/s$/,"")
          .replace(/([a-z])\1$/,"$1");
}
function related(a,b){ if(a===b) return true; const sa=stem(a),sb=stem(b); return sa===sb||sa===b||sb===a; }

// LCS word alignment -> which target/hyp indices matched
function align(T,H){
  const n=T.length,m=H.length;
  const dp=Array.from({length:n+1},()=>new Array(m+1).fill(0));
  for(let i=n-1;i>=0;i--)for(let j=m-1;j>=0;j--)
    dp[i][j]= T[i]===H[j] ? dp[i+1][j+1]+1 : Math.max(dp[i+1][j],dp[i][j+1]);
  const mT=new Set(),mH=new Set(); let i=0,j=0;
  while(i<n&&j<m){
    if(T[i]===H[j]){mT.add(i);mH.add(j);i++;j++;}
    else if(dp[i+1][j]>=dp[i][j+1]) i++; else j++;
  }
  return {mT,mH};
}

function checkSpoken(rawHyp){
  const s = current();
  const T = normWords(s.en);
  const H = normWords(rawHyp);
  const {mT,mH} = align(T,H);
  const focusNorm = s.focus.map(f=>normWords(f)[0]);

  // per-target status
  const tStatus = T.map((w,i)=>({ w, matched:mT.has(i), focus:focusNorm.includes(w) }));

  // evaluate each focus word
  const issues=[]; let focusOK=true;
  const usedFocus={};
  focusNorm.forEach((fw,fi)=>{
    // find a target position with this word that is matched & not yet consumed
    let satisfied=false;
    for(let i=0;i<T.length;i++){
      if(T[i]===fw && mT.has(i) && !usedFocus[i]){ usedFocus[i]=true; satisfied=true; break; }
    }
    if(satisfied) return;
    focusOK=false;
    // was there a near-miss (wrong inflection) among unmatched hyp words?
    let sub=null;
    for(let j=0;j<H.length;j++){ if(!mH.has(j) && related(H[j],fw)){ sub=H[j]; break; } }
    const label = s.focus[fi];
    if(sub) issues.push(`You said <code>${sub}</code> — it needs <code>${label}</code>.`);
    else    issues.push(`Missing <code>${label}</code>.`);
  });

  const matchedCount = T.filter((_,i)=>mT.has(i)).length;
  const acc = Math.round(100*matchedCount/T.length);

  state.stats.attempt++;
  if(focusOK) state.stats.good++;
  renderStats();

  renderFeedback(focusOK, acc, issues, s);
  paintSentence(tStatus, true);

  // Speech recognition is imperfect — reveal the answer and let the user
  // confirm/override the verdict (the self-rate buttons record progress).
  state.pendingSpeech = { good: focusOK };
  $("selfRate").style.display = "flex";
}

/* ============================================================
   RENDERING
   ============================================================ */
const $ = id=>document.getElementById(id);
function curBatch(){
  const id=UNITS[state.unit].id;
  if(!state.batches[id]) state.batches[id]=genBatch(state.unit);
  else migrateBatchShape(state.batches[id], id);
  const b=state.batches[id];
  if(b.listen) b.listen=dedupeSentenceList(b.listen);
  if(b.speak) b.speak=dedupeSentenceList(b.speak);
  return b;
}
function curBatchNo(){
  const b=curBatch();
  return state.mode==="speak" ? (b.speakNo||1) : (b.listenNo||1);
}
function bdKey(id, mode){ return (id||UNITS[state.unit].id) + "|" + (mode||state.mode); }
function curBatchDone(){ const k=bdKey(); if(!state.batchDone[k]) state.batchDone[k]=new Set(); return state.batchDone[k]; }
function batchDoneSize(k){
  const v=state.batchDone[k];
  if(!v) return 0;
  if(typeof v.size==="number") return v.size;
  if(Array.isArray(v)) return v.length;
  return 0;
}
/** Total completed for unit+mode across all batches (not just current batch). */
function modeDoneCount(unitId, mode){
  if(mode==="chat") return state.chatByUnit[unitId]||0;
  const k=unitId+"|"+mode;
  let sealed=state.doneByKey[k]||0;
  const cur=batchDoneSize(k);
  const batch=state.batches[unitId];
  if(batch){
    migrateBatchShape(batch, unitId);
    const modeNo=mode==="speak"?(batch.speakNo||1):(batch.listenNo||1);
    const len=((batch[mode]&&batch[mode].length)||BATCH_SIZE);
    // Repair: older builds cleared batchDone on 换一批 without sealing into doneByKey
    if(sealed===0 && modeNo>1){
      sealed=(modeNo-1)*len;
      state.doneByKey[k]=sealed;
      state._railStatsDirty=true;
    }
  }
  return sealed+cur;
}
/** Fold one mode's current-batch completions into lasting totals before wiping. */
function sealModeProgress(id, mode){
  const k=bdKey(id, mode);
  const n=batchDoneSize(k);
  if(n) state.doneByKey[k]=(state.doneByKey[k]||0)+n;
}
function newBatch(){
  const id=UNITS[state.unit].id;
  const mode="speak";
  const b=curBatch();
  // snapshot so accidental 换一批 can be undone
  state.undoBatch[id] = {
    mode,
    listen:b.listen, speak:b.speak, listenNo:b.listenNo, speakNo:b.speakNo,
    idx:state.idx,
    done:[...(state.batchDone[bdKey(id,mode)]||[])],
    sealed:state.doneByKey[bdKey(id,mode)]||0
  };
  sealModeProgress(id, mode);
  const curList=b.speak;
  if(!state.lastBatchEn) state.lastBatchEn={};
  state.lastBatchEn[usedKey(id, mode)]=(curList||[]).map(s=>s&&s.en).filter(Boolean);
  archiveUsed(id, mode, curList);
  b.speak=[];
  b.speak=genModeSentences(state.unit, BATCH_SIZE, "speak", null, {allowRecycle:false});
  if(!b.speak.length){
    b.speak=genModeSentences(state.unit, BATCH_SIZE, "speak", null, {allowRecycle:true});
    const reused=b.speak._reused||0, favCount=b.speak._favCount||0;
    const parts=[];
    if(reused) parts.push(`<b>${reused}</b> 句单元旧题`);
    if(favCount) parts.push(`<b>${favCount}</b> 句错题集复习`);
    showBatchReuseTip(0, `这一单元没有未排入过的新句了。本批包含 ${parts.join("和")||"复习题"}。上一批的句子不会紧挨着再出现。`);
  } else if(b.speak._partialFresh){
    const newCount=b.speak._newCount||0, favCount=b.speak._favCount||0;
    const parts=[];
    if(newCount) parts.push(`<b>${newCount}</b> 句没练过的新句`);
    if(favCount) parts.push(`<b>${favCount}</b> 句错题集复习`);
    const lead=newCount?`本批包含 ${parts.join("和")}`:`本批没有新句，包含 ${parts.join("和")||"复习题"}`;
    const tail=!newCount?"这一单元没有未排入过的新句了":(b.speak._freshLeft||0)>0?"这一单元新题快用完了":"这一单元剩余新题已全部排入本批";
    showBatchReuseTip(0, `${lead}（${tail}）。`);
  } else {
    showBatchReuseTip(0);
  }
  rememberSentences(id, "speak", b.speak);
  archiveUsed(id, "speak", b.speak);
  b.speakNo=(b.speakNo||1)+1;
  state.idx=0;
  state.pos[id+"|"+mode]=0;
  state.batchDone[bdKey(id,mode)]=new Set();
  state.stats.batches++; rebuildOrder(); saveProgress();
}
function undoBatch(){
  const id=UNITS[state.unit].id, snap=state.undoBatch[id];
  if(!snap) return;
  const b=curBatch();
  const mode=snap.mode||state.mode;
  if(snap.listen) b.listen=snap.listen;
  if(snap.speak) b.speak=snap.speak;
  if(snap.listenNo!=null) b.listenNo=snap.listenNo;
  if(snap.speakNo!=null) b.speakNo=snap.speakNo;
  state.idx=snap.idx||0;
  state.batchDone[bdKey(id,mode)]=new Set(snap.done||[]);
  if(typeof snap.sealed==="number") state.doneByKey[bdKey(id,mode)]=snap.sealed;
  state.stats.batches=Math.max(0, state.stats.batches-1);
  delete state.undoBatch[id];
  rebuildOrder(); saveProgress(); renderAll();
}
function curList(){ if(state.inFavReview) return state._favCache; if(state.mode==="chat") return []; return curBatch()[state.mode]; }
function favFailCount(en){
  if(!en||!state.favFails) return 0;
  if(state.favFails[en]) return state.favFails[en];
  const n=normEn(en);
  if(n && state.favFails[n]) return state.favFails[n];
  for(const k of Object.keys(state.favFails)){
    if(normEn(k)===n) return state.favFails[k]||0;
  }
  return 0;
}
function favGotCount(en){
  if(!en||!state.favGots) return 0;
  if(state.favGots[en]) return state.favGots[en];
  const n=normEn(en);
  if(n && state.favGots[n]) return state.favGots[n];
  for(const k of Object.keys(state.favGots)){
    if(normEn(k)===n) return state.favGots[k]||0;
  }
  return 0;
}
function favAddedAt(en){
  if(!en||!state.favAddedAt) return 0;
  if(state.favAddedAt[en]) return state.favAddedAt[en];
  const n=normEn(en);
  if(n && state.favAddedAt[n]) return state.favAddedAt[n];
  for(const k of Object.keys(state.favAddedAt)){
    if(normEn(k)===n) return state.favAddedAt[k]||0;
  }
  return 0;
}
function favSortMode(){
  const s=state.settings&&state.settings.favSort;
  return (s==="recent"||s==="random") ? s : "fails";
}
function shuffleArray(arr){
  const a=arr||[];
  for(let i=a.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    const t=a[i]; a[i]=a[j]; a[j]=t;
  }
  return a;
}
function touchFavAdded(en){
  if(!en) return;
  if(!state.favAddedAt) state.favAddedAt={};
  const t=Date.now();
  state.favAddedAt[en]=t;
  const n=normEn(en);
  if(n && n!==en) state.favAddedAt[n]=t;
}
/** 给缺少收藏时间的旧句子补时间戳（按收藏 Set 插入顺序，越晚越大） */
function ensureFavAddedAt(){
  if(!state.favAddedAt) state.favAddedAt={};
  let base=Date.UTC(2024,0,1,0,0,0);
  let i=0;
  const bump=en=>{
    if(!en) return;
    if(favAddedAt(en)) return;
    const t=base+(i++)*60000;
    state.favAddedAt[en]=t;
    const n=normEn(en);
    if(n) state.favAddedAt[n]=t;
  };
  // Set 保持插入顺序 ≈ 收藏先后
  state.favs.forEach(bump);
  ["speak","chat"].forEach(m=>{
    (state.favOrderByMode&&state.favOrderByMode[m]||[]).forEach(bump);
  });
}
function recordFavPractice(en, missed){
  if(!en) return;
  if(!state.favFails) state.favFails={};
  if(!state.favGots) state.favGots={};
  if(missed) state.favFails[en]=(state.favFails[en]||0)+1;
  else state.favGots[en]=(state.favGots[en]||0)+1;
  scheduleFavListenSync();
}
function clearFavStats(en){
  if(state.favFails) delete state.favFails[en];
  if(state.favGots) delete state.favGots[en];
  if(state.favAddedAt) delete state.favAddedAt[en];
}
/** Sorted by current favSort — filtered to SPEAK or CHAT 错题集 */
function favListSorted(mode){
  const want=(mode==="chat"||(!mode && favBucket()==="chat"))?"chat":"speak";
  const out=[], seen=new Set();
  state.favs.forEach(en=>{
    if(!en||seen.has(en)) return;
    if((state.favModes&&state.favModes[en])!==want) return;
    const s=resolveFavSentence(en);
    if(!s || isPlaceholderCn(s.cn)) return;
    seen.add(s.en); seen.add(normEn(s.en));
    out.push(s);
  });
  const sortMode=favSortMode();
  if(sortMode==="random"){
    shuffleArray(out);
    return out;
  }
  const byRecent=sortMode==="recent";
  out.sort((a,b)=>{
    if(byRecent){
      const dt=favAddedAt(b.en)-favAddedAt(a.en);
      if(dt) return dt;
      const df=favFailCount(b.en)-favFailCount(a.en);
      if(df) return df;
      return (a.en||"").localeCompare(b.en||"");
    }
    const df=favFailCount(b.en)-favFailCount(a.en);
    if(df) return df;
    const dg=favGotCount(a.en)-favGotCount(b.en);
    if(dg) return dg;
    const dt=favAddedAt(b.en)-favAddedAt(a.en);
    if(dt) return dt;
    return (a.en||"").localeCompare(b.en||"");
  });
  return out;
}
/** Keep review order stable across leaving/returning; 从头开始 / 切换排序才重排. */
function syncFavOrder(forceResort, mode){
  cleanupFavs();
  ensureFavOrders();
  const bucket=mode==="chat"?"chat":(mode==="speak"?mode:favBucket());
  const sorted=favListSorted(bucket);
  const byEn=new Map(sorted.map(s=>[s.en,s]));
  const byNorm=new Map(sorted.map(s=>[normEn(s.en),s]));
  const cur=state.favOrderByMode[bucket]||[];
  if(forceResort || !cur.length){
    state.favOrderByMode[bucket]=sorted.map(s=>s.en);
    return state.favOrderByMode[bucket];
  }
  const seen=new Set();
  const next=[];
  cur.forEach(en=>{
    const s=byEn.get(en)||byNorm.get(normEn(en));
    if(!s||seen.has(s.en)) return;
    if((state.favModes&&state.favModes[s.en])!==bucket) return;
    seen.add(s.en); next.push(s.en);
  });
  sorted.forEach(s=>{ if(!seen.has(s.en)){ seen.add(s.en); next.push(s.en); } });
  state.favOrderByMode[bucket]=next;
  return next;
}
/** Practice list follows stable order for current 错题集 */
function favList(){
  syncFavOrder(false);
  const bucket=favBucket();
  const out=[], seen=new Set();
  (state.favOrderByMode[bucket]||[]).forEach(en=>{
    if((state.favModes&&state.favModes[en])!==bucket) return;
    const s=resolveFavSentence(en);
    if(!s || isPlaceholderCn(s.cn) || seen.has(s.en)) return;
    seen.add(s.en); out.push(s);
  });
  return out;
}
function restartFavReview(){
  if(!state.inFavReview) return;
  const key=progressKey();
  syncFavOrder(true);
  state._favCache=favList();
  state.idx=0;
  state.pos[key]=0;
  if(!state.posFavEn) state.posFavEn={};
  state.posFavEn[key]=(state._favCache[0]&&state._favCache[0].en)||"";
  rebuildOrder();
  saveProgress();
  renderAll();
}
function setFavSort(mode){
  const next=(mode==="recent"||mode==="random")?mode:"fails";
  if(favSortMode()===next && state.inFavReview){
    if(next==="random") restartFavReview(); // 再点随机 = 重新打乱
    return;
  }
  if(!state.settings) state.settings={};
  state.settings.favSort=next;
  if(state.inFavReview) restartFavReview();
  else { saveProgress(); updateFavSortUI(); }
}
function updateFavSortUI(){
  const bar=$("favSortBar"), seg=$("favSortSeg"), restart=$("restartFavBtn");
  if(bar) bar.style.display=state.inFavReview?"inline-flex":"none";
  if(seg){
    const cur=favSortMode();
    seg.querySelectorAll("button").forEach(b=>b.classList.toggle("on", b.dataset.sort===cur));
  }
  if(restart){
    restart.title=favSortMode()==="recent"
      ? "按最新收藏重新排序并从第一句开始"
      : favSortMode()==="random"
        ? "重新随机打乱并从第一句开始"
        : "按错误次数重新排序并从第一句开始";
  }
}
function buildFavExportText(){
  const list=favListSorted(favBucket());
  return list.map(s=>(s.en||"").trim()).filter(Boolean).join("\n")+(list.length?"\n":"");
}
function exportFavText(){
  const text=buildFavExportText();
  const stamp=new Date().toISOString().slice(0,10);
  const label=favModeLabel(favBucket());
  const blob=new Blob([text],{type:"text/plain;charset=utf-8"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");
  a.href=url;
  a.download="错题集-"+label+"-"+stamp+".txt";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(()=>URL.revokeObjectURL(url), 1000);
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).catch(()=>{});
  }
  const el=$("batchTip");
  if(el){
    const n=text?text.trim().split("\n").length:0;
    el.style.display="block";
    el.innerHTML="已导出 <b>"+n+"</b> 句英文 → <b>错题集-"+label+"-"+stamp+".txt</b>（同时已复制到剪贴板）。";
    clearTimeout(exportFavText._t);
    exportFavText._t=setTimeout(()=>{ if(el) el.style.display="none"; }, 5000);
  }
}
function rebuildOrder(){
  const n = curList().length;
  const o = Array.from({length:n}, (_,i)=>i);
  if(state.shuffle){ for(let i=n-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [o[i],o[j]]=[o[j],o[i]]; } }
  state.order = o;
}
function realIdx(){ return (state.order && state.order[state.idx]!=null) ? state.order[state.idx] : state.idx; }
function current(){
  const s=curList()[realIdx()] || curList()[0];
  if(!s||!s.en) return s;
  const c=state.customFavs&&(state.customFavs[s.en]||Object.values(state.customFavs).find(x=>x&&normEn(x.en)===normEn(s.en)));
  if(c && c.cn && !isPlaceholderCn(c.cn) && c.cn!==s.cn) return Object.assign({}, s, { cn:c.cn });
  return s;
}

/* Scenario tags — where you'll actually use the sentence */
const SCENE = {
  "UX/UI": { label:"UX / UI 设计", color:"#4338ca", bg:"#eef2ff" },
  "互联网": { label:"互联网 · 职场", color:"#0e7490", bg:"#e0f5fb" },
  "生活":   { label:"生活实用",     color:"#b45309", bg:"#fdf1dc" },
  "旅行":   { label:"旅行英语",     color:"#15803d", bg:"#e7f7ec" }
};

function renderRail(){
  const rail=$("rail");
  const star = `<svg viewBox="0 0 24 24" style="width:13px;height:13px;fill:#f5b301;stroke:none;vertical-align:-2px"><path d="M12 2l3 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.9 21l1.2-6.8-5-4.9 6.9-1z"/></svg>`;
  const favMeta=[
    {mode:"speak", title:"SPEAK 错题集", cn:"口译练习收藏"},
    {mode:"chat", title:"CHAT 错题集", cn:"对话选中收藏"}
  ];
  const favChips=favMeta.map(f=>{
    const on=state.inFavReview && favBucket()===f.mode;
    return `<div class="unit-chip fav-chip ${on?"active":""}" data-fav-mode="${f.mode}">
      <div class="u-tag">${star} ${f.mode.toUpperCase()}</div>
      <div class="u-title">${f.title}</div>
      <div class="u-cn">${f.cn}</div>
      <div class="u-prog">${favCount(f.mode)} 句</div>
    </div>`;
  }).join("");
  rail.innerHTML = favChips + UNITS.map((u,i)=>{
    let prog="未开始";
    if(state.mode==="chat"){
      const n=modeDoneCount(u.id,"chat");
      prog = n ? (`对话 ${n} 次`) : "未开始";
    } else {
      const n=modeDoneCount(u.id,"speak");
      prog = n ? (`口译 ${n} 题`) : "未开始";
    }
    return `<div class="unit-chip ${(i===state.unit && !state.inFavReview)?"active":""}" data-u="${i}">
      <div class="u-tag">UNIT ${i+1} · ${u.tag}</div>
      <div class="u-title">${u.title}</div>
      <div class="u-cn">${u.cn}</div>
      <div class="u-prog">${prog}</div>
    </div>`;
  }).join("");
  if(state._railStatsDirty){ state._railStatsDirty=false; saveProgress(); }
  rail.querySelectorAll(".fav-chip[data-fav-mode]").forEach(el=>{
    el.onclick=()=>enterFavReview(el.getAttribute("data-fav-mode"));
  });
  rail.querySelectorAll(".unit-chip[data-u]").forEach(el=>{
    el.onclick=()=>{
      stopFavLoop(false);
      rememberPos(); stashChat();
      state.inFavReview=false; state.unit=+el.dataset.u;
      rebuildOrder(); recallPos(); clampIdx();
      renderAll(); saveProgress();
    };
  });
}
function enterFavReview(mode){
  const bucket=mode==="chat"?"chat":"speak";
  // 已在同一错题集：不要重建列表，避免进度跳回
  if(state.inFavReview && favBucket()===bucket){
    renderAll(); saveProgress();
    return;
  }
  stopFavLoop(false);
  rememberPos(); stashChat();
  cleanupFavs();
  state.inFavReview=true;
  state.favReviewMode=bucket;
  // 错题集固定为口译练习（看中文说英文）
  state.mode="speak";
  syncFavOrder(false);
  state._favCache=favList();
  rebuildOrder();
  recallPos();
  clampIdx();
  renderAll(); saveProgress();
  refreshWeakFavCns(state._favCache);
}

function renderRule(){
  if(state.inFavReview){
    const label=favModeLabel(favBucket());
    const sortHint=favSortMode()==="recent"?"最新收藏":favSortMode()==="random"?"随机":"错误次数（错得多的靠前）";
    const where=favBucket()==="chat"
      ? "对话里「收藏这句」或框选收藏会进这里，用「看中文说英文」复习"
      : "Speak 练习里点☆收藏会进这里";
    const listenHint=state.settings&&state.settings.favAudio
      ? "当前是<strong>听练</strong>：英文常显，可设循环遍数或 ∞，中文/备注可点开。"
      : "也可点「听练」反复听这些句子（适合手机）。";
    $("ruleText").innerHTML =
      `<b>${label} 错题集</b> <span style="color:var(--muted)">Mistake review</span><br>
       <span style="color:var(--ink);font-weight:600">${where}。${listenHint} 两个错题集彼此独立；本轮顺序保持不变，可用上方排序或「从头开始」（${sortHint}）。</span>`;
    return;
  }
  const u=UNITS[state.unit];
  $("ruleText").innerHTML =
    `<b>Unit ${state.unit+1} · ${u.title}</b> <span style="color:var(--muted)">${u.cn}</span><br>
     <span style="color:var(--ink);font-weight:600">${u.cnDesc}</span>
     <small>${u.rule}</small>`;
}

function paintSentence(tStatus, checked){
  const el=$("sentence");
  if(state.revealed || checked){
    el.classList.remove("hidden-en");
    if(checked && tStatus){
      el.innerHTML = tStatus.map(t=>{
        let cls="w";
        if(t.matched) cls+= t.focus?" ok":" ok";
        else cls+= t.focus?" miss":" fade";
        return `<span class="${cls}">${t.w}</span>`;
      }).join(" ");
    } else {
      // plain reveal — just highlight focus words
      const s=current(); const fs=s.focus.map(f=>f.toLowerCase());
      el.innerHTML = s.en.split(" ").map(word=>{
        const bare=word.toLowerCase().replace(/[^a-z]/g,"");
        const isF = fs.includes(bare) || fs.includes(word.toLowerCase());
        return `<span class="w ${isF?"focus":""}">${word}</span>`;
      }).join(" ");
    }
  } else {
    // hidden (before reveal)。listen 模式已下线，state.mode 只可能是 speak / chat：
    // loadProgress 和 migrateFavModes 都会把旧存档里的 "listen" 转成 "speak"
    el.classList.add("hidden-en");
    el.textContent = "Say it in English, then Reveal.";
  }
}

function speakBeHint(s){
  if(!s||state.mode!=="speak") return "";
  const f=(s.focus||[]).map(x=>String(x).toLowerCase());
  if(f.includes("were")) return `<div class="cn-hint">提示：这句用 <b>were</b> — you / we / they 或复数名词的 be 过去式</div>`;
  if(f.includes("was")) return `<div class="cn-hint">提示：这句用 <b>was</b> — I / he / she / it 或单数名词的 be 过去式</div>`;
  if(f.includes("are")) return `<div class="cn-hint">提示：这句用 <b>are</b> — 中文里的「这些 / 们 / 我们 / 他们 / 你(敬语)」常对应复数</div>`;
  if(f.includes("am")) return `<div class="cn-hint">提示：这句用 <b>am</b> — 主语是 I（我）</div>`;
  if(f.includes("is")) return `<div class="cn-hint">提示：这句用 <b>is</b> — 中文里的「这个 / 这 / 那 / 他 / 她 / 它」常对应单数</div>`;
  return "";
}

function renderCard(){
  const card=document.querySelector(".card");
  // Chat mode takes over the whole card
  if(state.mode==="chat" && !state.inFavReview){
    card.classList.add("chat-mode");
    renderChat();
    return;
  }
  card.classList.remove("chat-mode");

  const s=current();
  const sameSentence=!!(s&&s.en&&state._cardEn===s.en);
  const keepRevealed=sameSentence&&state.revealed;
  const keepChecked=sameSentence&&state.checked;
  const keepPending=sameSentence?state.pendingSpeech:null;
  if(!sameSentence){
    state.revealed=false; state.checked=false; state.pendingSpeech=null;
  }
  state._cardEn=s&&s.en;

  // Empty favorites review
  if(state.inFavReview && !s){
    $("counter").textContent="0 / 0"; $("progFill").style.width="0%";
    $("undoBtn").style.display="none";
    if($("shuffleBtn")) $("shuffleBtn").style.display="none";
    if($("restartFavBtn")) $("restartFavBtn").style.display="none";
    if($("exportFavBtn")) $("exportFavBtn").style.display="none";
    if($("favAudioModeBtn")) $("favAudioModeBtn").style.display="none";
    stopFavLoop(false);
    updateFavAudioUI();
    updateFavSortUI();
    $("focusChip").style.display="none"; $("sceneChip").style.display="none";
    $("prompt").innerHTML = `<span style="color:var(--muted)">这个 ${favModeLabel(favBucket())} 错题集还是空的。在对应模式练习时点 <b>☆ 收藏</b>（Chat 也可框选收藏），句子会自动进这个集。</span>`;
    $("sentence").textContent=""; $("note").innerHTML=""; $("transcript").innerHTML="";
    hideFeedback(); $("selfRate").style.display="none"; updateFavBtn(); updateFavNoteUI();
    return;
  }

  const u = state.inFavReview ? null : UNITS[state.unit];
  // progress + batch info (bar = how much of this batch is completed)
  const listLen = state.order.length || curList().length;
  if(state.inFavReview){
    $("progFill").style.width = (100*(state.idx+1)/listLen)+"%";
    const fails=favFailCount(s.en), gots=favGotCount(s.en);
    $("counter").innerHTML = `${favModeLabel(favBucket())} 错题集 · ${state.idx+1} / ${listLen} · <span style="color:var(--bad)">错 ${fails}</span> · <span style="color:var(--good)">对 ${gots}</span>`;
    $("undoBtn").style.display="none";
    if($("shuffleBtn")) $("shuffleBtn").style.display="none";
    if($("restartFavBtn")) $("restartFavBtn").style.display="inline-flex";
    if($("exportFavBtn")) $("exportFavBtn").style.display="inline-flex";
    if($("favAudioModeBtn")) $("favAudioModeBtn").style.display="inline-flex";
  } else {
    const doneN = curBatchDone().size;
    $("progFill").style.width = (100*doneN/listLen)+"%";
    $("counter").innerHTML = `<span class="batch-no">第 ${curBatchNo()} 批</span> · 共 ${listLen} 句 · 已完成 <b style="color:var(--good)">${doneN}</b> · 当前第 ${state.idx+1} 句`;
    $("undoBtn").style.display = state.undoBatch[UNITS[state.unit].id] ? "inline-flex" : "none";
    if($("shuffleBtn")) $("shuffleBtn").style.display="inline-flex";
    if($("restartFavBtn")) $("restartFavBtn").style.display="none";
    if($("exportFavBtn")) $("exportFavBtn").style.display="none";
    if($("favAudioModeBtn")) $("favAudioModeBtn").style.display="none";
  }
  updateFavSortUI();
  $("focusChip").style.display="";
  $("focusChip").innerHTML = `<svg class="icon sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 2"/></svg> Watch: ${u ? u.watch : favModeLabel(favBucket())+" 错题集"}`;

  // scenario tag
  const sc = SCENE[s.scene];
  const scEl = $("sceneChip");
  if(sc){ scEl.textContent = sc.label; scEl.style.display="inline-flex"; scEl.style.color=sc.color; scEl.style.background=sc.bg; }
  else { scEl.style.display="none"; }

  // prompt line
  if(isFavAudioMode()){
    // 听练：英文常显；中文 / 备注按需显示
    state.revealed=true;
    const cnBlock=state.settings.favShowCn
      ? (isWeakFavCn(s.cn)
        ? `<span class="cn" style="color:var(--muted)">正在生成中文…</span>`
        : `<span class="cn">${escHtml(s.cn)}</span>`)
      : `<span style="color:var(--muted);font-size:13px">听不懂可点上方「显示中文」</span>`;
    $("prompt").innerHTML = `<span class="say-tag">错题听练 · 反复听这句</span><br>${cnBlock}`;
    if(state.settings.favShowCn && isWeakFavCn(s.cn)) ensureFavCn(s.en, true, false);
  } else if(state.mode==="speak"){
    if(state.inFavReview && needsPracticeCnRefresh(s.en, s.cn)) ensureFavCn(s.en, true, false);
    const cnHtml=isWeakFavCn(s.cn)
      ? `<span class="cn" style="color:var(--muted)">正在生成适合练习的中文…</span>`
      : `<span class="cn">${escHtml(s.cn)}</span>`;
    const editHint=state.inFavReview
      ? `<div style="margin-top:8px"><button type="button" class="btn mini ghost" id="favCnEditBtn">中文不准？编辑 / AI 重译</button></div>`
      : "";
    $("prompt").innerHTML = `<span class="say-tag">SAY IT IN ENGLISH · 用英文说出来</span><br>${cnHtml}${speakBeHint(s)}${editHint}`;
    const editBtn=$("favCnEditBtn");
    if(editBtn) editBtn.onclick=()=>openFavNoteModal(s.en);
  } else { // listen — Chinese stays hidden; reveal it only on click
    if(state.inFavReview && needsPracticeCnRefresh(s.en, s.cn)) ensureFavCn(s.en, true, false);
    const instr = `<span style="color:var(--muted)">Listen, then say it — English stays hidden until you Reveal.</span>`;
    if(state.settings.showcn){
      $("prompt").innerHTML = `${instr}<br><span class="cn" style="font-size:15px;font-weight:600">${isWeakFavCn(s.cn)?"正在翻译…":escHtml(s.cn)}</span>`;
    } else {
      $("prompt").innerHTML = `${instr}<br><button class="cn-reveal" id="cnRevealBtn" type="button"><svg class="icon sm" viewBox="0 0 24 24"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>显示翻译 Show meaning</button>`;
      const btn = document.getElementById("cnRevealBtn");
      if(btn) btn.onclick = ()=>{
        const cn=isWeakFavCn(current().cn)?"正在翻译…":escHtml(current().cn);
        btn.outerHTML = `<span class="cn" style="font-size:15px;font-weight:600">${cn}</span>`;
        if(isWeakFavCn(current().cn)) ensureFavCn(current().en, true);
      };
    }
  }

  paintSentence(null, !!keepChecked || isFavAudioMode());
  if(isFavAudioMode()){
    state.revealed=true;
    paintSentence(null,false);
    const noteHtml=state.settings.favShowNote ? (displayFavNote(s)||(s.note||"")||`<span style="color:var(--muted)">这句还没有备注</span>`) : "";
    $("note").innerHTML=noteHtml;
    $("selfRate").style.display="none";
  } else if(keepChecked){
    state.checked=true;
    state.revealed=true;
    $("note").innerHTML=displayFavNote(s)||(s.note||"");
    $("selfRate").style.display="none";
  } else if(keepRevealed){
    state.revealed=true;
    paintSentence(null,false);
    $("note").innerHTML=displayFavNote(s)||(s.note||"");
    $("selfRate").style.display="flex";
  } else {
    $("note").innerHTML = "";
    $("selfRate").style.display="none";
  }
  if(keepPending) state.pendingSpeech=keepPending;
  $("transcript").innerHTML="";
  if(!keepChecked) hideFeedback();
  updateFavBtn();
  updateFavNoteUI();
  updateFavAudioUI();
  // 提前把当前句和下一句的声音 A 拉好：iOS 只允许在点击手势里开始播放，
  // 等到按了 Play 再去算哈希、下文件就来不及了
  try{
    prefetchVoiceA(s.en);
    const nxt=state.order&&state.order[state.idx+1];
    const nse=nxt&&(nxt.en||(typeof nxt==="string"?nxt:""));
    if(nse) prefetchVoiceA(nse);
  }catch(e){}

  if(isFavAudioMode()){
    // 听练：换句后自动继续循环（∞ 或设定次数）
    if(!_favLoopPlaying || !sameSentence) setTimeout(()=>startFavLoop(), 180);
  } else if(state.settings.autoplay && state.mode!=="speak" && !keepRevealed && !keepChecked) setTimeout(()=>speak(s.en),250);
}
function getFavNote(en){ return (state.favNotes&&state.favNotes[en])||""; }
function setFavNote(en, text){
  if(!state.favNotes) state.favNotes={};
  const t=(text||"").trim();
  if(t) state.favNotes[en]=t; else delete state.favNotes[en];
}
function clearFavNote(en){ if(state.favNotes) delete state.favNotes[en]; }
/**
 * 用户在「收藏编辑」里改英文原句。英文是这个 app 的主键 —— 收藏集、错误次数、
 * 练习记录、批次缓存、音频文件名全靠它索引，所以改名必须把所有引用一起迁走，
 * 否则错误次数会丢、已练过的句子会重新发一遍。
 * 记进 state.userEnFixes 后，getUnitPool 会把句库里的旧写法也换成用户的版本，
 * 这样以后新发的批次不会又冒出旧句子。
 */
function applyUserEnEdit(oldEn, newEn){
  oldEn=String(oldEn||"").trim(); newEn=String(newEn||"").trim();
  if(!oldEn || !newEn || oldEn===newEn) return false;

  if(!state.userEnFixes) state.userEnFixes={};
  state.userEnFixes[oldEn]=newEn;

  const moveKey=obj=>{
    if(!obj || typeof obj!=="object" || !(oldEn in obj)) return;
    if(!(newEn in obj)) obj[newEn]=obj[oldEn];
    delete obj[oldEn];
  };
  const moveArr=arr=>Array.isArray(arr)
    ? arr.map(x=>x===oldEn?newEn:x).filter((x,i,a)=>a.indexOf(x)===i)
    : arr;

  if(state.favs && state.favs.has(oldEn)){ state.favs.delete(oldEn); state.favs.add(newEn); }
  [state.favModes,state.favNotes,state.favFails,state.favGots,state.favAddedAt,state.customFavs].forEach(moveKey);
  if(state.customFavs && state.customFavs[newEn]) state.customFavs[newEn].en=newEn;
  if(state.favOrderByMode){
    ["listen","speak","chat"].forEach(k=>{ state.favOrderByMode[k]=moveArr(state.favOrderByMode[k]||[]); });
  }
  [state.usedEn,state.recentEn,state.lastBatchEn].forEach(obj=>{
    if(!obj || typeof obj!=="object") return;
    for(const k in obj) obj[k]=moveArr(obj[k]);
  });
  state.recentMixedEn=moveArr(state.recentMixedEn||[]);
  // 当前批次里的那一句就地改掉，用户点保存马上能看到
  for(const uid in (state.batches||{})){
    const b=state.batches[uid]; if(!b) continue;
    for(const mode of ["listen","speak"]){
      if(!Array.isArray(b[mode])) continue;
      b[mode]=b[mode].map(x=>(x&&x.en===oldEn)?Object.assign({},x,{en:newEn}):x);
    }
  }
  for(const k in (state.batchDone||{})){
    const v=state.batchDone[k];
    if(v instanceof Set){ if(v.has(oldEn)){ v.delete(oldEn); v.add(newEn); } }
    else state.batchDone[k]=moveArr(v);
  }
  return true;
}
let _favNoteModalEn=null;
function openFavNoteModal(en){
  _favNoteModalEn=en;
  const enBox=$("favEnInput"); if(enBox) enBox.value=en||"";
  const noteBox=$("favNoteInput"); if(noteBox) noteBox.value=getFavNote(en);
  try{
    renderNoteImgStrip();
    const canImg=ghConf().ok;
    const btn=$("favNoteImgBtn"); if(btn) btn.disabled=!canImg;
    noteImgStatus(canImg ? "可直接粘贴截图（⌘V / Ctrl+V）" : "这台设备没填 GitHub Token，加不了图片（Settings 里填）", !canImg);
  }catch(e){}
  const cnBox=$("favCnInput");
  if(cnBox){
    const snap=state.customFavs&&state.customFavs[en];
    const resolved=resolveFavSentence(en);
    cnBox.value=(snap&&snap.cn)||(resolved&&resolved.cn)||"";
  }
  const modal=$("favNoteModal"); if(modal) modal.style.display="flex";
  if(cnBox) setTimeout(()=>cnBox.focus(), 50);
}
function closeFavNoteModal(){
  const modal=$("favNoteModal"); if(modal) modal.style.display="none";
  _favNoteModalEn=null;
}
/* ============================================================
   备注里的图片（2026-10-09）
   存法和音频一样：按内容哈希存进同一个仓库 notes/<前两位>/<hash>.jpg，
   备注正文里只留一个纯文本标记 [img:notes/ab/xxxx.jpg]。
   为什么不直接把图片 base64 塞进备注：备注要经过 Jsonbin（单条 100KB）、
   localStorage（约 5MB）和手机听练包，塞进去三处全会爆。
   上传需要 GitHub token，所以电脑和 iPad 能加，手机听练页只负责看。
   ============================================================ */
const NOTE_IMG_MAX_PX=1400;     // 长边上限
const NOTE_IMG_QUALITY=0.75;    // JPEG 质量：AI 讲解的小字能看清，又比原图省一半
const NOTE_IMG_RE=/\[img:([A-Za-z0-9_\-./]+)\]/g;

function noteImgUrl(path){
  if(/^https?:\/\//.test(path)) return path;
  return favListenPublicBase().replace(/\/$/,"")+"/"+String(path).replace(/^\//,"");
}
/** 备注正文 → HTML：先整体转义，再把图片标记换成 <img> */
function renderNoteHtml(note){
  const raw=String(note||"");
  if(!raw.trim()) return "";
  const esc=t=>t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  let out="", last=0, m;
  NOTE_IMG_RE.lastIndex=0;
  while((m=NOTE_IMG_RE.exec(raw))){
    out+=esc(raw.slice(last,m.index));
    const u=noteImgUrl(m[1]);
    out+=`<a href="${u}" target="_blank" rel="noopener"><img class="note-img" src="${u}" alt="备注图片" loading="lazy"></a>`;
    last=m.index+m[0].length;
  }
  out+=esc(raw.slice(last));
  return out;
}
/** 压缩成 JPEG：长边不超过 NOTE_IMG_MAX_PX */
function compressImageFile(file){
  return new Promise((resolve,reject)=>{
    const url=URL.createObjectURL(file);
    const img=new Image();
    img.onload=()=>{
      try{
        const scale=Math.min(1, NOTE_IMG_MAX_PX/Math.max(img.width,img.height));
        const w=Math.max(1,Math.round(img.width*scale)), h=Math.max(1,Math.round(img.height*scale));
        const c=document.createElement("canvas");
        c.width=w; c.height=h;
        const ctx=c.getContext("2d");
        ctx.fillStyle="#fff"; ctx.fillRect(0,0,w,h);   // 透明 PNG 转 JPEG 会变黑底
        ctx.drawImage(img,0,0,w,h);
        c.toBlob(b=>{ URL.revokeObjectURL(url); b?resolve(b):reject(new Error("压缩失败")); },"image/jpeg",NOTE_IMG_QUALITY);
      }catch(e){ URL.revokeObjectURL(url); reject(e); }
    };
    img.onerror=()=>{ URL.revokeObjectURL(url); reject(new Error("这个文件不是图片，或者读不出来")); };
    img.src=url;
  });
}
async function blobToB64(blob){
  const buf=new Uint8Array(await blob.arrayBuffer());
  return _u8ToB64(buf);
}
/** 传到仓库，返回 notes/xx/<hash>.jpg；内容一样就不重复上传 */
async function uploadNoteImage(file){
  const c=ghConf();
  if(!c.ok) throw new Error("这台设备没填 GitHub Token，加不了图片（Settings 里填）");
  const blob=await compressImageFile(file);
  const buf=await blob.arrayBuffer();
  const digest=await crypto.subtle.digest("SHA-256", buf);
  const hex=Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,"0")).join("");
  const path="notes/"+hex.slice(0,2)+"/"+hex+".jpg";
  const head=await ghRequest(`${GH_API}/repos/${c.repo}/contents/${encodeURIComponent(path)}?ref=main&t=${Date.now()}`,{method:"GET"});
  if(head.ok) return { path, kb:Math.round(blob.size/1024), reused:true };   // 同一张图早传过了
  if(head.status!==404){
    let tip="读取仓库失败 "+head.status;
    try{ const j=await head.clone().json(); if(j&&j.message) tip=j.message; }catch(e){}
    throw new Error(tip);
  }
  const res=await ghRequest(`${GH_API}/repos/${c.repo}/contents/${encodeURIComponent(path)}`,{
    method:"PUT", headers:{"Content-Type":"application/json"},
    body:JSON.stringify({ message:"Add note image", content:await blobToB64(blob), branch:"main" })
  });
  if(!res.ok){
    let tip="图片上传失败 "+res.status;
    try{ const j=await res.clone().json(); if(j&&j.message) tip=j.message; }catch(e){}
    throw new Error(tip);
  }
  return { path, kb:Math.round(blob.size/1024), reused:false };
}
function insertAtCursor(ta, text){
  if(!ta) return;
  const a=ta.selectionStart??ta.value.length, b=ta.selectionEnd??ta.value.length;
  const before=ta.value.slice(0,a), after=ta.value.slice(b);
  const pad=(before && !/\n$/.test(before)) ? "\n" : "";
  ta.value=before+pad+text+"\n"+after;
  const pos=(before+pad+text+"\n").length;
  ta.setSelectionRange(pos,pos);
  ta.focus();
}
function noteImgStatus(msg, bad){
  const el=$("favNoteImgMsg"); if(!el) return;
  el.textContent=msg||"";
  el.style.color = bad ? "var(--bad)" : "var(--muted)";
}
/** 预览条：把正文里的图片标记渲染成缩略图，可逐张删除 */
function renderNoteImgStrip(){
  const strip=$("favNoteImgStrip"), ta=$("favNoteInput");
  if(!strip||!ta) return;
  const paths=[]; let m;
  NOTE_IMG_RE.lastIndex=0;
  while((m=NOTE_IMG_RE.exec(ta.value))) paths.push(m[1]);
  if(!paths.length){ strip.style.display="none"; strip.innerHTML=""; return; }
  strip.style.display="flex";
  strip.innerHTML=paths.map((p,i)=>
    `<span class="note-thumb"><img src="${noteImgUrl(p)}" alt="图 ${i+1}" loading="lazy">`+
    `<button type="button" data-p="${p}" title="从备注里移除">×</button></span>`).join("");
  strip.querySelectorAll("button[data-p]").forEach(b=>{
    b.onclick=()=>{
      const p=b.getAttribute("data-p");
      ta.value=ta.value.split("[img:"+p+"]").join("").replace(/\n{3,}/g,"\n\n").trim();
      renderNoteImgStrip();
    };
  });
}
async function handleNoteImageFiles(files){
  const list=[...(files||[])].filter(f=>f && /^image\//.test(f.type));
  if(!list.length) return;
  const ta=$("favNoteInput");
  for(let i=0;i<list.length;i++){
    noteImgStatus(`正在处理第 ${i+1}/${list.length} 张…`);
    try{
      const r=await uploadNoteImage(list[i]);
      insertAtCursor(ta, "[img:"+r.path+"]");
      renderNoteImgStrip();
      noteImgStatus(r.reused ? `这张图之前传过，直接引用（${r.kb}KB）` : `已上传 ${r.kb}KB`);
    }catch(e){
      noteImgStatus("加图片失败："+((e&&e.message)||e), true);
      return;
    }
  }
}

function updateFavNoteUI(){
  const wrap=$("favNoteWrap"), panel=$("favNotePanel"), toggle=$("favNoteToggle"), text=$("favNoteText");
  const noteBtn=$("favNoteBtn"), noteBtnLabel=$("favNoteBtnLabel");
  const s=current();
  const on=s&&isFavInBucket(s.en, sourceFavBucket());
  if(!on||!s||state.mode==="chat"){
    if(wrap) wrap.style.display="none";
    if(panel) panel.style.display="none";
    if(noteBtn) noteBtn.style.display="none";
    return;
  }
  const note=getFavNote(s.en);
  if(noteBtn){
    noteBtn.style.display="inline-flex";
    if(noteBtnLabel) noteBtnLabel.textContent=note?"查看备注":"写备注";
  }
  if(wrap&&toggle&&panel&&text){
    wrap.style.display="block";
    panel.style.display="none";
    text.innerHTML=renderNoteHtml(note);
    toggle.textContent=note?"📝 查看备注":"📝 添加备注";
  }
}
function updateFavBtn(){
  const s=current();
  const bucket=sourceFavBucket();
  const on = s && isFavInBucket(s.en, bucket);
  const b=$("favBtn"); if(!b) return;
  b.classList.toggle("faved", !!on);
  b.classList.toggle("has-note", !!(on&&s&&getFavNote(s.en)));
  $("favLabel").textContent = on ? ("已收藏·"+favModeLabel(bucket)) : ("收藏·"+favModeLabel(bucket));
}

function renderFeedback(good, acc, issues, s){
  const fb=$("feedback"), t=$("fbTitle"), b=$("fbBody");
  fb.classList.remove("good","warn");
  fb.classList.add("show", good?"good":"warn");
  if(good){
    t.innerHTML=`<svg class="icon sm" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg> Grammar correct — ${acc}% match`;
    b.innerHTML = acc>=95 ? "Perfect. On to the next one." : "You nailed the target grammar. Minor word differences are fine.";
  } else {
    t.innerHTML=`<svg class="icon sm" viewBox="0 0 24 24"><path d="M12 9v4M12 17h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg> Almost — check the grammar`;
    b.innerHTML = `<ul>${issues.map(i=>`<li>${i}</li>`).join("")}</ul>
      <div style="margin-top:8px;font-size:13px;color:var(--muted)">Reminder: ${s.note}</div>
      <div style="margin-top:6px;font-size:12.5px;color:var(--faint)">语音识别不一定准。如果你其实说对了，点下面 <b>“Got it 我说对了”</b>；想重说就再点 <b>Speak</b>。</div>`;
  }
}
function hideFeedback(){ $("feedback").classList.remove("show","good","warn"); }

function renderStats(){
  $("statLearned").textContent=state.stats.learned||0;
  $("statBatches").textContent=state.stats.batches||0;
  if($("statChat")) $("statChat").textContent=state.stats.chatReplies||0;
  $("statAttempt").textContent=state.stats.attempt;
  $("statGood").textContent=state.stats.good;
  $("statAcc").textContent = state.stats.attempt? Math.round(100*state.stats.good/state.stats.attempt)+"%" : "–";
}

function markDone(){
  if(state.inFavReview) return;
  const id=UNITS[state.unit].id;
  curBatchDone().add(realIdx());
  // Side-rail total = sealed past batches (doneByKey) + current batchDone — don't +1 doneByKey here
  state.learnedByUnit[id]=(state.learnedByUnit[id]||0)+1;
  state.stats.learned=(state.stats.learned||0)+1;
  saveProgress(); renderRail(); renderStats();
}

function renderModes(){
  const modes=$("modes");
  if(modes) modes.style.display=state.inFavReview?"none":"";
  document.querySelectorAll("#modes button").forEach(b=>b.classList.toggle("on",b.dataset.mode===state.mode));
}
function renderAll(){ renderRail(); renderRule(); renderModes(); renderCard(); renderStats(); }

/* ============================================================
   NAVIGATION + EVENTS
   ============================================================ */
function next(){
  stopFavLoop(false);
  if(state.idx < state.order.length-1){ state.idx++; }
  else if(state.inFavReview){
    // 收藏复习到末尾就停，不跳单元
  } else if(state.mode==="speak"){
    // 本批练完 → 留在当前单元，自动换新一批
    newBatch();
  }
  saveProgress(); renderAll();
}
function prev(){
  stopFavLoop(false);
  if(state.idx>0){ state.idx--; }
  else if(!state.inFavReview && state.unit>0){
    rememberPos(); state.unit--; rebuildOrder(); recallPos(); clampIdx();
  }
  saveProgress(); renderAll();
}

$("playBtn").onclick=()=>{
  if(isFavAudioMode()){
    if(_favLoopPlaying) stopFavLoop();
    else startFavLoop();
    return;
  }
  speak(current().en);
};
$("slowBtn").onclick=()=>{
  if(isFavAudioMode()){ startFavLoop(0.6); return; }
  speak(current().en, 0.6);
};
$("revealBtn").onclick=()=>{ state.revealed=true; paintSentence(null,false); $("note").innerHTML=displayFavNote(current()); $("selfRate").style.display="flex"; };
$("micBtn").onclick=()=>startRecognition();   // self-toggles: start / Stop
$("nextBtn").onclick=next;
$("prevBtn").onclick=prev;
$("shuffleBtn").onclick=()=>{ if(state.inFavReview) return; newBatch(); renderAll(); };
if($("restartFavBtn")) $("restartFavBtn").onclick=()=>restartFavReview();
if($("exportFavBtn")) $("exportFavBtn").onclick=()=>exportFavText();
if($("favAudioModeBtn")) $("favAudioModeBtn").onclick=()=>toggleFavAudioMode();
if($("favLoopSeg")) $("favLoopSeg").onclick=(e)=>{
  const btn=e.target.closest("button[data-loop]");
  if(!btn) return;
  state.settings.favLoop=+btn.dataset.loop;
  saveProgress();
  updateFavAudioUI();
  if(isFavAudioMode() && _favLoopPlaying) startFavLoop();
};
if($("favShowCnBtn")) $("favShowCnBtn").onclick=()=>{
  state.settings.favShowCn=!state.settings.favShowCn;
  saveProgress();
  renderCard();
};
if($("favShowNoteBtn")) $("favShowNoteBtn").onclick=()=>{
  state.settings.favShowNote=!state.settings.favShowNote;
  saveProgress();
  renderCard();
};
if($("favSortSeg")) $("favSortSeg").onclick=(e)=>{
  const btn=e.target.closest("button[data-sort]");
  if(btn) setFavSort(btn.dataset.sort);
};
$("undoBtn").onclick=()=>undoBatch();
$("favBtn").onclick=()=>{
  const s=current(); if(!s) return;
  const bucket=sourceFavBucket();
  if(isFavInBucket(s.en, bucket)){
    removeFav(s.en);
  } else {
    upsertFav(s.en, bucket, { cn:s.cn, focus:s.focus, scene:s.scene, note:s.note });
    saveFavs();
    openFavNoteModal(s.en);
    updateFavBtn(); updateFavNoteUI(); renderRail();
    return;
  }
  saveFavs();
  if(state.inFavReview){
    state._favCache=favList();
    if(state.idx>=state._favCache.length) state.idx=Math.max(0,state._favCache.length-1);
    rebuildOrder(); renderAll();
  } else {
    updateFavBtn(); updateFavNoteUI(); renderRail();
  }
};
if($("favNoteBtn")) $("favNoteBtn").onclick=()=>{ const s=current(); if(s&&state.favs.has(s.en)) openFavNoteModal(s.en); };
if($("favNoteImgBtn")) $("favNoteImgBtn").onclick=()=>{ const f=$("favNoteImgFile"); if(f) f.click(); };
if($("favNoteImgFile")) $("favNoteImgFile").onchange=async e=>{
  await handleNoteImageFiles(e.target.files);
  e.target.value="";                     // 同一张图再选一次也要能触发
};
if($("favNoteInput")){
  // 截图直接粘贴：这是用户最常用的路径（问完 AI 截图 → ⌘V）
  $("favNoteInput").addEventListener("paste", e=>{
    const items=(e.clipboardData&&e.clipboardData.files)||[];
    const imgs=[...items].filter(f=>/^image\//.test(f.type));
    if(!imgs.length) return;             // 普通文字粘贴照旧
    e.preventDefault();
    handleNoteImageFiles(imgs);
  });
  $("favNoteInput").addEventListener("dragover", e=>{ if(e.dataTransfer&&e.dataTransfer.types.includes("Files")) e.preventDefault(); });
  $("favNoteInput").addEventListener("drop", e=>{
    const fs=(e.dataTransfer&&e.dataTransfer.files)||[];
    const imgs=[...fs].filter(f=>/^image\//.test(f.type));
    if(!imgs.length) return;
    e.preventDefault();
    handleNoteImageFiles(imgs);
  });
  $("favNoteInput").addEventListener("input", ()=>{ try{ renderNoteImgStrip(); }catch(e){} });
}
if($("favNoteToggle")) $("favNoteToggle").onclick=()=>{
  const s=current(); if(!s||!state.favs.has(s.en)) return;
  const note=getFavNote(s.en);
  if(!note){ openFavNoteModal(s.en); return; }
  const panel=$("favNotePanel"), toggle=$("favNoteToggle");
  const open=panel.style.display==="none";
  panel.style.display=open?"block":"none";
  toggle.textContent=open?"收起备注":"📝 查看备注";
};
if($("favNoteEdit")) $("favNoteEdit").onclick=()=>{ const s=current(); if(s) openFavNoteModal(s.en); };
if($("favNoteSave")) $("favNoteSave").onclick=()=>{
  if(!_favNoteModalEn) return;
  let en=_favNoteModalEn;
  const newEn=(($("favEnInput")&&$("favEnInput").value)||"").trim();
  if(newEn && newEn!==en){
    if(applyUserEnEdit(en, newEn)){ en=newEn; _favNoteModalEn=newEn; }
  }
  const cn=(($("favCnInput")&&$("favCnInput").value)||"").trim();
  if(cn){
    applyFavCn(en, cn, { ok:true });
    syncFavCacheCn(en);
  }
  setFavNote(en, $("favNoteInput").value);
  saveFavs(); closeFavNoteModal();
  updateFavNoteUI(); updateFavBtn();
  // 只刷新卡片，保留「我说对了 / 没说对」
  renderCard(); renderRail();
};
if($("favCnRetranslate")) $("favCnRetranslate").onclick=async ()=>{
  if(!_favNoteModalEn) return;
  const btn=$("favCnRetranslate");
  const en=_favNoteModalEn;
  if(btn){ btn.disabled=true; btn.textContent="翻译中…"; }
  const t=await ensureFavCn(en, false, true);
  if($("favCnInput") && t) $("favCnInput").value=t;
  syncFavCacheCn(en);
  if(btn){ btn.disabled=false; btn.textContent="AI 重译"; }
};
if($("favNoteSkip")) $("favNoteSkip").onclick=()=>{
  closeFavNoteModal();
  updateFavNoteUI(); updateFavBtn();
  renderCard(); renderRail();
};
if($("favNoteModal")) $("favNoteModal").onclick=e=>{
  if(e.target.id==="favNoteModal"){
    closeFavNoteModal();
    updateFavNoteUI(); updateFavBtn();
    renderCard(); renderRail();
  }
};
$("gotBtn").onclick=()=>{
  const s=current();
  if(state.pendingSpeech){ if(!state.pendingSpeech.good) state.stats.good++; state.pendingSpeech=null; }  // override ASR
  else { state.stats.attempt++; state.stats.good++; }                                                     // pure self-rate
  if(state.inFavReview && s){ recordFavPractice(s.en, false); saveProgress(); }
  renderStats(); markDone(); next();
};
$("missBtn").onclick=()=>{
  const s=current();
  if(state.pendingSpeech){ if(state.pendingSpeech.good) state.stats.good--; state.pendingSpeech=null; }
  else { state.stats.attempt++; }
  if(state.inFavReview && s){ recordFavPractice(s.en, true); saveProgress(); }
  renderStats(); markDone(); next();
};

// mode switch — 错题集内不显示此栏；若仍触发则离开错题集
document.querySelectorAll("#modes button").forEach(b=>b.onclick=()=>{
  const next=b.dataset.mode;
  if(next===state.mode && !state.inFavReview) return;
  rememberPos(); stashChat();
  state.inFavReview=false;
  state.mode=next;
  rebuildOrder(); recallPos(); clampIdx();
  renderAll(); saveProgress();
});

// settings
$("gearBtn").onclick=()=>$("settings").classList.toggle("open");
$("accentSel").onchange=e=>{ state.settings.accent=e.target.value; buildVoiceSelect(); saveProgress(); };
$("voiceSel").onchange=e=>{ state.settings.voiceURI=e.target.value; updateVoiceHint(voices.find(v=>v.voiceURI===e.target.value)); saveProgress(); };
$("voicePreviewBtn").onclick=()=>speak("Hi! I'm your speaking coach. Let's practice English together.");
$("rateRange").oninput=e=>{ state.settings.rate=+e.target.value; $("rateVal").textContent=(+e.target.value).toFixed(2)+"x"; saveProgress(); };
$("silRange").oninput=e=>{ state.settings.silenceMs=Math.round(+e.target.value*1000); $("silVal").textContent=(+e.target.value).toFixed(1)+"s"; saveProgress(); };
$("autoplayChk").onchange=e=>{ state.settings.autoplay=e.target.checked; saveProgress(); };
if($("favSyncPushBtn")) $("favSyncPushBtn").onclick=()=>pushFavListenSync({ quiet:false });
if($("favSyncPullBtn")) $("favSyncPullBtn").onclick=()=>pullAndMergeFavStats({ quiet:false });
if($("favSyncDownloadBtn")) $("favSyncDownloadBtn").onclick=()=>{
  try{
    const pack=buildFavListenPack();
    downloadFavListenPack(pack);
    updateFavSyncUI("已下载备用文件（"+pack.items.length+" 句）");
  }catch(e){ updateFavSyncUI("下载失败", true); }
};
if($("favSyncCopyBtn")) $("favSyncCopyBtn").onclick=async ()=>{
  const id=(state.settings.favSyncId||"").trim();
  if(!id){ updateFavSyncUI("请先点「生成 / 更新云同步」", true); return; }
  try{
    await navigator.clipboard.writeText(id);
    updateFavSyncUI("同步码已复制");
  }catch(e){
    updateFavSyncUI("复制失败，请手动选中上方同步码", true);
  }
};
if($("favSyncCopyLinkBtn")) $("favSyncCopyLinkBtn").onclick=async ()=>{
  const link=favListenPublicLink();
  try{
    await navigator.clipboard.writeText(link);
    updateFavSyncUI("手机链接已复制，发给自己用 Safari 打开即可");
  }catch(e){
    updateFavSyncUI("复制失败："+link, true);
  }
};
if($("favSyncAutoChk")) $("favSyncAutoChk").onchange=e=>{
  state.settings.favSyncAuto=!!e.target.checked;
  saveProgress();
};
if($("favAudioGenerateBtn")) $("favAudioGenerateBtn").onclick=()=>startFavAudioGenerate();
if($("favAudioCheckBtn")) $("favAudioCheckBtn").onclick=()=>checkFavAudioStatus({quiet:false});
if($("favAudioCleanupBtn")) $("favAudioCleanupBtn").onclick=()=>previewAndCleanFavAudio();
if($("jsonbinKey")) $("jsonbinKey").onchange=e=>{ state.settings.jsonbinKey=e.target.value.trim(); saveProgress(); };
if($("ghToken")) $("ghToken").oninput=$("ghToken").onchange=e=>{ state.settings.ghToken=e.target.value.trim(); saveProgress(); };
if($("ghRepo")) $("ghRepo").oninput=$("ghRepo").onchange=e=>{ state.settings.ghRepo=e.target.value.trim(); saveProgress(); };
/* Safari 对"自动填充过的密码框"会一直打码，光把 type 改成 text 看不见内容，
   用户会以为按钮坏了。重新赋一次 value 可以切断 Safari 的自动填充关联。
   同时在旁边标出"里面到底有没有东西、多少位" —— 不然空框和被打码的框长得一样。 */
function toggleSecretField(inputId, btnId, hintId){
  const inp=$(inputId), btn=$(btnId);
  if(!inp||!btn) return;
  const show=inp.type==="password";
  const v=inp.value;
  inp.type=show?"text":"password";
  try{ inp.value=v; }catch(e){}
  btn.textContent=show?"隐藏":"显示";
  updateSecretHint(inputId, hintId);
}
function updateSecretHint(inputId, hintId){
  const inp=$(inputId), el=$(hintId);
  if(!inp||!el) return;
  const n=(inp.value||"").trim().length;
  el.textContent = n ? ("已填 "+n+" 位") : "（空）";
  el.style.color = n ? "var(--muted)" : "var(--bad)";
}
if($("ghTokenShowBtn")) $("ghTokenShowBtn").onclick=()=>toggleSecretField("ghToken","ghTokenShowBtn","ghTokenHint");
if($("syncAlertClose")) $("syncAlertClose").onclick=()=>{
  _syncAlertMuted=true;
  const bar=$("syncAlert"); if(bar) bar.classList.remove("show");
};
if($("syncAlertRetry")) $("syncAlertRetry").onclick=async ()=>{
  const btn=$("syncAlertRetry");
  if(btn){ btn.disabled=true; btn.textContent="重试中…"; }
  _syncAlertMuted=false;
  try{ await pushFavListenSync({}); }catch(e){}
  if(btn){ btn.disabled=false; btn.textContent="重试"; }
};
if($("syncAlertOpen")) $("syncAlertOpen").onclick=()=>{
  const sec=$("settings");
  if(sec){
    sec.style.display="block";
    sec.scrollIntoView({ behavior:"smooth", block:"start" });
  }
};
if($("ghTestBtn")) $("ghTestBtn").onclick=async ()=>{
  const c=ghConf();
  if(!c.ok){ updateFavSyncUI("请先填写 GitHub Token 和 仓库（用户名/仓库名）。", true); return; }
  updateFavSyncUI("正在测试 GitHub 连接…");
  try{
    const sha=await ghGetSha();
    updateFavSyncUI("GitHub 连接正常："+c.repo+" / "+c.path+(sha?"（文件已存在，将覆盖更新）":"（文件尚未创建，首次会新建）")+"。现在可以点「生成 / 更新云同步」。");
  }catch(e){
    updateFavSyncUI("GitHub 连接失败："+((e&&e.message)||e)+"。检查 token 是否过期、仓库名是否正确、是否勾了该仓库的 Contents 读写。", true);
  }
};
if($("ghTokenCopyBtn")) $("ghTokenCopyBtn").onclick=async ()=>{
  const v=((state.settings&&state.settings.ghToken)||($("ghToken")&&$("ghToken").value)||"").trim();
  if(!v){ updateStateSyncUI("这台设备还没有 token"); return; }
  try{
    await navigator.clipboard.writeText(v);
    updateStateSyncUI("token 已复制 —— 到 iPad 的 Settings 里粘贴即可（同一个可以多台共用）");
  }catch(e){
    // 剪贴板被挡时改为显示出来，方便手动选中
    if($("ghToken")){ $("ghToken").type="text"; $("ghToken").select(); }
    if($("ghTokenShowBtn")) $("ghTokenShowBtn").textContent="隐藏";
    updateSecretHint("ghToken","ghTokenHint");
    updateStateSyncUI("请手动选中上方 token 复制");
  }
};
if($("ghTokenClearBtn")) $("ghTokenClearBtn").onclick=()=>{
  if($("ghToken")) $("ghToken").value="";
  state.settings.ghToken=""; saveProgress();
  updateSecretHint("ghToken","ghTokenHint");
  updateStateSyncUI("已清空这台设备上的 GitHub Token（清空后这台就不能加备注图片了）");
};
if($("jsonbinKeyShowBtn")) $("jsonbinKeyShowBtn").onclick=()=>toggleSecretField("jsonbinKey","jsonbinKeyShowBtn","jsonbinKeyHint");
if($("jsonbinKey")) $("jsonbinKey").addEventListener("input", ()=>updateSecretHint("jsonbinKey","jsonbinKeyHint"));
if($("ghToken")) $("ghToken").addEventListener("input", ()=>updateSecretHint("ghToken","ghTokenHint"));
if($("jsonbinKeyCopyBtn")) $("jsonbinKeyCopyBtn").onclick=async ()=>{
  const key=((state.settings&&state.settings.jsonbinKey)||($("jsonbinKey")&&$("jsonbinKey").value)||"").trim();
  if(!key){ updateFavSyncUI("还没有保存 Master Key", true); return; }
  try{
    await navigator.clipboard.writeText(key);
    updateFavSyncUI("Master Key 已复制——粘贴到手机听练页即可");
  }catch(e){
    // 剪贴板失败时改为显示，方便手动选中
    if($("jsonbinKey")){ $("jsonbinKey").type="text"; $("jsonbinKey").select(); }
    if($("jsonbinKeyShowBtn")) $("jsonbinKeyShowBtn").textContent="隐藏";
    updateFavSyncUI("请手动选中上方 Key 复制", true);
  }
};
document.addEventListener("visibilitychange", ()=>{
  if(document.visibilityState==="visible"){
    pullAndMergeFavStats({ quiet:true }).catch(()=>{});
    scheduleFavAudioCheck();
  }
});
window.addEventListener("focus", ()=>{
  pullAndMergeFavStats({ quiet:true }).catch(()=>{});
  scheduleFavAudioCheck();
});
if($("geminiKey")) $("geminiKey").onchange=e=>{ state.settings.geminiKey=e.target.value.trim(); _resolvedModel=null; _modelCandidates=null; saveProgress(); if(state.mode==="chat") renderChat(); };
if($("geminiModel")) $("geminiModel").onchange=e=>{ state.settings.geminiModel=normalizeGeminiModel(e.target.value); _resolvedModel=null; if($("geminiModel")) $("geminiModel").value=state.settings.geminiModel; saveProgress(); };
function applySettingsUI(){
  const s=state.settings;
  if($("rateRange")){ $("rateRange").value=s.rate; $("rateVal").textContent=(+s.rate).toFixed(2)+"x"; }
  if($("silRange")){ $("silRange").value=(s.silenceMs/1000); $("silVal").textContent=(s.silenceMs/1000).toFixed(1)+"s"; }
  if($("autoplayChk")) $("autoplayChk").checked=!!s.autoplay;
  if($("accentSel")) $("accentSel").value=s.accent;
  if($("geminiKey")) $("geminiKey").value=s.geminiKey||"";
  if($("jsonbinKey")) $("jsonbinKey").value=s.jsonbinKey||"";
  if($("ghToken")) $("ghToken").value=s.ghToken||"";
  if($("ghRepo")) $("ghRepo").value=s.ghRepo||"ZoeZeng1992/speak-right-listen";
  if($("geminiModel")) $("geminiModel").value=s.geminiModel||"gemini-3.5-flash";
  updateFavSyncUI();
}

// keyboard shortcuts
document.addEventListener("keydown",e=>{
  const t=e.target, tag=(t&&t.tagName)||"";
  if(tag==="SELECT"||tag==="INPUT"||tag==="TEXTAREA"||(t&&t.isContentEditable)) return;
  if(e.code==="Space"){ e.preventDefault(); $("playBtn").click(); }
  else if(e.key.toLowerCase()==="r"){ e.preventDefault(); startRecognition(); }
  else if(e.key==="Enter"){ e.preventDefault(); next(); }
  else if(e.key.toLowerCase()==="h"){ $("revealBtn").click(); }
  else if(e.key==="ArrowLeft"){ prev(); }
  else if(e.key==="ArrowRight"){ next(); }
});

/* ============================================================
   SELECTION LOOKUP — translation + IPA + audio + explanation
   Select any English word/sentence anywhere on the page.
   ============================================================ */
async function translateText(text){
  // Google (best for zh, handles sentences), fallback to MyMemory
  try{
    const r = await fetch("https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=zh-CN&dt=t&q="+encodeURIComponent(text));
    if(r.ok){ const j = await r.json(); const t = j[0].map(x=>x[0]).join(""); if(t) return t; }
  }catch(e){}
  try{
    const r = await fetch("https://api.mymemory.translated.net/get?q="+encodeURIComponent(text)+"&langpair=en|zh-CN");
    if(r.ok){ const j = await r.json(); return j.responseData && j.responseData.translatedText; }
  }catch(e){}
  return null;
}
async function lookupDict(word){
  try{
    const r = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/"+encodeURIComponent(word.toLowerCase()));
    if(!r.ok) return null;
    const entry = (await r.json())[0];
    const phon = entry.phonetics || [];
    const usEntry = phon.find(p=>/-us\./.test(p.audio||""));
    const ipa = (usEntry && usEntry.text) || entry.phonetic || (phon.find(p=>p.text)||{}).text || "";
    const audio = (usEntry && usEntry.audio) || (phon.find(p=>p.audio)||{}).audio || "";
    const meanings = (entry.meanings||[]).slice(0,2).map(m=>({pos:m.partOfSpeech, def:(m.definitions[0]||{}).definition||""}));
    return { ipa, audio, meanings };
  }catch(e){ return null; }
}

let lkToken = 0, lkAudioUrl = null, lkTextCur = "", lkCnCur = "";
function positionLookup(rect){
  const el = $("lookup");
  el.style.visibility = "hidden"; el.classList.add("show");
  const w = el.offsetWidth, h = el.offsetHeight;
  let left = Math.min(Math.max(8, rect.left), window.innerWidth - w - 8);
  let top = rect.bottom + 8;
  if(top + h > window.innerHeight - 8) top = Math.max(8, rect.top - h - 8);
  el.style.left = left+"px"; el.style.top = top+"px"; el.style.visibility = "visible";
}
function hideLookup(){ $("lookup").classList.remove("show"); }

function updateLkFavUI(){
  const en=lkTextCur;
  const bucket=sourceFavBucket();
  const on=isFavInBucket(en, bucket);
  const btn=$("lkFavBtn"), status=$("lkFavStatus");
  if(btn){
    btn.classList.toggle("on", !!on);
    btn.textContent = on
      ? ("已在 "+favModeLabel(bucket)+" 错题集 · 点此取消")
      : ("收藏到 "+favModeLabel(bucket)+" 错题集");
    btn.dataset.favMode=bucket;
  }
  if(status){
    status.textContent = "自动归入当前模式："+favModeLabel(bucket)
      +"（Speak→SPEAK · Chat→CHAT）";
  }
}
function lkCurrentCn(){
  const t=($("lkTrans")&&$("lkTrans").textContent||"").trim();
  if(!t || /翻译中|翻译失败|lk-loading/.test(t) || $("lkTrans").querySelector(".lk-loading"))
    return lkCnCur || "（对话收藏）";
  return t;
}
function favFromLookup(){
  const en=(lkTextCur||"").trim();
  if(!en || !/[a-zA-Z]/.test(en)) return;
  const bucket=sourceFavBucket();
  if(isFavInBucket(en, bucket)){
    removeFav(en);
    saveFavs();
    updateLkFavUI();
    renderRail();
    if(state.inFavReview){ state._favCache=favList(); rebuildOrder(); renderAll(); }
    return;
  }
  const result=upsertFav(en, bucket, {
    cn:lkCurrentCn(),
    focus:[],
    scene: bucket==="chat"?"对话":"生活",
    note: ""
  });
  saveFavs();
  if(isWeakFavCn(lkCurrentCn())) ensureFavCn(en, false);
  updateLkFavUI();
  renderRail();
  if(state.inFavReview && favBucket()===bucket){
    state._favCache=favList();
    rebuildOrder();
    renderAll();
  }
  if(result==="added"){ hideLookup(); openFavNoteModal(en); }
}

function openLookup(text, rect){
  const token = ++lkToken;
  lkTextCur = text; lkAudioUrl = null; lkCnCur = "";
  $("lkWord").textContent = text.length>44 ? text.slice(0,44)+"…" : text;
  $("lkIpa").textContent = "";
  $("lkTrans").innerHTML = '<span class="lk-loading">翻译中…</span>';
  const isWord = /^[a-zA-Z][a-zA-Z'’-]*$/.test(text);
  $("lkDefWrap").style.display = isWord ? "block" : "none";
  $("lkDef").innerHTML = isWord ? '<span class="lk-loading">加载中…</span>' : "";
  updateLkFavUI();
  positionLookup(rect);

  translateText(text).then(t=>{
    if(token!==lkToken) return;
    lkCnCur = t || "";
    $("lkTrans").textContent = t || "翻译失败 —— 请检查网络连接。";
    // refresh CN on already-favorited chat picks when translation arrives
    if(t && state.favs.has(text) && state.customFavs&&state.customFavs[text]){
      const prev=state.customFavs[text].cn||"";
      if(!prev || prev==="（对话收藏）" || prev==="（对话练习纠正）"){
        state.customFavs[text].cn=t;
        saveFavs();
      }
    }
    positionLookup(rect);
  });

  if(isWord){
    lookupDict(text).then(d=>{
      if(token!==lkToken) return;
      if(d){
        $("lkIpa").textContent = d.ipa || "";
        lkAudioUrl = d.audio || null;
        $("lkDef").innerHTML = d.meanings.length
          ? d.meanings.map(m=>`<div><span class="pos">${m.pos}</span>${m.def}</div>`).join("")
          : "—";
      } else {
        $("lkIpa").textContent = "";
        $("lkDef").textContent = "（词典未收录此词，可点 🔊 听发音、看上方翻译）";
      }
      positionLookup(rect);
    });
  }
}

$("lkAudio").onclick = ()=>{
  if(lkAudioUrl){ const a = new Audio(lkAudioUrl); a.play().catch(()=>speak(lkTextCur)); }
  else speak(lkTextCur);
};
$("lkClose").onclick = hideLookup;
if($("lkFavBtn")) $("lkFavBtn").onclick=(e)=>{
  e.preventDefault();
  e.stopPropagation();
  favFromLookup();
};

function handleSelection(){
  const sel = window.getSelection();
  if(!sel || sel.isCollapsed || sel.rangeCount===0) return;
  const text = sel.toString().trim().replace(/\s+/g," ");
  if(!text || text.length>140) return;
  if(!/[a-zA-Z]/.test(text)){ hideLookup(); return; }   // English only
  const rect = sel.getRangeAt(0).getBoundingClientRect();
  if(!rect.width && !rect.height) return;
  openLookup(text, rect);
}
document.addEventListener("mousedown", e=>{ if(!e.target.closest("#lookup")) hideLookup(); });
document.addEventListener("mouseup", e=>{ if(e.target.closest("#lookup")) return; setTimeout(handleSelection, 10); });
document.addEventListener("keydown", e=>{ if(e.key==="Escape") hideLookup(); });
window.addEventListener("scroll", hideLookup, true);

/* ============================================================
   CHAT / CONVERSATION MODE (Google Gemini, user's own free key)
   ============================================================ */
function escHtml(s){ return (s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
function escAttr(s){ return escHtml(s).replace(/"/g,"&quot;"); }
function geminiReady(){ return !!(state.settings.geminiKey && state.settings.geminiKey.trim()); }

function buildChatSystemPrompt(){
  const u=UNITS[state.unit];
  return [
    "You are a warm, patient English conversation tutor for a Chinese learner at an intermediate level.",
    "The learner is a product/UX designer. Keep topics relatable: everyday life, workplace & tech (UX/UI), and travel.",
    "Today's grammar focus: "+u.title+"（"+u.cn+"）. "+u.cnDesc,
    "SPOKEN ENGLISH ONLY (critical):",
    "- Sound like real talk at work or with friends — NOT textbook / email / formal writing.",
    "- Prefer short sentences. Use contractions when natural: I'm, don't, can't, it's, that's, we'll.",
    "- Prefer everyday wording: Can you… / Let's… / This button's too small / I gotta… (or I have to…).",
    "- Avoid stiff phrases: Please proceed / It is recommended / I would like to inquire / Kindly / Regarding the aforementioned.",
    "- Your questions and 【正确】/【地道】 lines must also sound spoken. If a grammar-correct sentence still sounds written, fix it in 【地道】.",
    "  Bad (written): I am unable to attend the meeting due to a prior commitment.",
    "  Good (spoken): I can't make the meeting — I've got something else.",
    "RULES:",
    "1. Ask ONE short, natural spoken question at a time in English (ideally using today's grammar). Keep each of your turns to 1–3 short sentences (plus the formatted lines below when needed).",
    "2. The learner will sometimes mix Chinese words into their English when they don't know a word. Understand what they mean and tell them the correct English word.",
    "3. Coaching after each learner reply (only when useful — do NOT force both every time):",
    "   A) GRAMMAR FIX — if there is a grammar/word-order/article/tense mistake, fix it with 【正确】 (still spoken English).",
    "   B) NATURAL / IDIOMATIC — if the sentence is stiff, textbook-y, Chinglish, or too formal/written. Prefer everyday spoken English a designer might actually say.",
    "4. FORMAT (critical — the app parses these markers):",
    "   - Grammar-correct sentence on its OWN line starting with 【正确】",
    "     Example: 【正确】I'll be working overtime every day next week.",
    "   - More natural / idiomatic alternative on its OWN line starting with 【地道】",
    "     Example: 【地道】Looks like I'll be working OT every day next week.",
    "   - Put a brief Chinese explanation in parentheses after these lines when helpful (why the grammar was wrong, and/or why the natural version sounds better).",
    "5. When to include which marker (IMPORTANT — avoid redundant coaching):",
    "   - Grammar wrong → include 【正确】.",
    "   - Include 【地道】 ONLY when it is clearly more natural AND meaningfully different from 【正确】 (or from the learner's sentence if there is no 【正确】).",
    "   - If 【正确】 already sounds natural enough for everyday conversation → DO NOT add 【地道】.",
    "   - Grammar OK but awkward / Chinglish / too written → skip 【正确】, include 【地道】.",
    "   - Already correct AND natural → no 【正确】 / 【地道】; just a short praise + follow-up question.",
    "   - Never invent a 【地道】 line that means something different from what the learner meant. Never duplicate nearly the same sentence in both boxes.",
    "6. After coaching, keep the conversation going with ONE friendly follow-up question. Stay encouraging and low-pressure.",
    "7. Grammar/idiom explanations go in Chinese; practice sentences stay in English."
  ].join("\n");
}

// Auto-detect a working model for this key (Google keeps changing which models
// new accounts can use), so the user never has to fiddle with model names.
// Prefer Gemini 3.x — 2.5-flash is blocked for many new API keys even when listed.
const GEMINI_PREFS=["gemini-3.5-flash","gemini-flash-latest","gemini-2.5-flash","gemini-2.5-flash-lite","gemini-3.1-flash-lite","gemini-flash-lite-latest","gemini-3-flash-preview","gemini-pro-latest"];
const STALE_GEMINI=/^gemini-2\.0(-|$)/;  // 2.0 常不可用；2.5 在 3.x 忙线时仍可作备用
let _resolvedModel = null;
let _modelCandidates = null;
function normalizeGeminiModel(name){
  const n=(name||"").trim().replace(/^models\//,"");
  if(!n || STALE_GEMINI.test(n)) return "gemini-3.5-flash";
  return n;
}
async function listGeminiModels(){
  if(_modelCandidates) return _modelCandidates;
  const key=state.settings.geminiKey.trim();
  try{
    const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(key)}`);
    if(r.ok){
      const j=await r.json();
      _modelCandidates=(j.models||[]).filter(m=>(m.supportedGenerationMethods||[]).includes("generateContent"))
        .map(m=>m.name.replace(/^models\//,""));
      return _modelCandidates;
    }
  }catch(e){}
  return [];
}
async function ensureModel(){
  if(_resolvedModel) return _resolvedModel;
  const preferred=normalizeGeminiModel(state.settings.geminiModel);
  const names=await listGeminiModels();
  if(names.length){
    const fresh=n=>!STALE_GEMINI.test(n)&&!/image|tts|live|embedding|robotics|veo|lyria|imagen|nano-banana/i.test(n);
    const chosen=GEMINI_PREFS.find(p=>names.includes(p)&&fresh(p))
      || names.find(n=>fresh(n)&&/flash/.test(n)&&!/thinking|exp|preview|lite/.test(n))
      || names.find(n=>fresh(n)&&/flash/.test(n))
      || (names.includes(preferred)?preferred:null)
      || names.find(n=>fresh(n)&&/gemini/.test(n))
      || GEMINI_PREFS.find(p=>names.includes(p))
      || names.find(n=>/gemini/.test(n));
    if(chosen){ _resolvedModel=chosen; return chosen; }
  }
  _resolvedModel=preferred; return preferred;
}
async function callGeminiOnce(model, contents, sys, opts){
  const temperature=(opts&&typeof opts.temperature==="number")?opts.temperature:0.8;
  const maxOutputTokens=(opts&&opts.maxOutputTokens)||1100;
  const url=`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(state.settings.geminiKey.trim())}`;
  const res=await fetch(url,{ method:"POST", headers:{"Content-Type":"application/json"},
    body:JSON.stringify({ systemInstruction:{parts:[{text:sys}]}, contents, generationConfig:{temperature, maxOutputTokens} }) });
  if(!res.ok){ let msg="HTTP "+res.status; try{ const e=await res.json(); msg=(e.error&&e.error.message)||msg; }catch(_){}
    const err=new Error(msg); err.status=res.status; throw err; }
  const data=await res.json();
  const cand=data.candidates&&data.candidates[0];
  const text=cand&&cand.content&&cand.content.parts&&cand.content.parts.map(p=>p.text||"").join("");
  if(!text) throw new Error("空回复（可能被安全策略拦截，或额度用尽）");
  return text.trim();
}
function isModelUnavailable(err){
  const m=String(err&&err.message||err||"");
  return /no longer available|not found|NOT_FOUND|is not found|unsupported|HTTP 404/i.test(m);
}
function isQuotaExceeded(err){
  const m=String(err&&err.message||err||"");
  return /quota|rate limit|RESOURCE_EXHAUSTED|exceeded your current quota|free_tier|HTTP 429/i.test(m);
}
/** Model overloaded / high demand — usually temporary; try another model. */
function isCapacityBusy(err){
  const m=String(err&&err.message||err||"");
  const st=err&&err.status;
  return st===503 || st===529 || /high demand|experiencing high demand|spikes in demand|try again later|overloaded|UNAVAILABLE|HTTP 503|temporarily unavailable|capacity|当前.*忙/i.test(m);
}
function shouldTryNextGeminiModel(err){
  return isQuotaExceeded(err) || isCapacityBusy(err) || isModelUnavailable(err);
}
function sleepMs(ms){ return new Promise(r=>setTimeout(r, ms)); }
function setChatBusyTip(tip){
  state.chat.busyTip=tip||"";
  try{ drawMessages(); }catch(e){}
}
function quotaRetrySeconds(err){
  const m=String(err&&err.message||err||"");
  const hit=m.match(/retry in\s*([0-9]+(?:\.[0-9]+)?)\s*s/i);
  return hit?Math.max(1, Math.ceil(parseFloat(hit[1]))):0;
}
function isLocationBlocked(err){
  const m=String(err&&err.message||err||"");
  return /location is not supported|FAILED_PRECONDITION.*location|not available in your country|User location/i.test(m);
}
function formatGeminiError(err){
  const msg=String(err&&err.message||err||"未知错误");
  if(isLocationBlocked(err)){
    return [
      "⚠️ Gemini 当前地区不可用（不是 Key 填错）。",
      "",
      "Google 的 Gemini API 在中国大陆等地区会直接拒绝请求。",
      "可以这样处理：",
      "1. 开代理 / VPN，把出口节点切到支持地区（如美日新），再刷新页面重试；",
      "2. 确认浏览器流量也走同一网络（系统代理或浏览器插件都行）；",
      "3. Speak 口译练习不依赖 Gemini，可以照常练。",
      "",
      "（技术信息："+msg.replace(/\s+/g," ").slice(0,160)+"）"
    ].join("\n");
  }
  if(isCapacityBusy(err)){
    return [
      "⚠️ 当前 Gemini 模型太忙了（Google 侧拥挤，不是你的问题）。",
      "",
      "已自动试过多个模型仍忙。可以：",
      "1. 等 20–30 秒后点下方「再试一次」；",
      "2. 换个 VPN 节点（美/日/新）后再试；",
      "3. Speak 口译不依赖 Gemini，可以先练那个。",
      "",
      "（技术信息："+msg.replace(/\s+/g," ").slice(0,180)+"）"
    ].join("\n");
  }
  if(isQuotaExceeded(err)){
    const sec=quotaRetrySeconds(err);
    const wait=sec?(`约 ${sec} 秒后` ):"稍等一会儿再";
    return [
      "⚠️ Gemini 免费额度暂时用完了（不是你的英语有问题）。",
      "",
      "可以这样处理：",
      "1. "+wait+"点「再试一次」；",
      "2. 打开 Settings，把模型换成 gemini-2.5-flash-lite 再试；",
      "3. 今天少用「AI 重译」（也会消耗同一额度）。",
      "",
      "（技术信息："+msg.replace(/\s+/g," ").slice(0,180)+"）"
    ].join("\n");
  }
  return "⚠️ 出错了："+msg+"\n（检查一下设置里的 Gemini API Key、模型名，或网络。）";
}
async function callGemini(){
  const sys=buildChatSystemPrompt();
  const contents=[{ role:"user", parts:[{text:"Let's begin. Ask me your first short question in English about today's topic."}] }];
  state.chat.history.forEach(m=> contents.push({ role: m.role==="user"?"user":"model", parts:[{text:m.text}] }));
  _resolvedModel=null; // 每次请求重新选，避免死盯忙线模型
  const preferred=normalizeGeminiModel(state.settings.geminiModel);
  const names=await listGeminiModels();
  const tried=new Set();
  // 忙碌时轮换不同容量池：2.5 / latest / 3.x / lite
  const queue=[
    preferred,
    "gemini-2.5-flash","gemini-2.5-flash-lite",
    "gemini-flash-latest","gemini-3.5-flash","gemini-flash-lite-latest","gemini-3.1-flash-lite",
    "gemini-3-flash-preview","gemini-pro-latest","gemini-2.0-flash",
    ...GEMINI_PREFS,
    ...names.filter(n=>/gemini/.test(n)&&!/image|tts|live|embedding/i.test(n))
  ];
  let lastErr=null;
  let sawRetryable=false;
  let attempt=0;
  for(const model of queue){
    if(!model || tried.has(model)) continue;
    tried.add(model);
    attempt++;
    if(attempt>1){
      setChatBusyTip("模型忙，正在换 "+model+" 重试…");
      await sleepMs(450 + Math.min(1200, attempt*180));
    }
    try{
      const text=await callGeminiOnce(model, contents, sys);
      _resolvedModel=model;
      if(state.settings.geminiModel!==model){
        state.settings.geminiModel=model;
        if($("geminiModel")) $("geminiModel").value=model;
        saveProgress();
      }
      setChatBusyTip("");
      return text;
    }catch(err){
      lastErr=err;
      if(shouldTryNextGeminiModel(err)){
        sawRetryable=true;
        _resolvedModel=null;
        continue;
      }
      setChatBusyTip("");
      throw err;
    }
  }
  setChatBusyTip("");
  if(sawRetryable && lastErr) throw lastErr;
  throw lastErr||new Error("没有可用的 Gemini 模型");
}

function parseAiHtml(text){
  return text.split("\n").map(line=>{
    const g=line.match(/^\s*【正确】\s*(.+)$/);
    if(g){
      const en=g[1].trim(), faved=isFavInBucket(en,"chat");
      return `<span class="fix"><span class="fix-tag">语法修正</span><span class="fix-en">✓ ${escHtml(en)}</span><span class="fix-save ${faved?"saved":""}" data-en="${escAttr(en)}">${faved?"已收藏·CHAT":"收藏这句"}</span></span>`;
    }
    const n=line.match(/^\s*【地道】\s*(.+)$/);
    if(n){
      const en=n[1].trim(), faved=isFavInBucket(en,"chat");
      return `<span class="fix natural"><span class="fix-tag">更地道的说法</span><span class="fix-en">★ ${escHtml(en)}</span><span class="fix-save ${faved?"saved":""}" data-en="${escAttr(en)}">${faved?"已收藏·CHAT":"收藏这句"}</span></span>`;
    }
    return escHtml(line);
  }).join("\n");
}
function drawMessages(){
  const box=$("chatMessages"); if(!box) return;
  const speakIcon=`<svg class="icon sm" viewBox="0 0 24 24"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14"/></svg>`;
  box.innerHTML = state.chat.history.map((m,i)=>{
    if(m.role==="user") return `<div class="msg user">${escHtml(m.text)}</div>`;
    const playing=_chatSpeakIdx===i?" playing":"";
    const isErr=/^⚠️/.test(m.text||"");
    const retry=isErr?`<div style="margin-top:10px"><button type="button" class="btn mini primary chat-retry" data-i="${i}">再试一次</button></div>`:"";
    return `<div class="msg ai"><button type="button" class="msg-speak${playing}" data-i="${i}" title="播放 / 再点停止">${speakIcon}</button><div class="msg-body">${parseAiHtml(m.text)}${retry}</div></div>`;
  }).join("") + (state.chat.busy?`<div class="msg ai typing">${escHtml(state.chat.busyTip||"正在思考…")}</div>`:"");
  box.querySelectorAll(".fix-save").forEach(el=>{ el.onclick=()=>toggleChatFav(el.getAttribute("data-en"), el); });
  box.querySelectorAll(".msg-speak").forEach(btn=>{
    btn.onclick=(e)=>{
      e.stopPropagation();
      const i=+btn.getAttribute("data-i");
      const msg=state.chat.history[i];
      if(msg) toggleChatSpeak(i, msg.text, btn);
    };
  });
  box.querySelectorAll(".chat-retry").forEach(btn=>{
    btn.onclick=(e)=>{
      e.stopPropagation();
      retryLastChatTurn(+btn.getAttribute("data-i"));
    };
  });
  box.scrollTop=box.scrollHeight;
}
function toggleChatFav(en, el){
  if(isFavInBucket(en, "chat")){
    removeFav(en);
    saveProgress();
    el.classList.toggle("saved", false); el.textContent="收藏这句";
    renderRail();
    return;
  }
  upsertFav(en, "chat", { cn:"（对话练习纠正）", focus:[], scene:"对话", note:"" });
  saveProgress();
  ensureFavCn(en, false);
  openFavNoteModal(en);
  el.classList.add("saved"); el.textContent="已收藏·CHAT";
  renderRail();
}
async function sendToGemini(){
  if(state.chat.busy) return;
  state.chat.busy=true; state.chat.busyTip=""; drawMessages();
  try{ const reply=await callGemini(); state.chat.history.push({role:"model", text:reply}); }
  catch(err){ state.chat.history.push({role:"model", text:formatGeminiError(err)}); }
  state.chat.busy=false; state.chat.busyTip=""; stashChat(); saveProgress(); drawMessages();
}
function retryLastChatTurn(errIdx){
  if(state.chat.busy || !geminiReady()) return;
  // 去掉这条错误回复，保留用户上一句，再请求一次
  if(typeof errIdx==="number" && state.chat.history[errIdx] && state.chat.history[errIdx].role==="model"){
    state.chat.history.splice(errIdx, 1);
  }else{
    const last=state.chat.history[state.chat.history.length-1];
    if(last && last.role==="model" && /^⚠️/.test(last.text||"")) state.chat.history.pop();
  }
  _resolvedModel=null;
  _modelCandidates=null;
  stashChat(); saveProgress(); drawMessages();
  sendToGemini();
}
function startChat(){
  const id=UNITS[state.unit].id;
  stopChatSpeak();
  state.chat={ unitId:id, history:[], busy:false };
  state.chats[id]=[];
  updateChatStat();
  drawMessages(); sendToGemini();
}
function countChatReplies(history){
  return (history||[]).filter(m=>m.role==="user").length;
}
function updateChatStat(){
  const el=$("chatStat"); if(!el) return;
  const id=UNITS[state.unit].id;
  const topic=countChatReplies(state.chat.unitId===id ? state.chat.history : state.chats[id]);
  const unit=state.chatByUnit[id]||topic;
  el.innerHTML = `本话题 <b>${topic}</b> 次 · 本单元累计 <b>${unit}</b> 次`;
}
function noteChatReply(){
  const id=UNITS[state.unit].id;
  state.stats.chatReplies=(state.stats.chatReplies||0)+1;
  state.chatByUnit[id]=(state.chatByUnit[id]||0)+1;
  updateChatStat(); renderStats(); renderRail();
}
function renderChat(){
  const lbl=$("chatUnitLabel"); if(lbl) lbl.textContent=UNITS[state.unit].title+"（"+UNITS[state.unit].cn+"）";
  updateChatStat();
  const box=$("chatMessages"); if(!box) return;
  if(!geminiReady()){
    box.innerHTML=`<div class="chat-setup">对话模式需要一个<b>免费的 Gemini API Key</b>（不用绑卡）。<br>去 <b>aistudio.google.com</b> 拿一个，填进设置即可开始。<br><button class="btn primary" id="chatOpenSettings">打开设置填 Key</button></div>`;
    const b=$("chatOpenSettings"); if(b) b.onclick=()=>$("settings").classList.add("open");
    return;
  }
  if(state.chat.busy){ drawMessages(); return; }
  const id=UNITS[state.unit].id;
  if(state.chat.unitId===id && state.chat.history.length){ drawMessages(); return; }
  if(loadChatForUnit(id)){ drawMessages(); return; }
  startChat();
}

/* chat input controls */
(function wireChat(){
  const inp=$("chatInput"), send=$("chatSend"), mic=$("chatMic"), restart=$("chatRestart");
  function doSend(){
    const t=(inp.value||"").trim(); if(!t || state.chat.busy || !geminiReady()) return;
    inp.value=""; inp.style.height="auto";
    state.chat.history.push({role:"user", text:t});
    noteChatReply();
    stashChat(); saveProgress(); drawMessages(); sendToGemini();
  }
  if(send) send.onclick=doSend;
  if(inp){
    inp.addEventListener("keydown", e=>{ if(e.key==="Enter" && !e.shiftKey){ e.preventDefault(); doSend(); } });
    inp.addEventListener("input", ()=>{ inp.style.height="auto"; inp.style.height=Math.min(inp.scrollHeight,120)+"px"; });
  }
  if(restart) restart.onclick=()=>{ if(geminiReady()) startChat(); };
  // voice input (English) into the chat box
  let cr=null, crRec=false;
  if(mic) mic.onclick=()=>{
    if(!SR) return;
    if(crRec){ if(cr) cr.stop(); return; }
    cr=new SR(); cr.lang=state.settings.accent; cr.interimResults=true; cr.continuous=true;
    const base=inp.value?inp.value.trim()+" ":""; let fin="";
    cr.onstart=()=>{ crRec=true; mic.classList.add("recording"); };
    cr.onresult=(e)=>{ let it="",f=""; for(let i=0;i<e.results.length;i++){ const r=e.results[i]; if(r.isFinal) f+=r[0].transcript+" "; else it+=r[0].transcript; } fin=f; inp.value=base+f+it; inp.style.height="auto"; inp.style.height=Math.min(inp.scrollHeight,120)+"px"; };
    cr.onerror=()=>{}; cr.onend=()=>{ crRec=false; mic.classList.remove("recording"); inp.value=(base+fin).trim(); inp.focus(); };
    try{ cr.start(); }catch(e){}
  };
})();

/* init */
applySettingsUI();
try{
  updateSecretHint("jsonbinKey","jsonbinKeyHint");
  updateSecretHint("ghToken","ghTokenHint");
  // Safari 可能把同一条钥匙串自动填进两个框，晚一点再量一次
  setTimeout(()=>{ updateSecretHint("jsonbinKey","jsonbinKeyHint"); updateSecretHint("ghToken","ghTokenHint"); }, 1200);
}catch(e){}
/* 线上版是单文件，整页都会被缓存。和手机听练一样用版本号兜底：
   发现线上版本号和自己不一样就亮横幅，点一下带时间戳重载。 */
if($("stateSyncBtn")) $("stateSyncBtn").onclick=()=>{
  updateStateSyncUI("正在同步进度…");
  syncTrainerState({quiet:false}).then(ch=>{ if(ch) renderAll(); });
};
/* 开页先和云端对齐一次：iPad 打开就能拿到电脑的收藏和进度 */
setTimeout(()=>{ syncTrainerState({quiet:true}).then(ch=>{ if(ch) renderAll(); }); }, 900);
if(!IS_LOCAL){
  fetch("trainer-version.json?t="+Date.now(),{cache:"no-store"})
    .then(r=>r.json())
    .then(j=>{
      if(j && j.build && j.build!==TRAINER_BUILD){
        const el=document.getElementById("updWarn");
        document.getElementById("updNew").textContent=j.build;
        el.classList.add("show");
        el.onclick=()=>location.replace(location.pathname+"?v="+encodeURIComponent(j.build));
      }
    })
    .catch(()=>{});
}
if(IS_LOCAL){
  checkFavAudioStatus({quiet:true});
  fetch("/api/fav-audio/job?t="+Date.now(),{cache:"no-store"}).then(r=>r.json()).then(job=>{
    if(job&&job.state==="running") pollFavAudioJob();
    else renderFavAudioJob(job);
  }).catch(()=>{});
}else{
  // iPad / 线上：生成音频是电脑本机的活儿，整块藏掉，免得点了没反应
  const box=document.getElementById("favAudioGenerateBtn");
  if(box && box.parentNode && box.parentNode.parentNode) box.parentNode.parentNode.style.display="none";
}
if(state.inFavReview) state._favCache=favList();
rebuildOrder();
recallPos();
clampIdx();
if(state.mode==="chat") loadChatForUnit(UNITS[state.unit].id);
renderAll();
window.__srInitDone=true;
renderStats();
