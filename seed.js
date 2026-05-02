const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Disease = require('./models/Disease');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/disease_awareness';

const seedDiseases = [
    {
        id: 'malaria',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Malaria.jpg/800px-Malaria.jpg',
        video: 'https://www.youtube.com/embed/1v5AJA2uPQQ',
        translations: {
            en: {
                name: 'Malaria',
                symptoms: '<ul><li><strong>Fever & Chills:</strong> Cyclical high fever (up to 105°F), violent shivering, and profuse sweating.</li><li><strong>Body Pain:</strong> Severe headaches, muscle aches, and joint pain.</li><li><strong>Digestive:</strong> Nausea, vomiting, and diarrhea.</li><li><strong>Complications:</strong> Anemia, jaundice, kidney failure, seizures, or coma in extreme cases.</li></ul>',
                causes: '<p>Malaria is caused by <em>Plasmodium</em> parasites. The infection is primarily transmitted through the bites of infected female <em>Anopheles</em> mosquitoes, which generally hunt between dusk and dawn. It can also spread via blood transfusions, organ transplants, or from mother to unborn child.</p>',
                prevention: '<ul><li>Sleep under insecticide-treated bed nets (ITNs).</li><li>Use indoor residual spraying (IRS) to kill indoor mosquitoes.</li><li>Apply insect repellents containing DEET or Picaridin to exposed skin.</li><li>Wear long-sleeved clothing during evening hours.</li><li>Take prophylactic antimalarial drugs if traveling to high-risk areas.</li></ul>',
                medicine: '<p>Immediate treatment is crucial. <strong>Artemisinin-based combination therapies (ACTs)</strong> are the first line of defense. Alternatives include Chloroquine (where effective), Atovaquone-proguanil, and Mefloquine. Severe cases require intravenous (IV) artesunate in a hospital.</p>',
                faq: [
                    { question: 'Is Malaria contagious?', answer: 'No, it cannot spread directly from person to person like a cold.' },
                    { question: 'How long does it take for symptoms to appear?', answer: 'Symptoms usually appear 10 to 15 days after the infective mosquito bite.' },
                    { question: 'Can Malaria be completely cured?', answer: 'Yes, with early diagnosis and the correct antimalarial drugs, it is completely curable.' },
                    { question: 'Is there a vaccine for Malaria?', answer: 'Yes, the RTS,S vaccine is recommended for children living in regions with moderate to high transmission.' }
                ]
            },
            hi: {
                name: 'मलेरिया',
                symptoms: '<ul><li>तेज बुखार (105°F तक), ठंड लगना और अत्यधिक पसीना आना।</li><li>गंभीर सिरदर्द, मांसपेशियों और जोड़ों में दर्द।</li><li>मतली, उल्टी और दस्त।</li></ul>',
                causes: '<p>यह <em>प्लास्मोडियम</em> परजीवी के कारण होता है। यह संक्रमित मादा <em>एनोफिलीज</em> मच्छरों के काटने से मनुष्यों में फैलता है।</p>',
                prevention: '<ul><li>कीटनाशक युक्त मच्छरदानी का उपयोग करें।</li><li>कीट विकर्षक (Repellents) लगाएं और पूरी बाजू के कपड़े पहनें।</li><li>आसपास पानी जमा न होने दें।</li></ul>',
                medicine: '<p>क्लोरोक्वीन, या <strong>Artemisinin-based combination therapies (ACTs)</strong>। गंभीर मामलों में अस्पताल में भर्ती होना आवश्यक है।</p>',
                faq: [
                    { question: 'क्या मलेरिया संक्रामक है?', answer: 'नहीं, यह सीधे एक व्यक्ति से दूसरे व्यक्ति में नहीं फैलता है।' },
                    { question: 'लक्षण दिखने में कितना समय लगता है?', answer: 'संक्रमित मच्छर के काटने के 10 से 15 दिन बाद लक्षण आमतौर पर दिखाई देते हैं।' },
                    { question: 'क्या मलेरिया पूरी तरह से ठीक हो सकता है?', answer: 'हाँ, शीघ्र निदान और सही मलेरिया-रोधी दवाओं से यह पूरी तरह से ठीक हो सकता है।' },
                    { question: 'क्या मलेरिया का टीका उपलब्ध है?', answer: 'हाँ, मध्यम से उच्च संचरण वाले क्षेत्रों में रहने वाले बच्चों के लिए आरटीएस,एस टीका अनुशंसित है।' }
                ]
            },
            te: {
                name: 'మలేరియా',
                symptoms: '<ul><li>అధిక జ్వరం, తీవ్రమైన చలి, విపరీతమైన చెమట.</li><li>తలనొప్పి, కండరాలు మరియు కీళ్ల నొప్పులు.</li><li>వాంతులు మరియు వికారం.</li></ul>',
                causes: '<p>ఇది <em>ప్లాస్మోడియం</em> పరాన్నజీవుల వలన వస్తుంది. వ్యాధి సోకిన ఆడ <em>అనాఫిలిస్</em> దోమ కుట్టడం ద్వారా వ్యాపిస్తుంది.</p>',
                prevention: '<ul><li>దోమ తెరలు వాడండి.</li><li>శరీరాన్ని కప్పి ఉంచే దుస్తులు ధరించండి.</li><li>దోమల మందులు (Repellents) ఉపయోగించండి.</li></ul>',
                medicine: '<p>క్లోరోక్విన్ మరియు ACT (Artemisinin-based combination therapies). డాక్టర్ సలహా మేరకు వాడాలి.</p>',
                faq: [
                    { question: 'మలేరియా అంటువ్యాధా?', answer: 'కాదు, ఇది మనిషి నుండి మనిషికి నేరుగా వ్యాపించదు.' },
                    { question: 'లక్షణాలు కనిపించడానికి ఎంత సమయం పడుతుంది?', answer: 'వ్యాధి సోకిన దోమ కుట్టిన 10 నుండి 15 రోజుల తర్వాత సాధారణంగా లక్షణాలు కనిపిస్తాయి.' },
                    { question: 'మలేరియాను పూర్తిగా నయం చేయవచ్చా?', answer: 'అవును, ముందస్తు రోగనిర్ధారణ మరియు సరైన మందులతో ఇది పూర్తిగా నయమవుతుంది.' },
                    { question: 'మలేరియాకు వ్యాక్సిన్ ఉందా?', answer: 'అవును, RTS,S వ్యాక్సిన్ సిఫార్సు చేయబడింది.' }
                ]
            },
            ta: {
                name: 'மலேரியா',
                symptoms: '<p>கடும் காய்ச்சல், குளிர், வியர்வை, தலைவலி, வாந்தி.</p>',
                causes: '<p>கொசுக்களால் பரவும் ஒட்டுண்ணிகளால் ஏற்படுகிறது.</p>',
                prevention: '<p>கொசு வலைகளைப் பயன்படுத்துங்கள், கொசு விரட்டிகளைப் பூசுங்கள்.</p>',
                medicine: '<p>குளோரோகுயின் (Chloroquine), ACTs.</p>',
                faq: [
                    { question: 'மலேரியா தொற்றும் நோயா?', answer: 'இல்லை, இது ஒரு நபரிடமிருந்து மற்றொருவருக்கு நேரடியாக பரவாது.' },
                    { question: 'அறிகுறிகள் தோன்ற எவ்வளவு காலம் ஆகும்?', answer: 'பொதுவாக 10 முதல் 15 நாட்களில் அறிகுறிகள் தோன்றும்.' },
                    { question: 'மலேரியாவை முழுமையாக குணப்படுத்த முடியுமா?', answer: 'ஆம், சரியான மருந்துகள் மூலம் முழுமையாக குணப்படுத்தலாம்.' },
                    { question: 'தடுப்பூசி உள்ளதா?', answer: 'ஆம், RTS,S தடுப்பூசி பரிந்துரைக்கப்படுகிறது.' }
                ]
            },
            kn: {
                name: 'ಮಲೇರಿಯಾ',
                symptoms: '<p>ತೀವ್ರ ಜ್ವರ, ಚಳಿ, ಅತಿಯಾದ ಬೆವರು, ತಲೆನೋವು.</p>',
                causes: '<p>ಸೊಳ್ಳೆಗಳಿಂದ ಹರಡುತ್ತದೆ.</p>',
                prevention: '<p>ಸೊಳ್ಳೆ ಪರದೆಗಳನ್ನು ಬಳಸಿ.</p>',
                medicine: '<p>ಕ್ಲೋರೊಕ್ವಿನ್.</p>',
                faq: [
                    { question: 'ಮಲೇರಿಯಾ ಸಾಂಕ್ರಾಮಿಕವೇ?', answer: 'ಇಲ್ಲ, ಇದು ನೇರವಾಗಿ ಒಬ್ಬರಿಂದ ಇನ್ನೊಬ್ಬರಿಗೆ ಹರಡುವುದಿಲ್ಲ.' },
                    { question: 'ಲಕ್ಷಣಗಳು ಕಾಣಿಸಿಕೊಳ್ಳಲು ಎಷ್ಟು ಸಮಯ ಬೇಕು?', answer: 'ಸೊಳ್ಳೆ ಕಚ್ಚಿದ 10 ರಿಂದ 15 ದಿನಗಳಲ್ಲಿ ಲಕ್ಷಣಗಳು ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತವೆ.' },
                    { question: 'ಮಲೇರಿಯಾವನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ಗುಣಪಡಿಸಬಹುದೇ?', answer: 'ಹೌದು, ಸರಿಯಾದ ಚಿಕಿತ್ಸೆಯಿಂದ ಸಂಪೂರ್ಣವಾಗಿ ಗುಣಪಡಿಸಬಹುದು.' },
                    { question: 'ಲಸಿಕೆ ಇದೆಯೇ?', answer: 'ಹೌದು, RTS,S ಲಸಿಕೆ ಇದೆ.' }
                ]
            },
            mr: {
                name: 'मलेरिया',
                symptoms: '<p>तीव्र ताप, थंडी वाजून येणे, घाम येणे, डोकेदुखी.</p>',
                causes: '<p>डासांमुळे पसरणाऱ्या परजीवीमुळे होतो.</p>',
                prevention: '<p>डास प्रतिबंधक जाळी वापरा.</p>',
                medicine: '<p>क्लोरोक्वीन.</p>',
                faq: [
                    { question: 'मलेरिया संसर्गजन्य आहे का?', answer: 'नाही, तो एका व्यक्तीकडून दुसऱ्या व्यक्तीकडे थेट पसरत नाही.' },
                    { question: 'लक्षणे दिसण्यासाठी किती वेळ लागतो?', answer: 'डास चावल्यानंतर १० ते १५ दिवसांनी लक्षणे दिसतात.' },
                    { question: 'मलेरिया पूर्णपणे बरा होऊ शकतो का?', answer: 'होय, योग्य उपचाराने तो पूर्णपणे बरा होतो.' },
                    { question: 'मलेरियावर लस आहे का?', answer: 'होय, RTS,S लस उपलब्ध आहे.' }
                ]
            },
            gu: {
                name: 'મેલેરિયા',
                symptoms: '<p>સખત તાવ, ઠંડી લાગવી, પરસેવો, માથાનો દુખાવો.</p>',
                causes: '<p>મચ્છરો દ્વારા ફેલાય છે.</p>',
                prevention: '<p>મચ્છરદાનીનો ઉપયોગ કરો.</p>',
                medicine: '<p>ક્લોરોક્વિન.</p>',
                faq: [
                    { question: 'શું મેલેરિયા ચેપી છે?', answer: 'ના, તે સીધા એક વ્યક્તિથી બીજી વ્યક્તિમાં ફેલાતો નથી.' },
                    { question: 'લક્ષણો દેખાવામાં કેટલો સમય લાગે છે?', answer: 'મચ્છર કરડ્યા પછી સામાન્ય રીતે 10 થી 15 દિવસ લાગે છે.' },
                    { question: 'શું મેલેરિયા સંપૂર્ણપણે મટાડી શકાય છે?', answer: 'હા, યોગ્ય દવાથી તેને સંપૂર્ણપણે મટાડી શકાય છે.' },
                    { question: 'શું કોઈ રસી છે?', answer: 'હા, RTS,S રસી છે.' }
                ]
            }
        }
    },
    {
        id: 'dengue',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Symptoms_of_Dengue_fever.svg/800px-Symptoms_of_Dengue_fever.svg.png',
        video: 'https://www.youtube.com/embed/mBnaB-cR8Q4',
        translations: {
            en: {
                name: 'Dengue',
                symptoms: '<ul><li><strong>High Fever:</strong> Sudden onset of high fever (up to 104°F/40°C).</li><li><strong>Severe Pain:</strong> Known as "breakbone fever" due to intense muscle, joint, and bone pain. Pain behind the eyes is highly characteristic.</li><li><strong>Skin Rash:</strong> A widespread macular rash that appears 2-5 days after the fever starts.</li><li><strong>Warning Signs:</strong> Bleeding gums, persistent vomiting, blood in vomit, and severe abdominal pain indicate Severe Dengue.</li></ul>',
                causes: '<p>Caused by any of the four serotypes of the Dengue virus. It is transmitted primarily by infected <em>Aedes aegypti</em> and <em>Aedes albopictus</em> mosquitoes, which bite primarily during the daytime.</p>',
                prevention: '<ul><li>Eliminate all sources of stagnant water (flower pots, tires, buckets) where Aedes mosquitoes breed.</li><li>Use DEET-based mosquito repellents.</li><li>Install physical barriers like window screens and sleep under mosquito nets.</li></ul>',
                medicine: '<p>There is no specific antiviral treatment. <strong>Supportive care is vital:</strong> get plenty of rest, drink fluids to prevent dehydration, and take acetaminophen (Tylenol) for fever and pain. <strong>DO NOT</strong> take aspirin or ibuprofen, as they increase the risk of internal bleeding.</p>',
                faq: [
                    { question: 'Can you get dengue more than once?', answer: 'Yes. Infection provides immunity only to that specific serotype. A second infection with a different serotype increases the risk of severe dengue.' },
                    { question: 'Is dengue contagious?', answer: 'No, dengue does not spread directly from person to person. It only spreads through mosquito bites.' },
                    { question: 'Why shouldn\'t I take ibuprofen or aspirin for dengue?', answer: 'These medications thin the blood and can increase the risk of severe internal bleeding, which is a major complication of dengue.' },
                    { question: 'What is the most critical phase of dengue?', answer: 'The critical phase begins when the fever starts dropping (around days 3-7). This is when plasma leakage and severe bleeding can occur.' }
                ]
            },
            hi: {
                name: 'डेंगू',
                symptoms: '<ul><li>अचानक तेज बुखार (104°F तक)।</li><li>मांसपेशियों, हड्डियों और जोड़ों में भयंकर दर्द (इसे हड्डी-तोड़ बुखार भी कहते हैं)।</li><li>आंखों के पीछे दर्द और त्वचा पर लाल चकत्ते।</li><li>मसूड़ों से खून आना (गंभीर स्थिति में)।</li></ul>',
                causes: '<p>डेंगू वायरस के कारण होता है, जो <em>एडीज (Aedes)</em> मच्छरों के काटने से फैलता है। ये मच्छर दिन के समय अधिक काटते हैं।</p>',
                prevention: '<ul><li>घरों के आसपास साफ पानी जमा न होने दें (कूलर, टायर, गमले)।</li><li>मच्छर विकर्षक क्रीम का प्रयोग करें।</li></ul>',
                medicine: '<p>कोई विशिष्ट दवा नहीं है। आराम करें, खूब तरल पदार्थ पिएं और बुखार के लिए पैरासिटामोल लें। एस्पिरिन या इबुप्रोफेन <strong>बिल्कुल न लें</strong>।</p>',
                faq: [
                    { question: 'क्या आपको एक से अधिक बार डेंगू हो सकता है?', answer: 'हाँ, और दूसरा संक्रमण अधिक गंभीर हो सकता है।' },
                    { question: 'क्या डेंगू संक्रामक है?', answer: 'नहीं, यह सीधे एक व्यक्ति से दूसरे व्यक्ति में नहीं फैलता है।' },
                    { question: 'मुझे डेंगू के लिए इबुप्रोफेन क्यों नहीं लेना चाहिए?', answer: 'ये रक्त को पतला करते हैं और आंतरिक रक्तस्राव के जोखिम को बढ़ाते हैं।' },
                    { question: 'डेंगू का सबसे महत्वपूर्ण चरण कौन सा है?', answer: 'महत्वपूर्ण चरण तब शुरू होता है जब बुखार कम होने लगता है (लगभग 3-7 दिन)।' }
                ]
            },
            te: {
                name: 'డెంగ్యూ',
                symptoms: '<ul><li>హఠాత్తుగా అధిక జ్వరం.</li><li>కళ్లు, కీళ్లు, మరియు కండరాలలో తీవ్రమైన నొప్పి.</li><li>చర్మం పై ఎర్రటి దద్దుర్లు రావడం.</li></ul>',
                causes: '<p>ఇది డెంగ్యూ వైరస్ వల్ల వస్తుంది. ఈ వైరస్ <em>ఏడిస్</em> దోమల ద్వారా వ్యాపిస్తుంది. ఈ దోమలు పగటిపూట ఎక్కువగా కుడతాయి.</p>',
                prevention: '<ul><li>కొబ్బరి చిప్పలు, టైర్లు మరియు కూలర్లలో నీరు నిల్వ లేకుండా చూడండి.</li><li>దోమల మందులు మరియు నెట్స్ వాడండి.</li></ul>',
                medicine: '<p>విశ్రాంతి తీసుకోవాలి, ఎక్కువ ద్రవాలు తాగాలి. నొప్పి/జ్వరానికి పారాసెటమాల్ వాడాలి. ఆస్పిరిన్ లాంటివి వాడకూడదు.</p>',
                faq: [
                    { question: 'డెంగ్యూ మళ్లీ వస్తుందా?', answer: 'అవును, రెండోసారి వస్తే ప్రమాదం ఎక్కువ.' },
                    { question: 'డెంగ్యూ అంటువ్యాధా?', answer: 'కాదు, ఇది నేరుగా ఒకరి నుండి మరొకరికి వ్యాపించదు.' },
                    { question: 'ఇబుప్రోఫెన్ ఎందుకు తీసుకోకూడదు?', answer: 'ఇవి రక్తాన్ని పలచబరుస్తాయి మరియు అంతర్గత రక్తస్రావం ప్రమాదాన్ని పెంచుతాయి.' },
                    { question: 'డెంగ్యూలో అత్యంత క్లిష్టమైన దశ ఏమిటి?', answer: 'జ్వరం తగ్గడం ప్రారంభమైనప్పుడు (సుమారు 3-7 రోజులు) క్లిష్టమైన దశ ప్రారంభమవుతుంది.' }
                ]
            },
            ta: {
                name: 'டெங்கு',
                symptoms: '<p>காய்ச்சல், தலைவலி, மூட்டு வலி, தடிப்புகள்.</p>',
                causes: '<p>ஏடிஸ் கொசுக்களால் பரவும் வைரஸ்.</p>',
                prevention: '<p>தண்ணீர் தேங்குவதை தவிர்க்கவும்.</p>',
                medicine: '<p>ஓய்வு, நிறைய நீர், பாராசிட்டமால்.</p>',
                faq: [
                    { question: 'மீண்டும் டெங்கு வருமா?', answer: 'ஆம், இரண்டாவது முறை வந்தால் ஆபத்து அதிகம்.' },
                    { question: 'டெங்கு தொற்றும் நோயா?', answer: 'இல்லை, கொசுக்கள் மூலமாக மட்டுமே பரவும்.' },
                    { question: 'ஐபுரூஃபன் ஏன் எடுக்கக்கூடாது?', answer: 'இரத்தக் கசிவு அபாயத்தை அதிகரிக்கும்.' },
                    { question: 'டெங்குவின் மிக முக்கியமான கட்டம் எது?', answer: 'காய்ச்சல் குறையத் தொடங்கும் போது (3-7 நாட்கள்).' }
                ]
            },
            kn: {
                name: 'ಡೆಂಗ್ಯೂ',
                symptoms: '<p>ಜ್ವರ, ಕಣ್ಣಿನ ಹಿಂದೆ ನೋವು, ಕೀಲು ನೋವು.</p>',
                causes: '<p>ಸೊಳ್ಳೆಗಳಿಂದ ಹರಡುತ್ತದೆ.</p>',
                prevention: '<p>ನೀರು ನಿಲ್ಲದಂತೆ ನೋಡಿಕೊಳ್ಳಿ.</p>',
                medicine: '<p>ವಿಶ್ರಾಂತಿ, ಪ್ಯಾರಸಿಟಮಾಲ್.</p>',
                faq: [
                    { question: 'ಮತ್ತೆ ಬರುತ್ತದೆಯೇ?', answer: 'ಹೌದು, ಎರಡನೇ ಬಾರಿ ಹೆಚ್ಚು ಗಂಭೀರವಾಗಬಹುದು.' },
                    { question: 'ಡೆಂಗ್ಯೂ ಸಾಂಕ್ರಾಮಿಕವೇ?', answer: 'ಇಲ್ಲ, ಸೊಳ್ಳೆ ಕಡಿತದಿಂದ ಮಾತ್ರ ಹರಡುತ್ತದೆ.' },
                    { question: 'ಐಬುಪ್ರೊಫೇನ್ ಏಕೆ ತೆಗೆದುಕೊಳ್ಳಬಾರದು?', answer: 'ಇದು ರಕ್ತಸ್ರಾವದ ಅಪಾಯವನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ.' },
                    { question: 'ಡೆಂಗ್ಯೂನ ನಿರ್ಣಾಯಕ ಹಂತ ಯಾವುದು?', answer: 'ಜ್ವರ ಕಡಿಮೆಯಾಗಲು ಪ್ರಾರಂಭಿಸಿದಾಗ (3-7 ದಿನಗಳು).' }
                ]
            },
            mr: {
                name: 'डेंग्यू',
                symptoms: '<p>तीव्र ताप, डोकेदुखी, सांधेदुखी.</p>',
                causes: '<p>एडीस डासांमुळे होतो.</p>',
                prevention: '<p>पाणी साचू देऊ नका.</p>',
                medicine: '<p>विश्रांती, पॅरासिटामॉल.</p>',
                faq: [
                    { question: 'डेंग्यू पुन्हा होऊ शकतो का?', answer: 'होय, आणि दुसऱ्यांदा तो अधिक गंभीर असू शकतो.' },
                    { question: 'डेंग्यू संसर्गजन्य आहे का?', answer: 'नाही, तो डासांच्या माध्यमातूनच पसरतो.' },
                    { question: 'इबुप्रोफेन का घेऊ नये?', answer: 'यामुळे अंतर्गत रक्तस्रावाचा धोका वाढतो.' },
                    { question: 'डेंग्यूचा सर्वात गंभीर टप्पा कोणता?', answer: 'जेव्हा ताप कमी होऊ लागतो (सुमारे ३-७ दिवस).' }
                ]
            },
            gu: {
                name: 'ડેન્ગ્યુ',
                symptoms: '<p>સખત તાવ, આંખો પાછળ દુખાવો, સાંધાનો દુખાવો.</p>',
                causes: '<p>મચ્છરોથી થાય છે.</p>',
                prevention: '<p>પાણી ભરાવા ન દો.</p>',
                medicine: '<p>આરામ, પેરાસિટામોલ.</p>',
                faq: [
                    { question: 'શું ડેન્ગ્યુ ફરીથી થઈ શકે?', answer: 'હા, અને બીજી વખત વધુ ગંભીર બની શકે છે.' },
                    { question: 'શું ડેન્ગ્યુ ચેપી છે?', answer: 'ના, તે મચ્છર કરડવાથી જ ફેલાય છે.' },
                    { question: 'ઇબુપ્રોફેન શા માટે ન લેવી જોઈએ?', answer: 'તે રક્તસ્ત્રાવનું જોખમ વધારે છે.' },
                    { question: 'ડેન્ગ્યુનો સૌથી ગંભીર તબક્કો કયો છે?', answer: 'જ્યારે તાવ ઓછો થવા લાગે છે (લગભગ 3-7 દિવસ).' }
                ]
            }
        }
    },
    {
        id: 'covid',
        image: 'https://www.amprogress.org/wp-content/uploads/2020/03/Microbes-1-800x450.jpg',
        video: 'https://www.youtube.com/embed/i0ZabxXmH4Y',
        translations: {
            en: {
                name: 'COVID-19',
                symptoms: '<ul><li><strong>Respiratory:</strong> Dry continuous cough, shortness of breath, and sore throat.</li><li><strong>Systemic:</strong> Fever, chills, profound fatigue, and muscle/body aches.</li><li><strong>Sensory:</strong> Sudden loss of taste or smell.</li><li><strong>Severe cases:</strong> Pneumonia, acute respiratory distress syndrome (ARDS), and multi-organ failure.</li></ul>',
                causes: '<p>Caused by the SARS-CoV-2 coronavirus. It spreads primarily through respiratory droplets and aerosols when an infected person coughs, sneezes, speaks, or breathes heavily.</p>',
                prevention: '<ul><li>Get vaccinated and stay up to date with booster shots.</li><li>Wear high-filtration masks (N95/KN95) in crowded indoor spaces.</li><li>Maintain physical distancing and improve indoor ventilation.</li><li>Practice frequent hand washing.</li></ul>',
                medicine: '<p>Treatment varies by severity. Mild cases are managed with rest, hydration, and over-the-counter fever reducers. High-risk patients may receive <strong>antiviral medications (like Paxlovid)</strong>. Severe cases require hospitalization, supplemental oxygen, or mechanical ventilation.</p>',
                faq: [
                    { question: 'Is there a vaccine?', answer: 'Yes, vaccines are safe, highly effective, and significantly reduce the risk of severe illness.' },
                    { question: 'What is "Long COVID"?', answer: 'Long COVID refers to a range of symptoms (like fatigue, brain fog, and breathing issues) that can last weeks or months after the initial infection has cleared.' },
                    { question: 'How long should I isolate if I test positive?', answer: 'Guidelines vary, but generally, you should isolate for at least 5 days and wear a high-quality mask around others for 10 days.' },
                    { question: 'Can COVID-19 spread through food?', answer: 'There is currently no evidence that COVID-19 is transmitted through food or food packaging.' }
                ]
            },
            hi: {
                name: 'कोविड-19',
                symptoms: '<ul><li>सूखी खांसी, बुखार और सांस लेने में तकलीफ।</li><li>स्वाद या गंध का अचानक चले जाना।</li><li>थकान, गले में खराश और मांसपेशियों में दर्द।</li></ul>',
                causes: '<p>यह SARS-CoV-2 वायरस के कारण होता है। यह संक्रमित व्यक्ति के खांसने, छींकने या बोलने पर निकलने वाली बूंदों से फैलता है।</p>',
                prevention: '<ul><li>टीकाकरण (Vaccination) करवाएं।</li><li>भीड़-भाड़ वाली जगहों पर मास्क पहनें (N95)।</li><li>सामाजिक दूरी बनाए रखें और बार-बार हाथ धोएं।</li></ul>',
                medicine: '<p>हल्के लक्षणों के लिए आराम और दर्द निवारक दवाएं। गंभीर मामलों में एंटीवायरल दवाएं (जैसे Paxlovid) और ऑक्सीजन सपोर्ट।</p>',
                faq: [
                    { question: 'क्या वैक्सीन सुरक्षित है?', answer: 'हाँ, वैक्सीन पूरी तरह सुरक्षित और प्रभावी हैं।' },
                    { question: 'लॉन्ग कोविड क्या है?', answer: 'यह थकान और सांस की तकलीफ जैसे लक्षणों को संदर्भित करता है जो हफ्तों या महीनों तक रह सकते हैं।' },
                    { question: 'मुझे कितने समय तक आइसोलेट रहना चाहिए?', answer: 'आमतौर पर, आपको कम से कम 5 दिनों के लिए अलग रहना चाहिए।' },
                    { question: 'क्या कोविड-19 भोजन के माध्यम से फैल सकता है?', answer: 'इस बात का कोई प्रमाण नहीं है कि यह भोजन से फैलता है।' }
                ]
            },
            te: {
                name: 'కోవిడ్-19',
                symptoms: '<ul><li>పొడి దగ్గు, జ్వరం మరియు శ్వాస తీసుకోవడంలో ఇబ్బంది.</li><li>రుచి లేదా వాసన కోల్పోవడం.</li><li>తీవ్రమైన అలసట మరియు ఒళ్ళు నొప్పులు.</li></ul>',
                causes: '<p>ఇది సార్స్-కోవి-2 వైరస్ వలన వస్తుంది. గాలిలోని తుంపర్ల ద్వారా ఒకరి నుండి మరొకరికి వేగంగా వ్యాపిస్తుంది.</p>',
                prevention: '<ul><li>వ్యాక్సిన్ వేయించుకోండి.</li><li>మాస్క్ ధరించండి మరియు సామాజిక దూరం పాటించండి.</li><li>తరచుగా చేతులు శుభ్రం చేసుకోండి.</li></ul>',
                medicine: '<p>విశ్రాంతి, పారాసెటమాల్. తీవ్రమైన కేసులలో యాంటీవైరల్ మందులు మరియు ఆసుపత్రి చికిత్స అవసరం.</p>',
                faq: [
                    { question: 'వ్యాక్సిన్ సురక్షితమేనా?', answer: 'అవును, పూర్తిగా సురక్షితం.' },
                    { question: 'లాంగ్ కోవిడ్ అంటే ఏమిటి?', answer: 'ఇది ఇన్ఫెక్షన్ తర్వాత వారాలు లేదా నెలల పాటు ఉండే లక్షణాలను (అలసట వంటివి) సూచిస్తుంది.' },
                    { question: 'నేను ఎంతకాలం ఐసోలేషన్‌లో ఉండాలి?', answer: 'సాధారణంగా, కనీసం 5 రోజుల పాటు ఇతరులకు దూరంగా ఉండాలి.' },
                    { question: 'కోవిడ్-19 ఆహారం ద్వారా వ్యాపిస్తుందా?', answer: 'ఆహారం ద్వారా వ్యాపిస్తుందనడానికి ఆధారాలు లేవు.' }
                ]
            },
            ta: {
                name: 'கோவிட்-19',
                symptoms: '<p>காய்ச்சல், இருமல், மூச்சுத் திணறல்.</p>',
                causes: '<p>கொரோனா வைரஸ்.</p>',
                prevention: '<p>தடுப்பூசி, முகக்கவசம்.</p>',
                medicine: '<p>மருத்துவரின் ஆலோசனைப்படி.</p>',
                faq: [
                    { question: 'தடுப்பூசி உள்ளதா?', answer: 'ஆம், தடுப்பூசிகள் பாதுகாப்பானவை.' },
                    { question: 'லாங் கோவிட் என்றால் என்ன?', answer: 'தொற்றுக்குப் பிறகும் வாரங்கள் அல்லது மாதங்கள் நீடிக்கும் அறிகுறிகள்.' },
                    { question: 'எத்தனை நாட்கள் தனிமைப்படுத்த வேண்டும்?', answer: 'பொதுவாக குறைந்தபட்சம் 5 நாட்கள்.' },
                    { question: 'உணவு மூலம் பரவுமா?', answer: 'உணவு மூலம் பரவுவதற்கு எந்த ஆதாரமும் இல்லை.' }
                ]
            },
            kn: {
                name: 'ಕೋವಿಡ್-19',
                symptoms: '<p>ಜ್ವರ, ಕೆಮ್ಮು, ಉಸಿರಾಟದ ತೊಂದರೆ.</p>',
                causes: '<p>ಕೊರೊನಾ ವೈರಸ್.</p>',
                prevention: '<p>ಲಸಿಕೆ, ಮಾಸ್ಕ್.</p>',
                medicine: '<p>ವೈದ್ಯರ ಸಲಹೆ ಮೇರೆಗೆ.</p>',
                faq: [
                    { question: 'ಲಸಿಕೆ ಇದೆಯೇ?', answer: 'ಹೌದು, ಲಸಿಕೆಗಳು ಸುರಕ್ಷಿತವಾಗಿವೆ.' },
                    { question: 'ಲಾಂಗ್ ಕೋವಿಡ್ ಎಂದರೇನು?', answer: 'ಸೋಂಕಿನ ನಂತರ ವಾರಗಳು ಅಥವಾ ತಿಂಗಳುಗಳವರೆಗೆ ಇರಬಹುದಾದ ಲಕ್ಷಣಗಳು.' },
                    { question: 'ಎಷ್ಟು ದಿನ ಪ್ರತ್ಯೇಕವಾಗಿರಬೇಕು?', answer: 'ಸಾಮಾನ್ಯವಾಗಿ ಕನಿಷ್ಠ 5 ದಿನಗಳು.' },
                    { question: 'ಆಹಾರದ ಮೂಲಕ ಹರಡುತ್ತದೆಯೇ?', answer: 'ಆಹಾರದಿಂದ ಹರಡುತ್ತದೆ ಎಂಬುದಕ್ಕೆ ಯಾವುದೇ ಪುರಾವೆಗಳಿಲ್ಲ.' }
                ]
            },
            mr: {
                name: 'कोविड-19',
                symptoms: '<p>ताप, खोकला, श्वास घेण्यास त्रास.</p>',
                causes: '<p>कोरोना विषाणू.</p>',
                prevention: '<p>लस, मास्क.</p>',
                medicine: '<p>डॉक्टरांच्या सल्ल्याने.</p>',
                faq: [
                    { question: 'लस उपलब्ध आहे का?', answer: 'होय, लस सुरक्षित आणि प्रभावी आहे.' },
                    { question: 'लॉन्ग कोविड म्हणजे काय?', answer: 'संसर्गानंतर आठवडे किंवा महिने टिकून राहणारी लक्षणे.' },
                    { question: 'किती दिवस आयसोलेट राहावे?', answer: 'सामान्यतः किमान ५ दिवस.' },
                    { question: 'अन्नातून पसरतो का?', answer: 'अन्नातून पसरल्याचा कोणताही पुरावा नाही.' }
                ]
            },
            gu: {
                name: 'કોવિડ-19',
                symptoms: '<p>તાવ, ઉધરસ, શ્વાસ લેવામાં તકલીફ.</p>',
                causes: '<p>કોરોના વાયરસ.</p>',
                prevention: '<p>રસી, માસ્ક.</p>',
                medicine: '<p>ડૉક્ટરની સલાહ મુજબ.</p>',
                faq: [
                    { question: 'શું રસી છે?', answer: 'હા, રસી સુરક્ષિત છે.' },
                    { question: 'લોંગ કોવિડ શું છે?', answer: 'ચેપ પછી અઠવાડિયા કે મહિનાઓ સુધી રહેતા લક્ષણો.' },
                    { question: 'કેટલા દિવસ આઇસોલેટ થવું?', answer: 'ઓછામાં ઓછા 5 દિવસ.' },
                    { question: 'શું ખોરાક દ્વારા ફેલાય છે?', answer: 'ખોરાકથી ફેલાતો હોવાના કોઈ પુરાવા નથી.' }
                ]
            }
        }
    },
    {
        id: 'diabetes',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Symptoms_of_diabetes.svg/800px-Symptoms_of_diabetes.svg.png',
        video: 'https://www.youtube.com/embed/X9ivR4y03IE',
        translations: {
            en: {
                name: 'Diabetes',
                symptoms: '<ul><li><strong>Classic Signs:</strong> Excessive thirst (polydipsia), frequent urination (polyuria), and extreme hunger (polyphagia).</li><li><strong>Physical:</strong> Unexplained weight loss (Type 1), profound fatigue, and blurred vision.</li><li><strong>Healing:</strong> Slow-healing cuts, sores, and frequent skin or gum infections.</li></ul>',
                causes: '<p><strong>Type 1:</strong> An autoimmune reaction destroys insulin-producing beta cells in the pancreas.<br><strong>Type 2:</strong> The body becomes highly resistant to insulin. Risk factors include obesity, poor diet, genetics, and physical inactivity.</p>',
                prevention: '<ul><li>Type 1 cannot be prevented.</li><li><strong>Type 2 Prevention:</strong> Maintain a healthy BMI, engage in at least 150 minutes of aerobic exercise weekly, and eat a balanced diet low in refined sugars and ultra-processed foods.</li></ul>',
                medicine: '<p><strong>Type 1:</strong> Requires lifelong daily insulin injections or an insulin pump.<br><strong>Type 2:</strong> Managed via diet/exercise, oral medications (like Metformin, Sulfonylureas, SGLT2 inhibitors), and sometimes insulin.</p>',
                faq: [
                    { question: 'Can Type 2 diabetes be reversed?', answer: 'Yes, in early stages, significant weight loss and strict dietary changes can put Type 2 diabetes into remission.' },
                    { question: 'What is a normal fasting blood sugar level?', answer: 'A normal fasting blood sugar level is generally below 99 mg/dL. 100 to 125 mg/dL indicates prediabetes.' },
                    { question: 'Can eating too much sugar cause diabetes?', answer: 'Eating sugar doesn\'t directly cause Type 1 diabetes. For Type 2, a high-sugar diet can lead to obesity, which is a major risk factor.' },
                    { question: 'Does insulin cure diabetes?', answer: 'No, insulin is a treatment that helps manage blood sugar levels, but it is not a cure for the underlying disease.' }
                ]
            },
            hi: {
                name: 'मधुमेह (Diabetes)',
                symptoms: '<ul><li>बहुत अधिक प्यास लगना और बार-बार पेशाब आना।</li><li>अत्यधिक भूख लगना और बिना कारण वजन कम होना।</li><li>धुंधला दिखाई देना और घावों का धीरे भरना।</li></ul>',
                causes: '<p><strong>टाइप 1:</strong> शरीर इंसुलिन बनाना बंद कर देता है।<br><strong>टाइप 2:</strong> शरीर इंसुलिन का सही उपयोग नहीं कर पाता (मोटापा और खराब जीवनशैली इसके मुख्य कारण हैं)।</p>',
                prevention: '<ul><li>वजन को नियंत्रण में रखें।</li><li>नियमित व्यायाम करें और चीनी युक्त खाद्य पदार्थों से बचें।</li></ul>',
                medicine: '<p>टाइप 1 के लिए इंसुलिन इंजेक्शन जरूरी है। टाइप 2 के लिए मेटफॉर्मिन जैसी दवाएं और जीवनशैली में बदलाव आवश्यक है।</p>',
                faq: [
                    { question: 'क्या मधुमेह ठीक हो सकता है?', answer: 'जीवनशैली में बदलाव से इसे नियंत्रित किया जा सकता है।' },
                    { question: 'सामान्य ब्लड शुगर लेवल क्या है?', answer: 'खाली पेट ब्लड शुगर 99 mg/dL से कम होना चाहिए।' },
                    { question: 'क्या चीनी खाने से मधुमेह होता है?', answer: 'सीधे नहीं, लेकिन बहुत अधिक चीनी वजन बढ़ा सकती है जो एक बड़ा जोखिम है।' },
                    { question: 'क्या इंसुलिन मधुमेह को पूरी तरह ठीक कर देता है?', answer: 'नहीं, यह केवल शुगर लेवल को नियंत्रित करने में मदद करता है।' }
                ]
            },
            te: {
                name: 'మధుమేహం (Diabetes)',
                symptoms: '<ul><li>అధిక దాహం, తరచుగా మూత్రవిసర్జన.</li><li>ఎక్కువ ఆకలి వేయడం మరియు అకారణంగా బరువు తగ్గడం.</li><li>గాయాలు త్వరగా మానకపోవడం, కంటి చూపు మసకబారడం.</li></ul>',
                causes: '<p>శరీరంలో తగినంత ఇన్సులిన్ ఉత్పత్తి కాకపోవడం (టైప్ 1) లేదా ఉత్పత్తి అయిన ఇన్సులిన్ సరిగ్గా పనిచేయకపోవడం (టైప్ 2).</p>',
                prevention: '<ul><li>ఆరోగ్యకరమైన ఆహారం, క్రమం తప్పకుండా వ్యాయామం.</li><li>బరువు అదుపులో ఉంచుకోవడం మరియు స్వీట్లు తగ్గించడం.</li></ul>',
                medicine: '<p>ఇన్సులిన్ ఇంజెక్షన్లు (టైప్ 1 కు), మరియు మెట్‌ఫార్మిన్ లాంటి మాత్రలు (టైప్ 2 కు).</p>',
                faq: [
                    { question: 'మధుమేహం నయం చేయగలమా?', answer: 'ఆహార నియమాలతో అదుపులో ఉంచవచ్చు.' },
                    { question: 'సాధారణ బ్లడ్ షుగర్ స్థాయి ఎంత ఉండాలి?', answer: 'పరగడుపున 99 mg/dL కంటే తక్కువ ఉండాలి.' },
                    { question: 'చక్కెర ఎక్కువ తింటే మధుమేహం వస్తుందా?', answer: 'నేరుగా కాదు, కానీ స్థూలకాయానికి దారితీసి ప్రమాదాన్ని పెంచుతుంది.' },
                    { question: 'ఇన్సులిన్ మధుమేహాన్ని పూర్తిగా నయం చేస్తుందా?', answer: 'లేదు, ఇది కేవలం చక్కెర స్థాయిలను నియంత్రిస్తుంది.' }
                ]
            },
            ta: {
                name: 'நீரிழிவு',
                symptoms: '<p>அதிக தாகம், சோர்வு.</p>',
                causes: '<p>இன்சுலின் குறைபாடு.</p>',
                prevention: '<p>ஆரோக்கியமான உணவு, உடற்பயிற்சி.</p>',
                medicine: '<p>இன்சுலின், மாத்திரைகள்.</p>',
                faq: [
                    { question: 'குணப்படுத்த முடியுமா?', answer: 'கட்டுப்படுத்தலாம்.' },
                    { question: 'சாதாரண சர்க்கரை அளவு என்ன?', answer: '99 mg/dL க்கும் குறைவாக இருக்க வேண்டும்.' },
                    { question: 'அதிக சர்க்கரை சாப்பிட்டால் நீரிழிவு வருமா?', answer: 'உடல் பருமனுக்கு வழிவகுத்து ஆபத்தை அதிகரிக்கும்.' },
                    { question: 'இன்சுலின் முழுமையாக குணப்படுத்துமா?', answer: 'இல்லை, இது கட்டுப்படுத்த மட்டுமே உதவும்.' }
                ]
            },
            kn: {
                name: 'ಮಧುಮೇಹ',
                symptoms: '<p>ಹೆಚ್ಚಿನ ಬಾಯಾರಿಕೆ, ಆಯಾಸ.</p>',
                causes: '<p>ಇನ್ಸುಲಿನ್ ಕೊರತೆ.</p>',
                prevention: '<p>ಆರೋಗ್ಯಕರ ಆಹಾರ, ವ್ಯಾಯಾಮ.</p>',
                medicine: '<p>ಇನ್ಸುಲಿನ್.</p>',
                faq: [
                    { question: 'ಗುಣಪಡಿಸಬಹುದೇ?', answer: 'ನಿಯಂತ್ರಿಸಬಹುದು.' },
                    { question: 'ಸಾಮಾನ್ಯ ರಕ್ತದ ಸಕ್ಕರೆ ಮಟ್ಟ ಎಷ್ಟು?', answer: '99 mg/dL ಗಿಂತ ಕಡಿಮೆ ಇರಬೇಕು.' },
                    { question: 'ಸಕ್ಕರೆ ತಿಂದರೆ ಮಧುಮೇಹ ಬರುತ್ತದೆಯೇ?', answer: 'ನೇರವಾಗಿ ಅಲ್ಲ, ಆದರೆ ಬೊಜ್ಜು ಹೆಚ್ಚಿಸಬಹುದು.' },
                    { question: 'ಇನ್ಸುಲಿನ್ ಕಾಯಿಲೆಯನ್ನು ವಾಸಿ ಮಾಡುತ್ತದೆಯೇ?', answer: 'ಇಲ್ಲ, ಇದು ಕೇವಲ ನಿಯಂತ್ರಿಸುತ್ತದೆ.' }
                ]
            },
            mr: {
                name: 'मधुमेह',
                symptoms: '<p>जास्त तहान, थकवा.</p>',
                causes: '<p>इन्सुलिनची कमतरता.</p>',
                prevention: '<p>निरोगी आहार, व्यायाम.</p>',
                medicine: '<p>इन्सुलिन.</p>',
                faq: [
                    { question: 'बरे होऊ शकते का?', answer: 'नियंत्रणात ठेवता येते.' },
                    { question: 'सामान्य ब्लड शुगर किती असावी?', answer: '९९ mg/dL पेक्षा कमी.' },
                    { question: 'जास्त साखर खाल्ल्याने मधुमेह होतो का?', answer: 'थेट नाही, पण वजन वाढून धोका वाढतो.' },
                    { question: 'इन्सुलिनमुळे मधुमेह कायमचा बरा होतो का?', answer: 'नाही, ते फक्त नियंत्रणात ठेवते.' }
                ]
            },
            gu: {
                name: 'ડાયાબિટીસ',
                symptoms: '<p>વધુ તરસ, થાક.</p>',
                causes: '<p>ઇન્સ્યુલિનની કમી.</p>',
                prevention: '<p>સ્વસ્થ આહાર, કસરત.</p>',
                medicine: '<p>ઇન્સ્યુલિન.</p>',
                faq: [
                    { question: 'શું મટાડી શકાય?', answer: 'નિયંત્રણમાં રાખી શકાય.' },
                    { question: 'સામાન્ય બ્લડ સુગર સ્તર શું છે?', answer: '99 mg/dL થી ઓછું.' },
                    { question: 'વધુ ખાંડ ખાવાથી ડાયાબિટીસ થાય છે?', answer: 'સીધું નથી, પણ વજન વધવાથી જોખમ વધે છે.' },
                    { question: 'શું ઇન્સ્યુલિન રોગ મટાડે છે?', answer: 'ના, તે ફક્ત નિયંત્રણમાં રાખે છે.' }
                ]
            }
        }
    },
    {
        id: 'typhoid',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Salmonella_typhi.jpg/800px-Salmonella_typhi.jpg',
        video: 'https://www.youtube.com/embed/7R5nZfCjQ0Q',
        translations: {
            en: {
                name: 'Typhoid Fever',
                symptoms: '<ul><li><strong>Fever:</strong> Sustained fever that can reach as high as 104.9°F (40.5°C).</li><li><strong>Gastrointestinal:</strong> Abdominal pain, severe diarrhea or severe constipation.</li><li><strong>General:</strong> Weakness, muscle aches, sweating, and a rash of flat, rose-colored spots on the chest and abdomen.</li></ul>',
                causes: '<p>Typhoid is caused by <em>Salmonella enterica</em> serotype Typhi bacteria. It is highly contagious and spreads through the consumption of water or food contaminated by the feces of an infected person.</p>',
                prevention: '<ul><li>Get vaccinated (oral or injectable) before traveling to endemic areas.</li><li>Drink only boiled or safely bottled water.</li><li>Eat well-cooked food served hot; avoid raw fruits/vegetables you cannot peel yourself.</li><li>Wash hands thoroughly with soap and water.</li></ul>',
                medicine: '<p>Treated strictly with antibiotics such as <strong>Ciprofloxacin, Azithromycin, or Ceftriaxone</strong>. It is imperative to complete the full antibiotic course to prevent becoming a long-term asymptomatic carrier.</p>',
                faq: [
                    { question: 'Is typhoid fever contagious?', answer: 'Yes, it spreads easily through contaminated food or water handled by an infected person.' },
                    { question: 'What is a "typhoid carrier"?', answer: 'A carrier is someone who has recovered from the symptoms but still carries the bacteria in their gallbladder, shedding it in their feces and potentially infecting others.' },
                    { question: 'How long does typhoid fever last?', answer: 'Without antibiotics, it can last for weeks or months. With treatment, symptoms usually improve within 3 to 5 days.' },
                    { question: 'Is the typhoid vaccine 100% effective?', answer: 'No, vaccines are only 50-80% effective, so practicing safe eating and drinking habits remains crucial.' }
                ]
            },
            hi: {
                name: 'टाइफाइड',
                symptoms: '<ul><li>लगातार तेज बुखार (104°F तक)।</li><li>पेट दर्द, सिरदर्द और अत्यधिक कमजोरी।</li><li>दस्त या कब्ज, और कभी-कभी छाती पर गुलाबी दाने।</li></ul>',
                causes: '<p>यह <em>साल्मोनेला टाइफी</em> बैक्टीरिया के कारण होता है। दूषित भोजन और पानी के सेवन से यह तेजी से फैलता है।</p>',
                prevention: '<ul><li>टाइफाइड का टीका लगवाएं।</li><li>हमेशा उबला हुआ কলকাতায় साफ पानी पिएं।</li><li>कच्चा या बाहर का खुला खाना न खाएं और बार-बार हाथ धोएं।</li></ul>',
                medicine: '<p>डॉक्टर की सलाह से एंटीबायोटिक्स (जैसे सिप्रोफ्लोक्सासिन, एज़िथ्रोमाइसिन) का पूरा कोर्स करना आवश्यक है।</p>',
                faq: [
                    { question: 'क्या टाइफाइड संक्रामक है?', answer: 'हाँ, दूषित भोजन/पानी के माध्यम से।' },
                    { question: 'टाइफाइड कैरियर क्या है?', answer: 'वह व्यक्ति जो ठीक हो गया है लेकिन अभी भी बैक्टीरिया फैला सकता है।' },
                    { question: 'टाइफाइड कितने समय तक रहता है?', answer: 'उपचार के साथ लक्षण 3 से 5 दिनों में सुधर जाते हैं।' },
                    { question: 'क्या वैक्सीन पूरी तरह प्रभावी है?', answer: 'नहीं, यह केवल 50-80% तक सुरक्षित है, इसलिए साफ-सफाई जरूरी है।' }
                ]
            },
            te: {
                name: 'టైఫాయిడ్',
                symptoms: '<ul><li>సుదీర్ఘమైన అధిక జ్వరం.</li><li>కడుపు నొప్పి, తలనొప్పి, మరియు విపరీతమైన నీరసం.</li><li>విరేచనాలు లేదా మలబద్ధకం.</li></ul>',
                causes: '<p>ఇది <em>సాల్మోనెల్లా టైఫీ</em> అనే బ్యాక్టీరియా వల్ల వస్తుంది. కలుషితమైన ఆహారం మరియు నీటి ద్వారా ఇది వ్యాపిస్తుంది.</p>',
                prevention: '<ul><li>వేడి చేసి చల్లార్చిన నీటిని మాత్రమే త్రాగాలి.</li><li>పరిశుభ్రమైన మరియు బాగా ఉడికించిన ఆహారం తినాలి.</li><li>వ్యక్తిగత పరిశుభ్రత పాటించాలి.</li></ul>',
                medicine: '<p>సిప్రోఫ్లోక్సాసిన్ లేదా అజిత్రోమైసిన్ వంటి యాంటీబయాటిక్స్ వాడాలి. కోర్సు పూర్తిగా వాడటం తప్పనిసరి.</p>',
                faq: [
                    { question: 'అంటువ్యాధా?', answer: 'అవును, కలుషిత నీరు/ఆహారం ద్వారా.' },
                    { question: 'టైఫాయిడ్ క్యారియర్ అంటే ఏమిటి?', answer: 'కోలుకున్న తర్వాత కూడా ఇతరులకు బ్యాక్టీరియాను వ్యాప్తి చేయగల వ్యక్తి.' },
                    { question: 'జ్వరం ఎన్ని రోజులు ఉంటుంది?', answer: 'మందులు వాడితే 3 నుండి 5 రోజుల్లో తగ్గుతుంది.' },
                    { question: 'వ్యాక్సిన్ 100% పనిచేస్తుందా?', answer: 'లేదు, అందుకే పరిశుభ్రత కూడా చాలా ముఖ్యం.' }
                ]
            },
            ta: {
                name: 'டைபாய்டு',
                symptoms: '<p>காய்ச்சல், வயிற்று வலி.</p>',
                causes: '<p>பாக்டீரியா.</p>',
                prevention: '<p>சுத்தமான நீர், காய்ச்சிய நீர்.</p>',
                medicine: '<p>ஆண்டிபயாடிக்குகள்.</p>',
                faq: [
                    { question: 'பரவுமா?', answer: 'ஆம், அசுத்தமான உணவு/நீர் மூலம் பரவும்.' },
                    { question: 'கேரியர் என்றால் என்ன?', answer: 'குணமடைந்த பிறகும் பாக்டீரியாவை பரப்பக்கூடிய நபர்.' },
                    { question: 'எவ்வளவு காலம் நீடிக்கும்?', answer: 'சிகிச்சையுடன் 3-5 நாட்களில் குறையும்.' },
                    { question: 'தடுப்பூசி முழுமையாக வேலை செய்யுமா?', answer: 'இல்லை, எனவே சுத்தமான உணவு அவசியம்.' }
                ]
            },
            kn: {
                name: 'ಟೈಫಾಯಿಡ್',
                symptoms: '<p>ಜ್ವರ, ಹೊಟ್ಟೆ ನೋವು.</p>',
                causes: '<p>ಬ್ಯಾಕ್ಟೀರಿಯಾ.</p>',
                prevention: '<p>ಶುದ್ಧ ನೀರು.</p>',
                medicine: '<p>ಆಂಟಿಬಯೋಟಿಕ್ಸ್.</p>',
                faq: [
                    { question: 'ಹರಡುತ್ತದೆಯೇ?', answer: 'ಹೌದು, ಕಲುಷಿತ ಆಹಾರ/ನೀರಿನಿಂದ.' },
                    { question: 'ಕ್ಯಾರಿಯರ್ ಎಂದರೇನು?', answer: 'ಗುಣಮುಖರಾದ ಮೇಲೂ ಬ್ಯಾಕ್ಟೀರಿಯಾ ಹರಡುವ ವ್ಯಕ್ತಿ.' },
                    { question: 'ಎಷ್ಟು ದಿನ ಇರುತ್ತದೆ?', answer: 'ಚಿಕಿತ್ಸೆಯಿಂದ 3-5 ದಿನಗಳಲ್ಲಿ ಕಡಿಮೆಯಾಗುತ್ತದೆ.' },
                    { question: 'ಲಸಿಕೆ 100% ಪರಿಣಾಮಕಾರಿಯೇ?', answer: 'ಇಲ್ಲ, ಸ್ವಚ್ಛತೆ ಮುಖ್ಯ.' }
                ]
            },
            mr: {
                name: 'टायफॉइड',
                symptoms: '<p>ताप, पोटदुखी.</p>',
                causes: '<p>जीवाणू.</p>',
                prevention: '<p>स्वच्छ पाणी.</p>',
                medicine: '<p>अँटीबायोटिक्स.</p>',
                faq: [
                    { question: 'पसरतो का?', answer: 'होय, दूषित अन्न आणि पाण्याद्वारे.' },
                    { question: 'कॅरियर म्हणजे काय?', answer: 'बरा झालेला पण तरीही जीवाणू पसरवणारा व्यक्ती.' },
                    { question: 'किती काळ टिकतो?', answer: 'उपचाराने ३-५ दिवसात बरे वाटते.' },
                    { question: 'लस १००% प्रभावी आहे का?', answer: 'नाही, म्हणून स्वच्छता आवश्यक आहे.' }
                ]
            },
            gu: {
                name: 'ટાઇફોઇડ',
                symptoms: '<p>તાવ, પેટનો દુખાવો.</p>',
                causes: '<p>બેક્ટેરિયા.</p>',
                prevention: '<p>શુદ્ધ પાણી.</p>',
                medicine: '<p>એન્ટીબાયોટીક્સ.</p>',
                faq: [
                    { question: 'શું ફેલાય છે?', answer: 'હા, દૂષિત ખોરાક અને પાણી દ્વારા.' },
                    { question: 'કેરિયર શું છે?', answer: 'વ્યક્તિ જે સાજો થઈ ગયો છે પણ બેક્ટેરિયા ફેલાવી શકે છે.' },
                    { question: 'કેટલો સમય રહે છે?', answer: 'સારવારથી 3-5 દિવસમાં રાહત મળે છે.' },
                    { question: 'શું રસી 100% અસરકારક છે?', answer: 'ના, સ્વચ્છતા જાળવવી ખૂબ જરૂરી છે.' }
                ]
            }
        }
    },
    {
        id: 'cholera',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Cholera_bacteria_SEM.jpg/800px-Cholera_bacteria_SEM.jpg',
        video: 'https://www.youtube.com/embed/jG1VNSCsP5Q',
        translations: {
            en: {
                name: 'Cholera',
                symptoms: '<ul><li><strong>Severe Diarrhea:</strong> Sudden onset of copious, painless, watery diarrhea (often called "rice-water stools").</li><li><strong>Physical:</strong> Nausea, vomiting, and severe leg cramps due to electrolyte loss.</li><li><strong>Dehydration:</strong> Extreme thirst, sunken eyes, dry mouth, and lethargy. Can progress to hypovolemic shock.</li></ul>',
                causes: '<p>Caused by the bacterium <em>Vibrio cholerae</em>. It produces a potent toxin in the small intestine that forces the body to secrete enormous amounts of water. It spreads through contaminated water and food in areas with poor sanitation.</p>',
                prevention: '<ul><li>Drink and use safe, purified, or boiled water.</li><li>Wash hands frequently with soap and safe water.</li><li>Eat food that is completely cooked and hot, and avoid raw seafood.</li><li>Oral cholera vaccines are available for outbreaks or travel.</li></ul>',
                medicine: '<p><strong>Immediate Rehydration is life-saving.</strong> Oral Rehydration Salts (ORS) are critical. Severe cases require massive intravenous (IV) fluid replacement and antibiotics (like Doxycycline or Azithromycin) to shorten the illness duration.</p>',
                faq: [
                    { question: 'Is cholera fatal?', answer: 'Yes, without immediate rehydration therapy, severe cholera can kill a healthy adult within hours.' },
                    { question: 'How is cholera diagnosed?', answer: 'It is typically diagnosed by testing a stool sample for the Vibrio cholerae bacterium.' },
                    { question: 'Can I get cholera from a sick person?', answer: 'Direct person-to-person transmission is rare. It almost always spreads through contaminated water or food.' },
                    { question: 'Are there vaccines for cholera?', answer: 'Yes, oral cholera vaccines are available and recommended for people traveling to areas with active outbreaks.' }
                ]
            },
            hi: {
                name: 'हैजा (Cholera)',
                symptoms: '<ul><li>अचानक भारी मात्रा में पानी जैसा दस्त (चावल के पानी जैसा)।</li><li>उल्टी आना और शरीर में पानी की भारी कमी (Dehydration)।</li><li>पैरों की मांसपेशियों में गंभीर ऐंठन।</li></ul>',
                causes: '<p>यह <em>विब्रियो कॉलेरी</em> बैक्टीरिया के कारण होता है। यह मुख्य रूप से दूषित पानी और अस्वच्छ भोजन के माध्यम से फैलता है।</p>',
                prevention: '<ul><li>हमेशा साफ या उबला हुआ पानी पिएं।</li><li>खाना पकाने और खाने से पहले हाथ साबुन से धोएं।</li><li>कच्चा या अधपका भोजन खाने से बचें।</li></ul>',
                medicine: '<p>सबसे महत्वपूर्ण उपचार <strong>ओआरएस (ORS)</strong> का घोल है। गंभीर मामलों में नसों के जरिए तरल पदार्थ (IV Fluids) और एंटीबायोटिक्स दी जाती हैं।</p>',
                faq: [
                    { question: 'क्या हैजा घातक है?', answer: 'हाँ, निर्जलीकरण (dehydration) के कारण यह कुछ ही घंटों में घातक हो सकता है।' },
                    { question: 'हैजे का निदान कैसे होता है?', answer: 'मल के नमूने (Stool sample) की जांच करके।' },
                    { question: 'क्या यह एक व्यक्ति से दूसरे व्यक्ति में फैलता है?', answer: 'सीधे तौर पर नहीं, यह दूषित पानी/भोजन से फैलता है।' },
                    { question: 'क्या हैजे का टीका उपलब्ध है?', answer: 'हाँ, मौखिक (oral) टीके उपलब्ध हैं।' }
                ]
            },
            te: {
                name: 'కలరా (Cholera)',
                symptoms: '<ul><li>తీవ్రమైన మరియు నీళ్ల విరేచనాలు (బియ్యం కడిగిన నీరులా).</li><li>వాంతులు మరియు కాళ్లలో భయంకరమైన తిమ్మిర్లు.</li><li>శరీరంలో నీటి శాతం పడిపోవడం (డీహైడ్రేషన్).</li></ul>',
                causes: '<p>ఇది <em>విబ్రియో కలరా</em> అనే బ్యాక్టీరియా వలన వస్తుంది. పరిశుభ్రత లేని నీరు మరియు ఆహారం ద్వారా కడుపులోకి చేరుతుంది.</p>',
                prevention: '<ul><li>సురక్షితమైన లేదా వేడి చేసిన నీటిని త్రాగాలి.</li><li>మరుగుదొడ్డి వాడిన తర్వాత, భోజనానికి ముందు చేతులు సబ్బుతో కడుక్కోవాలి.</li></ul>',
                medicine: '<p>వెంటనే <strong>ORS (ఓఆర్ఎస్)</strong> ద్రావణం త్రాగించాలి. పరిస్థితి విషమిస్తే ఆసుపత్రిలో ఐవీ (IV) ఫ్లూయిడ్స్ మరియు యాంటీబయాటిక్స్ ఇవ్వాలి.</p>',
                faq: [
                    { question: 'కలరా ప్రమాదకరమా?', answer: 'అవును, సకాలంలో చికిత్స అందకపోతే ప్రాణాంతకం.' },
                    { question: 'కలరాను ఎలా గుర్తిస్తారు?', answer: 'మలం (Stool) పరీక్ష ద్వారా.' },
                    { question: 'ఇది ఒకరి నుండి మరొకరికి వ్యాపిస్తుందా?', answer: 'నేరుగా కాదు, కలుషిత నీటి ద్వారా మాత్రమే.' },
                    { question: 'కలరాకు వ్యాక్సిన్ ఉందా?', answer: 'అవును, నోటి ద్వారా తీసుకునే వ్యాక్సిన్లు అందుబాటులో ఉన్నాయి.' }
                ]
            },
            ta: {
                name: 'காலரா',
                symptoms: '<p>கடுமையான வயிற்றுப்போக்கு, நீர்ச்சத்து குறைதல்.</p>',
                causes: '<p>அசுத்தமான நீர்.</p>',
                prevention: '<p>சுத்தமான காய்ச்சிய நீர் குடிக்கவும்.</p>',
                medicine: '<p>ORS கரைசல்.</p>',
                faq: [
                    { question: 'ஆபத்தானதா?', answer: 'ஆம், நீர்ச்சத்து குறைவதால் உயிரிழப்பு ஏற்படலாம்.' },
                    { question: 'எப்படி கண்டறிவது?', answer: 'மலம் பரிசோதனை மூலம்.' },
                    { question: 'நேரடியாக பரவுமா?', answer: 'இல்லை, அசுத்தமான நீர் மூலமே பரவும்.' },
                    { question: 'தடுப்பூசி உள்ளதா?', answer: 'ஆம், வாய்வழி தடுப்பூசிகள் உள்ளன.' }
                ]
            },
            kn: {
                name: 'ಕಾಲರಾ',
                symptoms: '<p>ತೀವ್ರ ಭೇದಿ, ನಿರ್ಜಲೀಕರಣ.</p>',
                causes: '<p>ಕಲುಷಿತ ನೀರು.</p>',
                prevention: '<p>ಶುದ್ಧ ನೀರು.</p>',
                medicine: '<p>ORS.</p>',
                faq: [
                    { question: 'ಅಪಾಯಕಾರಿಯೇ?', answer: 'ಹೌದು, ಚಿಕಿತ್ಸೆ ನೀಡದಿದ್ದರೆ ಮಾರಣಾಂತಿಕ.' },
                    { question: 'ಹೇಗೆ ಪತ್ತೆ ಮಾಡುವುದು?', answer: 'ಮಲ ಪರೀಕ್ಷೆಯ ಮೂಲಕ.' },
                    { question: 'ನೇರವಾಗಿ ಹರಡುತ್ತದೆಯೇ?', answer: 'ಇಲ್ಲ, ಕಲುಷಿತ ನೀರಿನಿಂದ ಮಾತ್ರ.' },
                    { question: 'ಲಸಿಕೆ ಇದೆಯೇ?', answer: 'ಹೌದು, ಬಾಯಿಯ ಮೂಲಕ ನೀಡುವ ಲಸಿಕೆಗಳಿವೆ.' }
                ]
            },
            mr: {
                name: 'कॉलरा',
                symptoms: '<p>तीव्र जुलाब, डिहायड्रेशन.</p>',
                causes: '<p>अस्वच्छ पाणी.</p>',
                prevention: '<p>स्वच्छ पाणी.</p>',
                medicine: '<p>ORS.</p>',
                faq: [
                    { question: 'धोकादायक आहे का?', answer: 'होय, वेळेवर उपचार न केल्यास जीवघेणा ठरू शकतो.' },
                    { question: 'कसे ओळखायचे?', answer: 'स्टूल चाचणीद्वारे.' },
                    { question: 'थेट पसरतो का?', answer: 'नाही, मुख्यत्वे दूषित पाण्याने पसरतो.' },
                    { question: 'लस उपलब्ध आहे का?', answer: 'होय, ओरल व्हॅक्सीन उपलब्ध आहेत.' }
                ]
            },
            gu: {
                name: 'કોલેરા',
                symptoms: '<p>સખત ઝાડા, ડીહાઇડ્રેશન.</p>',
                causes: '<p>અશુદ્ધ પાણી.</p>',
                prevention: '<p>શુદ્ધ પાણી.</p>',
                medicine: '<p>ORS.</p>',
                faq: [
                    { question: 'શું જોખમી છે?', answer: 'હા, જો સારવાર ન મળે તો જીવલેણ બની શકે છે.' },
                    { question: 'નિદાન કેવી રીતે થાય છે?', answer: 'સ્ટૂલ ટેસ્ટ દ્વારા.' },
                    { question: 'શું તે સીધો ફેલાય છે?', answer: 'ના, તે દૂષિત પાણી દ્વારા ફેલાય છે.' },
                    { question: 'શું રસી છે?', answer: 'હા, ઓરલ રસી ઉપલબ્ધ છે.' }
                ]
            }
        }
    },
    {
        id: 'tuberculosis',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tuberculosis-x-ray.jpg/800px-Tuberculosis-x-ray.jpg',
        video: 'https://www.youtube.com/embed/2_D7Kih8X2o',
        translations: {
            en: {
                name: 'Tuberculosis (TB)',
                symptoms: '<ul><li><strong>Pulmonary (Lungs):</strong> A severe, persistent cough lasting 3 weeks or longer, chest pain, and coughing up blood or heavy sputum.</li><li><strong>Systemic:</strong> Profound fatigue, unexplained weight loss, loss of appetite, fever, and severe night sweats.</li></ul>',
                causes: '<p>TB is caused by the bacterium <em>Mycobacterium tuberculosis</em>. It is airborne and spreads when an infected person with active pulmonary TB coughs, sneezes, or speaks, releasing microscopic droplets.</p>',
                prevention: '<ul><li>Infected individuals must take medication and wear masks.</li><li>Ensure living and working spaces are well-ventilated.</li><li>The BCG vaccine is administered to children in highly endemic countries to prevent severe forms of TB.</li></ul>',
                medicine: '<p>Treating active TB requires a strict regimen of multiple antibiotics (Isoniazid, Rifampin, Ethambutol, Pyrazinamide) taken daily for <strong>6 to 9 months</strong>. Stopping early can lead to highly dangerous Multi-Drug Resistant TB (MDR-TB).</p>',
                faq: [
                    { question: 'Can TB be completely cured?', answer: 'Yes, if the patient meticulously follows and completes the entire 6-9 month antibiotic course.' },
                    { question: 'What is Latent TB?', answer: 'Latent TB means you have the bacteria in your body, but your immune system is keeping it inactive. You are not sick and cannot spread it.' },
                    { question: 'Can TB affect organs other than the lungs?', answer: 'Yes, while pulmonary TB is most common, Extrapulmonary TB can affect the kidneys, brain, spine, or lymph nodes.' },
                    { question: 'What happens if I stop taking TB medication early?', answer: 'The TB can return, and the bacteria can mutate to become Multi-Drug Resistant TB (MDR-TB), which is much harder to treat.' }
                ]
            },
            hi: {
                name: 'क्षय रोग (टीबी)',
                symptoms: '<ul><li>3 सप्ताह या उससे अधिक समय तक लगातार खांसी रहना।</li><li>खांसी के साथ बलगम या खून आना और सीने में दर्द।</li><li>वजन का तेजी से कम होना, भूख न लगना और रात में पसीना आना।</li></ul>',
                causes: '<p>यह <em>माइकोबैक्टीरियम ट्यूबरकुलोसिस</em> नामक बैक्टीरिया के कारण होता है। यह हवा के माध्यम से फैलता है (जब कोई संक्रमित व्यक्ति खांसता या छींकता है)।</p>',
                prevention: '<ul><li>नवजात शिशुओं को बीसीजी (BCG) का टीका लगवाना।</li><li>संक्रमित व्यक्ति को खांसते समय मुंह ढंकना चाहिए।</li><li>कमरों में हवा का अच्छा प्रवाह (Ventilation) रखें।</li></ul>',
                medicine: '<p>टीबी का इलाज <strong>6 से 9 महीने</strong> तक चलता है। इसमें एंटीबायोटिक्स का कोर्स (डॉट्स - DOTS) पूरा करना सबसे अहम है। बीच में दवा छोड़ने से बीमारी लाइलाज हो सकती है।</p>',
                faq: [
                    { question: 'क्या टीबी पूरी तरह ठीक हो सकती है?', answer: 'हाँ, यदि दवा का कोर्स बिना नागा किए पूरा किया जाए।' },
                    { question: 'लेटेंट (छुपी हुई) टीबी क्या है?', answer: 'बैक्टीरिया शरीर में है लेकिन निष्क्रिय है, और आप बीमार नहीं हैं।' },
                    { question: 'क्या टीबी फेफड़ों के अलावा अन्य अंगों को प्रभावित कर सकता है?', answer: 'हाँ, यह किडनी, मस्तिष्क या रीढ़ को भी प्रभावित कर सकता है।' },
                    { question: 'दवा बीच में छोड़ने से क्या होता है?', answer: 'टीबी वापस आ सकती है और दवा के प्रति प्रतिरोधी (MDR-TB) बन सकती है।' }
                ]
            },
            te: {
                name: 'క్షయ (టీబీ)',
                symptoms: '<ul><li>3 వారాలకు పైగా తగ్గని మొండి దగ్గు.</li><li>దగ్గినప్పుడు కఫం లేదా రక్తం పడటం, ఛాతీ నొప్పి.</li><li>బరువు తగ్గడం, ఆకలి మందగించడం, రాత్రిపూట విపరీతంగా చెమటలు పట్టడం.</li></ul>',
                causes: '<p>ఇది <em>మైకోబాక్టీరియం ట్యూబర్‌క్యులోసిస్</em> అనే బ్యాక్టీరియా వల్ల వస్తుంది. రోగి దగ్గినప్పుడు లేదా తుమ్మినప్పుడు గాలి ద్వారా ఇతరులకు సోకుతుంది.</p>',
                prevention: '<ul><li>పిల్లలకు పుట్టగానే BCG వ్యాక్సిన్ వేయించాలి.</li><li>రోగి దగ్గుతున్నప్పుడు ముక్కు, నోరు మూసుకోవాలి.</li><li>ఇంట్లో గాలి, వెలుతురు బాగా వచ్చేలా చూసుకోవాలి.</li></ul>',
                medicine: '<p>టీబీకి కనీసం <strong>6 నుండి 9 నెలల పాటు</strong> డాట్స్ (DOTS) మందులు క్రమం తప్పకుండా వాడాలి. మధ్యలో మానేస్తే వ్యాధి ప్రాణాంతకంగా మారుతుంది.</p>',
                faq: [
                    { question: 'టీబీ నయం అవుతుందా?', answer: 'అవును, కోర్సు పూర్తిగా వాడితే 100% నయం అవుతుంది.' },
                    { question: 'లేటెంట్ టీబీ అంటే ఏమిటి?', answer: 'బ్యాక్టీరియా శరీరంలో ఉన్నప్పటికీ నిష్క్రియంగా ఉంటుంది, వ్యాధి లక్షణాలు ఉండవు.' },
                    { question: 'టీబీ ఇతర అవయవాలకు వస్తుందా?', answer: 'అవును, మెదడు, కిడ్నీలు మరియు ఎముకలకు కూడా రావచ్చు.' },
                    { question: 'మధ్యలో మందులు ఆపేస్తే ఏమవుతుంది?', answer: 'వ్యాధి తిరగబెడుతుంది మరియు మందులకు లొంగని (MDR-TB) గా మారుతుంది.' }
                ]
            },
            ta: {
                name: 'காசநோய் (டிபி)',
                symptoms: '<p>தொடர் இருமல் (3 வாரம்), இரத்தம் கலந்த சளி.</p>',
                causes: '<p>பாக்டீரியா (காற்று மூலம் பரவும்).</p>',
                prevention: '<p>தடுப்பூசி, முகக்கவசம்.</p>',
                medicine: '<p>6-9 மாதங்கள் ஆண்டிபயாடிக்குகள்.</p>',
                faq: [
                    { question: 'குணப்படுத்த முடியுமா?', answer: 'ஆம், மருந்து முழுமையாக எடுத்தால்.' },
                    { question: 'மறைந்திருக்கும் டிபி என்றால் என்ன?', answer: 'பாக்டீரியா உடலில் இருந்தாலும் எந்த அறிகுறியும் இருக்காது.' },
                    { question: 'மற்ற உறுப்புகளையும் பாதிக்குமா?', answer: 'ஆம், மூளை மற்றும் சிறுநீரகங்களையும் பாதிக்கும்.' },
                    { question: 'மருந்தை பாதியில் நிறுத்தினால்?', answer: 'ஆபத்தான MDR-TB யாக மாறலாம்.' }
                ]
            },
            kn: {
                name: 'ಕ್ಷಯರೋಗ (ಟಿಬಿ)',
                symptoms: '<p>ನಿರಂತರ ಕೆಮ್ಮು (3 ವಾರ), ರಕ್ತ ಮಿಶ್ರಿತ ಕಫ.</p>',
                causes: '<p>ಬ್ಯಾಕ್ಟೀರಿಯಾ (ಗಾಳಿಯ ಮೂಲಕ ಹರಡುತ್ತದೆ).</p>',
                prevention: '<p>ಲಸಿಕೆ, ಮಾಸ್ಕ್.</p>',
                medicine: '<p>6-9 ತಿಂಗಳು ಔಷಧಿ.</p>',
                faq: [
                    { question: 'ಗುಣಪಡಿಸಬಹುದೇ?', answer: 'ಹೌದು, ಚಿಕಿತ್ಸೆ ಪೂರ್ಣಗೊಂಡರೆ.' },
                    { question: 'ಸುಪ್ತ ಟಿಬಿ ಎಂದರೇನು?', answer: 'ಬ್ಯಾಕ್ಟೀರಿಯಾ ದೇಹದಲ್ಲಿದ್ದರೂ ರೋಗಲಕ್ಷಣಗಳಿರುವುದಿಲ್ಲ.' },
                    { question: 'ಇತರ ಅಂಗಗಳಿಗೂ ಬರುತ್ತದೆಯೇ?', answer: 'ಹೌದು, ಮೆದುಳು ಮತ್ತು ಮೂಳೆಗಳಿಗೂ ಬರಬಹುದು.' },
                    { question: 'ಔಷಧಿ ನಿಲ್ಲಿಸಿದರೆ ಏನಾಗುತ್ತದೆ?', answer: 'ರೋಗವು ಉಲ್ಬಣಗೊಳ್ಳುತ್ತದೆ (MDR-TB).' }
                ]
            },
            mr: {
                name: 'क्षयरोग (टीबी)',
                symptoms: '<p>सतत खोकला (३ आठवडे), रक्तीय कफ.</p>',
                causes: '<p>जीवाणू (हवेतून पसरतो).</p>',
                prevention: '<p>लस, मास्क.</p>',
                medicine: '<p>६-९ महिने औषधोपचार.</p>',
                faq: [
                    { question: 'बरे होऊ शकते का?', answer: 'होय, कोर्स पूर्ण केल्यास.' },
                    { question: 'लेटेंट टीबी म्हणजे काय?', answer: 'जीवाणू शरीरात असतो पण लक्षणे नसतात.' },
                    { question: 'इतर अवयवांना प्रभावित करू शकतो का?', answer: 'होय, मेंदू आणि किडनीला सुद्धा.' },
                    { question: 'औषध मधेच सोडल्यास?', answer: 'MDR-TB होण्याचा धोका असतो.' }
                ]
            },
            gu: {
                name: 'ક્ષય રોગ (ટીબી)',
                symptoms: '<p>સતત ઉધરસ (૩ અઠવાડિયા), લોહીવાળો કફ.</p>',
                causes: '<p>બેક્ટેરિયા (હવા દ્વારા ફેલાય છે).</p>',
                prevention: '<p>રસી, માસ્ક.</p>',
                medicine: '<p>૬-૯ મહિના દવાઓ.</p>',
                faq: [
                    { question: 'શું મટાડી શકાય?', answer: 'હા, જો કોર્સ પૂર્ણ કરવામાં આવે.' },
                    { question: 'લેટેન્ટ ટીબી શું છે?', answer: 'બેક્ટેરિયા શરીરમાં છે પણ બીમારી નથી.' },
                    { question: 'અન્ય અંગોને અસર કરે છે?', answer: 'હા, મગજ અને કિડનીને પણ.' },
                    { question: 'દવા વચ્ચેથી બંધ કરવાથી?', answer: 'MDR-TB થવાનું જોખમ રહે છે.' }
                ]
            }
        }
    }
];
;

async function seedDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to Database for seeding...');

        // Clear existing data
        await Disease.deleteMany({});
        console.log('Old diseases cleared.');

        // Insert new data
        await Disease.insertMany(seedDiseases);
        console.log('Successfully seeded database with diseases.');

    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        mongoose.connection.close();
    }
}

seedDB();
