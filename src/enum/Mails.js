import Mail from "../data/Mail";
import {
  ANONYMOUS, COMPANY_ALT, COMPANY_ALT_INTERNAL, COMPANY_INTERNAL,
  NO_REPLY, ME,
  ME_ALT,
  MANAGER, SPY, MANAGER_ALT, SUPER_MANAGER_ALT, SECURITY_DEPT,
  SPAM_SENDER, COMPANY, HR_DEPT, MANAGER_NEW_RESOURCE, MANAGER_NEW_ID,
  DIRECTOR_ALT, DIRECTOR_ALT_TUTOR, DIRECTOR_ALT_KID,
  RANDOM_EMPLOYEE_ALT
} from "./Names";
import PASSWORDS from "./Passwords";

const MAILS = {
  HOME_RECOVERY                  : new Mail({
    from   : NO_REPLY,
    to     : ME,
    content: `Your new ${COMPANY_INTERNAL} password is ${PASSWORDS.PLAYER}`,
  }),
  FIRST_ANONYMOUS                : new Mail({
    from   : ANONYMOUS,
    to     : ME,
    content: `I know you are wondering who I am and where I come from, but that doesn't matter for now. I'm just writing to let you know that you probably want to *cancel* the meeting you set up with your manage. Why? I will let you find out. It doesn't hurt anyways (you can always re-schedule it later)`,
  }),
  PROMOTION_LETTER               : new Mail({
    from   : MANAGER,
    to     : ME,
    content: `I am very pleased to see your excellent work the past few years, and today I want to tell you that you are being offered a new job with higher salary. 

This new job requires you to infiltrate ${COMPANY_ALT} to collect some intelligence. As you know, ${COMPANY_ALT} has been our main competitor since day one, and we will be appreciated for anything that you could do for us. 

You will see a follow up request soon. Feel free to accept it if you are interested.`,
  }),
  ANONYMOUS_AFTER_PROMOTION      : new Mail({
    from   : ANONYMOUS,
    to     : ME,
    content: `see? told u already`,
  }),
  PROMOTION_LETTER_CONFIRM       : new Mail({
    from   : MANAGER,
    to     : ME,
    content: `Great! Here is what your new job is about. Please download and install the attachment below, which will be used to get access to their internal system ${COMPANY_ALT_INTERNAL}. 
     
You will be known as ${ME_ALT} in ${COMPANY_ALT}. Our team has already set up an account for you in their internal system ${COMPANY_ALT_INTERNAL}, but unfortunately we lost the password somehow (well well, I know...), but fortunately we know it's pure four digits, so maybe you can try to guess it?

Also don't forget to keep us updated. Anything you see on ${COMPANY_ALT_INTERNAL} will be recorded automatically, or manually sometimes if it's secured by ${COMPANY_ALT}.`,
  }),
  WELCOME_LETTER                 : new Mail({
    from   : MANAGER_ALT,
    to     : ME_ALT,
    content: `Welcome to ${COMPANY_ALT}! Let us know if you need anything.`,
  }),
  CALL_FOR_SPY                   : new Mail({
    from   : MANAGER,
    to     : ME,
    content: `Good job guessing the password! I guess ${MANAGER_ALT} is your supervisor or something. Try to guess his password again to see if you could find anything related to ${SPY}. We sent him a few months back, but he went radio silent several weeks ago`,
  }),
  FIRST_LETTER_FROM_SPY          : new Mail({
    from   : SPY,
    to     : ME_ALT,
    content: `Thank you so much! This is exactly what I was expecting you to do for such a long time. For some reason I was under strict surveillance from ${MANAGER_ALT} so I could not even contact you directly, until his account is temporarily locked (and so is the surveillance system). 
  
I'm asking you to disable it for me. To get started, you have to 
  - Hack into another manager ${SUPER_MANAGER_ALT} 
  - Change the permission of ${MANAGER_ALT}
  - Download the surveillance module 
  - Install it on your adapter
  - Set me free!
   
I tried to do so the last time but didn't make it. Be careful this time and good luck out there!`,
  }),
  PASSWORD_RESET_MANAGER_ALT     : new Mail({
    from   : MANAGER_ALT,
    to     : ME_ALT,
    content: `I hope it's not too late to let you that an all-hands is happening right away. But even so you could still check the chat history so no worries! 
    
If it's running late I'm sorry, but my account was locked due to "protection of force password attempt" and it took me a while to figure out how to disable such protection.`,
  }),
  ANONYMOUS_CONFIDENTIAL_WARNING : new Mail({
    from   : ANONYMOUS,
    to     : ME,
    content: `How exciting! You scored some intelligence the very first day! Those are happening in a secured chatroom so you need to upload them later manually - but before doing so, think about it. You do not know how many people were there, and if you were one of the few people there, and somehow they knew it was leaked, they would know it was you almost immediately. 
    
 So I would recommend to hold on for a while. Again, it doesn't hurt :)`,
  }),
  CALL_FOR_SPY_FOLLOW_UP         : new Mail({
    from   : MANAGER,
    to     : ME,
    content: `How's it going? I just saw that Echo contacted you and explained what happened :( We are still trying to see what we could do for him. `,
  }),
  PASSWORD_RESET_ME_ALT          : new Mail({
    from   : SECURITY_DEPT,
    to     : ME_ALT,
    content: `Welcome to ${COMPANY_ALT}! We value the security of our employees, so I'm writing to give you a new password. 
    
Of course I won't send it to you directly, so here's the hint:
 
    -----------------------------------------------
    |    the answer to the universe in english    | 
    |               lower case only               |
    -----------------------------------------------
`,
  }),
  PASSWORD_RESET_ME_ALT_FOLLOW_UP: new Mail({
    from   : SECURITY_DEPT,
    to     : ME_ALT,
    content: `Fantastic! We will reset your password periodically to protect you and our company. Some people just don't hate to do it, and they are still using weak passwords like their birthdays or anniversaries in pure numbers as their password. Make sure you are not one of them.`,
  }),
  ANONYMOUS_MANAGER_PASSWORD     : new Mail({
    from   : ANONYMOUS,
    to     : ME,
    content: `${MANAGER_ALT}'s password is simple: ${PASSWORDS.MANAGER_ALT}. You are welcome.`,
  }),
  SPAMS                          : [
    // #0
    "Greetings, mighty mister! Whats up?\n" +
    "It feels like I need a company of a real man! I am sure you are as hot as you page! Online dating sounds thrilling! Lets try it! I have just uploaded two dozens of nude photos to my page. Please, search for me at the dating resource. Join me in a private chat, baby!\n" +
    "I am looking forward to hearing from you!\n" +
    "I wait for you! http://mcaf.ee/efk37"
    ,
    // #1
    "Service Desk: We are currently working on a new Microsoft Outlook Webaccess 365 to improve webmail browser for 2014. This is a Redesigned version of hotmail, easy to access mail and folder. Your current webmail will be deactivated soon. To complete this process, reply this mail to fetch your information. Inability to complete this process will render your account inactive. "
    ,
    // #2
    "Obtain a prosperous future and secure the\n" +
    "admiration of all for as little as $125.\n" +
    "\n" +
    "Diplomas from prestigious non-accredited\n" +
    "universities based on your life experience.\n" +
    "\n" +
    "No tests, no classes, no interviews.\n" +
    "All diplomas available including bachelors,\n" +
    "masters, and doctorates(PhD's).\n" +
    "\n" +
    "No one is turned down.\n" +
    "\n" +
    "Your diploma puts a University Job\n" +
    "Placement Counselor at your disposal.\n" +
    "\n" +
    "Confidentiality assured.\n" +
    "\n" +
    "CALL NOW to receive your diploma\n" +
    "within days!!!\n" +
    "\n" +
    "1-603-623-0033, Extension 307\n" +
    "\n" +
    "Open Every Day Including Sundays\n" +
    "and Holidays\n"
    ,
    // #3
    "Very Important Information Regarding Your Outstanding Funds.\n" +
    "I write to enquire from you if you have received your outstanding funds till now which the answer is NO. You have been under the cage of greedy and non authentic officials who has been deceiving you for a long time in the guise of releasing your funds which they do not have any authority to effect but rather than open up and let you know that they lack the capacity to release your funds, They decided to deceive you till now.\n" +
    "I have communicated you long time ago and informed you that I am the only person in charge of your funds and I am the only person that can release your funds but it seems that you do not want to believe me due to the fact that you are under the cage and control of those unscrupulous elements / unauthorized persons who has been deceiving you and requesting for one payment or the other from you till now when you are not required to pay any money to get your funds released to you.\n" +
    "In fact if you want to receive your outstanding funds immediately, kindly back to me via return mail to enable me give you details.You must keep this mail confidential until your fund is release to you.\n" +
    "I will give you further details as soon as I hear from you.\n" +
    "Your urgent attention is highly imperative.\n"
    ,
    // #4
    "Your email is among the 37 list to be compensated by World Bank/IMF contact!\n" +
    "Claims Dept Manager Mr.Ego Martins on (info@notspammer.net) for your $1,500.000 ATM CARD. Send him your details such as NAME / COUNTRY / ADDRESS / TELEPHONE to get it!"
    ,
    // #5
    "I'm Barbara Cole. I'm 15 years old. I live in Bolton UK before my Dad passed away in a car accident 3 years ago. I now live with my step mother in Warrington. My mother died immediately she gave birth to me. My late Dad Mr. Norman Cole was a big business man in UK before he died in a car accident 2008. I am the only child of my Dad, and he died 3 days after the accident. He willed ALL his life savings to me, and I have been trying to collect the funds from the bank but the bank MD CEO refused - he said I should present someone old enough so he can transfer the funds to the person that I can't be in control of the huge amount of funds because I am still a teenager and it is against the UK law. I would have told my step mother to assist me in collecting the funds from the bank but she is not a good woman because my Dad warned me about her before he died. Now that I live with her I now understand that what my Dad said about her was true, because she simply doesn't give me attention she don't care if I am alright or not, all she do is to find what my Dad has left. But of course she will never find it.\n" +
    "If you are interested in helping me. Please reply me on my email: bcole013@example.co.jp"
  ].map((c, i) => new Mail({
    from   : SPAM_SENDER[i],
    to     : MANAGER_ALT,
    content: c,
    // A random day in 2017
    date   : new Date(2017, 0, Math.random() * 365).getTime(),
  })),
  BIRTHDAY_RSVP                  : new Mail({
    from   : SUPER_MANAGER_ALT,
    to     : MANAGER_ALT,
    date   : new Date(2017, 2, Math.random() * 59).getTime(),
    content: `Another new hire, right? You don't need to follow them anyways. Trust me, they will get to be better as time goes by.

By the way are you free the coming Saturday? My son is turning 100-day old that day, and we are throwing out a party.`,
  }),
  THANK_YOU_FROM_SPY             : new Mail({
    from   : SPY,
    to     : ME_ALT,
    content: `Thank you! Job well done! You probably disabled the whole system instead of just me since you didn't know my ID. From what I can tell my ID starts ends with 890 (the rest is hidden from me). 
    
The system will be automatically restored shortly. Try to log in to whoever you hacked and disable it again!`,
  }),
  REAL_THANK_YOU_FROM_SPY        : new Mail({
    from   : SPY,
    to     : ME_ALT,
    content: `Ok good, I'm out. Thanks. 

One last thing (sorry that I forgot to mention): since I'm escaped, a new empty slot was left there. Could you go back and fill that slot?
 
It will probably ask you to specify the ID number, and I heard somewhere that every new ID is generated from getting SHA256 of the last ID removed from the system (in this case it's my ID). After you get the result, find the digits from left to right until you reach the character limit, and that would be the new ID. `,
  }),
  DECRYPT_INVITATION             : new Mail({
    from   : SUPER_MANAGER_ALT,
    to     : ME_ALT,
    content: `Looking for something to do? We just intercepted a huge amount of intelligence (including some from ${COMPANY} - surprise!) and we are running out of people, so I'm curious if you might be interested. I will later send you a follow-up email later with information on how to start doing it if you want. Thanks.`,
  }),
  DOUBLE_SPY_INQUIRY             : new Mail({
    from   : ME,
    to     : MANAGER,
    content: `Sounds like you are making big progress! I saw the email ${SUPER_MANAGER_ALT} sent you. Just want to tell you it's okay because we always spread fake intelligence around for fun :D`,
  }),
  DECRYPT_INSTRUCTION            : new Mail({
    from   : SUPER_MANAGER_ALT,
    to     : ME_ALT,
    content: `Whether you want to do it or not, you should now be able to see a new command in ${COMPANY_ALT_INTERNAL}. If you do, accept the terms and start doing something fun! If you ever need anything, like an advanced computer or plugin for elevated permission, feel free to request it from there!`,
  }),
  DECRYPT_PLUGIN_REQUEST_FAILED  : new Mail({
    from   : NO_REPLY,
    to     : ME_ALT,
    content: `This is a letter automatically generated by the system to inform you that the request you sent to ${SUPER_MANAGER_ALT} is not delivered. The error information is
     
     Unknown Error: Cannot Connect to Server.
     
Please try again later to see if it works`,
  }),
  SPY_OFFER_HELP                 : new Mail({
    from   : SPY,
    to     : ME_ALT,
    content: `Hey me again. Just saw you were also decrypting password, and the request system there never worked properly for me, so I'm sending the plugin to you (so you don't have to wait!). You are welcome`,
  }),
  MANAGER_NEW_RESOURCE_PROMOTE   : new Mail({
    from   : HR_DEPT,
    to     : MANAGER_NEW_RESOURCE,
    content: `Congratulations! You are now promoted to the manager of the Department of New Resource. Your ID was also changed to ${MANAGER_NEW_ID}.`,
  }),
  MANAGER_NEW_RESOURCE_TASK      : new Mail({
    from   : NO_REPLY,
    to     : MANAGER_NEW_RESOURCE,
    content: `This is an automated email regarding a new task assigned to ${MANAGER_NEW_ID}.
    
${COMPANY} is recently working on No. 1384 – a really potential product that may bring our company huge profit in the near future. However, there are still doing extensive research on it. Your task is to take a group of select researchers to track its physical and chemical property under condition codenamed C023 to C481, and send us report by next week. `,
  }),
  ANONYMOUS_URGENT_CALL          : new Mail({
    from   : ANONYMOUS,
    to     : ME,
    content: `DO NOT INSTALL ANY PLUGINS ${COMPANY_ALT.toUpperCase()} PROVIDED! NO MATTER WHO GIVES YOU!
    
Their internal system was hacked recently and almost every plugin was compromised. If you install it, your adapter might be affected. I repeat, DO NOT INSTALL!`,
  }),
  ANONYMOUS_URGENT_CALL_FOLLOW_UP: new Mail({
    from   : ANONYMOUS,
    to     : ME,
    content: `God damn it! They beat me again. Oh well, I guess you just saw what happens... Yeah you are right, you are now under the surveillance system, recognized as ${SPY}.
    
Why? Your name is ${ME_ALT}, well was, and that guy, ${SPY}. Feel something? Where is Delta, Charlie, Bravo and Alpha? Is it a coincidence? No. Alpha did this to each of you. For what? I don't know. It doesn't matter now probably. What matters is what you could do.
 
From what I can tell, even if you are being constantly watched, what you do there is almost the same with what you can outside. The only difference is that ALL you can do now is to complete those tasks ASSIGNED to you (rather than selecting by yourself) with limited chance and people to communicate privately. Those tasks can sometimes be boring, but can sometimes be helpful for your escape, because those tasks are always about decrypting the latest intelligence containing some details that may be useful for you. `,
  }),
  FIRST_LETTER_UNDER_SURVEILLANCE: new Mail({
    from   : SUPER_MANAGER_ALT,
    to     : SPY,
    content: `You've been doing well for the past few tasks, so I'm bring something special this time. We've never seen anything like this, so I'm also copying some instructions to decrypt them below. 
    
    <<Forwarded email>>
This time TAK separates messages in pieces and encrypts them in different ways. Our staffs should try to decrypt the messages in an entire group to discover the information beneath it. After decryption, they should sort different pieces of messages correctly. 
Notice: semicolon is the separator. Leave out any characters other than numbers and letters. 
General Rule: The Final Step For Decryption Each Time Is ALWAYS To Add Space(s) Between Characters.
1. Simply reverse the string
2. Replace numbers (can be either hexadecimal or decimal) with letters (e.g. 0 to a, 1 to b, 9 to l, a to m etc.)
3. Move letters forward or backward (e.g. A to C, B to D, C to E, etc. or Z to E, A to F, B to G, etc.)
4. Move letters “up” or “down” (look at your Querty keyboard and find this: e.g. A to Q, S to W, E to 3, etc.) 
`,
  }),
  CONGRATS_FROM_MANAGER          : new Mail({
    from   : MANAGER,
    to     : ME,
    content: `GREAT JOB! You have helped all our spies in their surveillance system out. Now people in ${COMPANY_ALT} must be funny to watch because they must have no idea what is going on lol`,
  }),
  CONGRATS_FROM_MANAGER_FOLLOW_UP: new Mail({
    from   : MANAGER,
    to     : ME,
    content: `Oops I guess I was too excited. I forgot to send you updated plugin to access ${COMPANY_ALT_INTERNAL}. Of course they also updated their system after the break-out, but you see, it still doesn't work.
    
Also, we know your adapter was installed a corrupted plugin. We have cracked it from server and it is harmless now. We also double checked this plugin, so don't worry...`,
  }),
  DIRECTOR_RSVP                  : new Mail({
    from   : DIRECTOR_ALT,
    to     : SUPER_MANAGER_ALT,
    content: `Things are driving me crazy. I doubt if I can still attend the meeting next week. 
    
I finally made an appointment with Mrs. ${DIRECTOR_ALT_TUTOR} for her tutor class. It's so hard to schedule it, and ${DIRECTOR_ALT_KID} was excited about this since like forever. Could you somehow reschedule the meeting? Thanks.`,
  }),
  COMPLAINT                      : new Mail({
    from   : RANDOM_EMPLOYEE_ALT,
    to     : DIRECTOR_ALT,
    content: `Maybe it's time to re-think our strategies.
    
For the past three years, we lost almost every agent we trained here at ${COMPANY_ALT}, and ironically, the only time we can see them again was always when they were sent back to us. So before we can come up with something to counteract it, just update the surveillance system. Otherwise everything I did is in vain; we cannot, and never will be able to keep them.`,
  }),
};