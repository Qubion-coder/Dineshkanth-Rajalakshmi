
const fs = require("fs");
const path = require("path");

const filePath = path.join("E:/QB/wedding new/Majori Devshan/src", "App.tsx");
let content = fs.readFileSync(filePath, "utf-8");

// 1. Remove background images
content = content.replace(/<div className="absolute top-0 left-0 w-\[clamp\(260px,38vw,400px\)\].*?<\/div>/gs, "");
content = content.replace(/<div className="absolute bottom-0 right-0 w-\[clamp\(260px,38vw,400px\)\].*?<\/div>/gs, "");
content = content.replace(/<div className="section-floral-overlay.*?<\/div>\s*<\/div>/gs, "");
content = content.replace(/<InviteImage src={mandalaImage}.*?\/>/g, "");
content = content.replace(/<img[^>]*src="\/WhatsApp Image 2026-07-04 at 03\.20\.35 \(1\)\.jpeg"[^>]*\/>/g, "");

// 2. Names replacement
content = content.replace(/Majori & Devshan/g, "Ramessh Kanna & Thismila");
content = content.replace(/Majori/g, "Thismila");
content = content.replace(/Devshan/g, "Ramessh Kanna");
content = content.replace(/M&D/g, "R&T");

// 3. Countdown Date
content = content.replace(/August 08, 2026 15:30:00/g, "August 27, 2026 10:27:00");
content = content.replace(/AUGUST 08, 2026/g, "AUGUST 27, 2026");
content = content.replace(/08 AUGUST 2026/g, "27 AUGUST 2026");
content = content.replace(/SATURDAY, 08 AUGUST/g, "THURSDAY, 27 AUGUST");

// 4. Parents Details
content = content.replace(/Lily Ranhaluge <br \/>&<br \/> Sudath Ranhaluge/g, "Mr. Sivalingam <br />&<br /> Mrs. Renukadevi");
content = content.replace(/Chamika Fernando <br \/>&<br \/> Milroy Joseph/g, "Late Mr. Balakrishnan <br />&<br /> Mrs. Janaki");

// 5. Time Details
content = content.replace(/11:00 AM/g, "10:27 AM");
content = content.replace(/To 04:00 PM/g, "To 11:15 AM");

// 6. Venue Details
content = content.replace(/Kandy, Sri Lanka/g, "Hendala, Wattala");
content = content.replace(/Earls Regency Kandy/g, "Royal Monarch Banquet Hall");
content = content.replace(/\(Regent Ballroom\)/g, "(Ram Cinemas, Hendala Junction)");
content = content.replace(/Kandy,<br \/> Sri Lanka\./g, "Wattala,<br /> Sri Lanka.");

// 7. Timeline
content = content.replace(/\{ time: "11:00 AM", title: "Blessing Ceremony" \}/g, "{ time: \"10:27 AM\", title: \"Muhurtham\" }");
content = content.replace(/\{ time: "12:00 PM", title: "Reception" \}/g, "{ time: \"11:15 AM\", title: \"Blessing & Lunch\" }");
content = content.replace(/\{ time: "04:00 PM", title: "Going Away" \},/g, "");

// 8. WelcomeSection replacement
const newWelcomeSection = `function WelcomeSection() {
  return (
    <section className="cv-auto py-24 md:py-32 bg-white relative overflow-hidden border-t border-theme-100/30">
      <div className="absolute inset-0 opacity-[0.02] paper-grain pointer-events-none" />
      <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-playball text-4xl md:text-5xl text-theme-900 mb-6 drop-shadow-sm">Wedding Invitation</h2>
          <div className="w-16 h-px bg-amber-400 mx-auto mb-8" />
          <div className="text-stone-700 font-montserrat text-sm md:text-base leading-loose max-w-2xl mx-auto space-y-6">
            <p>
              We Late Mr. Balakrishnan & Mrs. Janaki together with Mr. Sivalingam & Mrs. Renukadevi<br/>
              Cordially solicit your esteemed presence and blessing with family and friends on the auspicious occasion of the marriage of
            </p>
            <p className="font-bold text-lg text-theme-900">Our son<br/>B. Ramessh Kanna <span className="text-xs font-normal">BBM, ACMA, CGMA</span></p>
            <p className="font-bold text-lg text-theme-900">Our daughter<br/>S. Thismila <span className="text-xs font-normal">ABE (UK), PGDBM, MBA (In Read) (CACHI NUTRI - Proprietor)</span></p>
            <p>
              At a Religious Ceremony on <strong>Thursday, 27th of August 2026</strong><br/>
              Between the Muhurtham of 10.27 a.m. to 11.15 a.m.<br/>
              at<br/>
              <strong>Royal Monarch Banquet Hall</strong><br/>
              (Ram Cinemas, Hendala Junction, Wattala)
            </p>
            <p>To bless the Couple and thereafter join us for lunch</p>
            
            <div className="flex flex-col md:flex-row justify-between text-xs mt-12 gap-8 text-left">
              <div>
                <strong>B. Janaki</strong><br/>
                Nexus Villa, 54-6/3, E.S. Fernando Mawatha, Colombo - 06<br/>
                Tel: +9477-3334296, +9477-3570810
              </div>
              <div>
                <strong>K. Sivalingam - Renukadevi</strong><br/>
                30E, Sri Siddartha Road, Kirulapone, Colombo - 05<br/>
                Tel: +9474-0547962, +9477-5686864
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}`;

content = content.replace(/function WelcomeSection\(\) \{[\s\S]*?\}\s*function OurStorySection/g, newWelcomeSection + "\n\nfunction OurStorySection");

// 9. OurStorySection replacement (Tamil Invitation)
const newOurStorySection = `function OurStorySection() {
  return (
    <section className="cv-auto py-24 md:py-32 bg-[#f0eceb] relative overflow-hidden border-t border-theme-100/30">
      <div className="absolute inset-0 opacity-[0.02] paper-grain pointer-events-none" />
      <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center font-noto-tamil">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-xs text-amber-600 mb-4 font-bold">
            ஸ்ரீ விநாயகர் துணை | ஸ்ரீ ராமஜெயம் | சஞ்ஜீவி ராய பெருமாள் துணை
          </div>
          <h2 className="text-3xl md:text-4xl text-theme-900 mb-6 drop-shadow-sm font-bold">திருமண அழைப்பிதழ்</h2>
          <div className="w-16 h-px bg-amber-400 mx-auto mb-8" />
          <div className="text-stone-700 text-sm md:text-base leading-loose max-w-2xl mx-auto space-y-6">
            <p>அன்புடையீர்,</p>
            <p>
              நிகழும் மங்களகரமான பராபவ வருடம் ஆவணி மாதம் 10-ம் திகதி (27-08-2026) வியாழக்கிழமை அவிட்ட நட்சத்திரமும் துலா லக்னமும் பூரணை திதியும் சித்தயோகமும் கூடிய சுபயோக சுபதினத்தில் காலை 10.27 மணி முதல் 11.15 மணி வரையுள்ள சுபமுகூர்த்த வேளையில்
            </p>
            <p>
              ஹட்டனைச் சேர்ந்த தெய்வத்திரு. ராமலிங்கம் நாயுடு - பார்வதி, ஹட்டனைச் சேர்ந்த தெய்வத்திரு. ராமசாமி நாயுடு லக்ஷ்மி ஆகியோரது பேரனும், தெய்வத்திரு. ஸ்ரீ பிரகாஷ் ராம் இன் சகோதரரும், தெய்வத்திரு. பாலகிருஷ்ணன் நாயுடு - திருமதி ஜானகியின் கனிஷ்ட புதல்வன் திருநிறைச்செல்வன்<br/>
              <strong className="text-lg text-theme-900">ராமேஷ் கண்ணா (பிரவின்) <span className="text-xs font-normal">BBM, ACMA, CGMA</span></strong>
            </p>
            <p>
              கடலூர் (தொழுதூர்) தெய்வத்திரு. கந்தசாமி சேர்வை - பெருமாயி, திருச்சி (மருதூர்) தெய்வத்திரு. தங்கமுத்து சேர்வை - கமலம் ஆகியோரது பேத்தியும், திரு. சிவலிங்கம் சேர்வை திருமதி ரேணுகாதேவியின் சிரேஷ்ட புதல்வி திருநிறைச்செல்வி<br/>
              <strong className="text-lg text-theme-900">திஸ்மிலா <span className="text-xs font-normal">ABE (UK), PGDBM, MBA (In Read) (CACHI NUTRI - Proprietor)</span></strong>
            </p>
            <p>
              ஆகிய இருவருக்கும் இறைவன் திருவருள் துணைகொண்டு பெரியோர்களால் நிச்சயிக்கப்பட்டு, <strong>Royal Monarch Banquet Hall</strong>, (Ram Cinemas, Hendala Junction, Wattala) நடைபெறும் திருமண நிகழ்விற்கு தாங்கள் குடும்ப சகிதம் வருகை தந்து மணமக்களை ஆசீர்வதிக்குமாறு அன்புடன் அழைக்கின்றோம்.
            </p>
            
            <div className="text-center mt-8 text-xs font-bold text-theme-800">
              இங்ஙனம் தங்கள் நல்வரவை இனிதே விரும்பும்
            </div>
            
            <div className="flex flex-col md:flex-row justify-between text-xs mt-4 gap-8 text-left">
              <div>
                <strong>திருமதி ஜானகி பாலகிருஷ்ணன் நாயுடு</strong><br/>
                திரு.திருமதி பாலமுரளி பிரவீணா (சகோதரன்)<br/>
                திரு.திருமதி நந்தகோபன் யாழினி (சகோதரன்)<br/>
                திரு.திருமதி ராஜ்மோகன் ரம்யா (சகோதரி)<br/>
                திரு.திருமதி சிவபாலன் மங்களா (சகோதரி)<br/>
                NEXUS VILLA, 54-6/3, ஈ.எஸ். பெர்ணான்டோ மாவத்தை, கொழும்பு 06<br/>
                +9477-3334296, +9477-3570810
              </div>
              <div>
                <strong>திரு.திருமதி சிவலிங்கம் ரேணுகாதேவி தம்பதிகள்</strong><br/>
                செல்வி லக்ஷிலா B.Sc. (Hons) (சகோதரி)<br/>
                30ஈ, ஸ்ரீ சித்தார்த்த வீதி, கிருலப்பனை, கொழும்பு - 05<br/>
                +9474-0547962, +9477-5686864
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}`;

content = content.replace(/function OurStorySection\(\) \{[\s\S]*?\}\s*function ProposalSection/g, newOurStorySection + "\n\nfunction ProposalSection");

// Remove ProposalSection entirely since it does not belong here and contains placeholder text.
content = content.replace(/<ProposalSection \/>/g, "");

fs.writeFileSync(filePath, content, "utf-8");
console.log("App.tsx updated successfully!");
