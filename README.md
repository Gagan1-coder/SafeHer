# SafeHer – Your Ultimate Safety Companion

SafeHer is an innovative mobile application designed to improve women's safety and security, empowering women to navigate different situations with greater confidence. It integrates modern technologies and practical safety features to help users during emergencies and everyday travel.

## Features

- **SOS Alert:** Quickly shares the user's location with preset trusted contacts during emergencies.
- **Safe Route:** Uses Google Maps API and a K-means clustering ML algorithm to suggest safer and shorter routes.
- **Violence Detection with Smart Glasses:** Uses integrated smart glasses and an ML model to detect potential violence. If the user does not respond within 60 seconds, an SOS alert is triggered.
- **Accident Prevention:** Uses Flutter sensor capabilities to detect harsh braking and potential accidents.
- **Regular Safety Assurance Mode:** Sends periodic safety notifications through a background service.
- **Emergency Services Locator:** Helps locate nearby police stations, hospitals, and bus stands.
- **Helpline Directory:** Provides important emergency contact numbers.
- **Fake Caller:** Simulates an incoming call through a manual trigger or phone shake.
- **Scheduled Fake Caller:** Allows users to schedule simulated calls with a customized name, number, and time.
- **AI Chatbot (Sakha):** Integrates Gemini AI, Vertex AI API, and Dialogflow to provide women's safety guidance and assistance.
- **Crowdsourced Safety Zones:** Allows users to report unsafe areas and identify verified safe zones.
- **Offline Accessibility:** Keeps selected core functionalities accessible without internet connectivity.
- **Audio-Video Recording:** Supports automatic audio-video recording with SOS alerts for emergency documentation.

## Purpose

SafeHer aims to contribute to a safer environment for women through technology and community engagement. Its mission is to empower women with tools and resources that improve personal safety, confidence, and access to emergency assistance.

## Architecture

![SafeHer Architecture](https://github.com/thisispriyanshu/saheli/assets/73881504/8fd971f9-ca7f-45c8-a54d-85e44973d918)

## Folder Structure

- **backend:** Node.js and Express.js backend with Google Firestore database.
- **frontend/saheli_app:** Flutter application frontend.
- **gemini-chatbot:** RAG-based chatbot built using Gemini AI and LlamaIndex.
- **real-time-video-detection:** Machine learning module using TensorFlow and OpenCV for video-based violence detection.
- **safe-route:** Safe-route machine learning model.
- **saheli_web:** Website built using Next.js.
- **smart-glasses-feature:** Raspberry Pi code for smart glasses integration, real-time video capture, and SOS functionality.

## How to Run the Frontend (Flutter)

1. Clone the repository:

   ```bash
   git clone https://github.com/Gagan1-coder/SafeHer.git
   ```

2. Navigate to the Flutter project:

   ```bash
   cd SafeHer/frontend/saheli_app
   ```

3. If the project uses a local `audioplayers` package, download it from [audioplayers GitHub](https://github.com/bluefireteam/audioplayers/tree/master/packages/audioplayers) and configure its local path in `pubspec.yaml`.

4. Fetch Flutter dependencies:

   ```bash
   flutter pub get
   ```

5. Connect an Android device or start an emulator.

6. Run the application:

   ```bash
   flutter run lib/main.dart
   ```

## How to Run the Backend (Node.js)

1. Clone the repository:

   ```bash
   git clone https://github.com/Gagan1-coder/SafeHer.git
   ```

2. Navigate to the backend:

   ```bash
   cd SafeHer/backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the backend directory and configure your own API keys:

   ```env
   GEMINI_API_KEY=
   GOOGLE_MAPS_API_KEY=
   SECRET_KEY=
   PORT=8080
   ```

5. Start the backend:

   ```bash
   npm start
   ```

## Technologies Used

- Flutter and Dart
- Node.js and Express.js
- Google Maps API
- K-means Clustering
- Firebase Authentication and Firestore
- Dialogflow
- Gemini AI API
- Vertex AI API
- Gemma
- Google Compute Engine
- TensorFlow
- OpenCV
- Raspberry Pi
- CNN (VGG-16)

## Application Images

Upload your own SafeHer screenshots into the `screenshots` folder in your GitHub repository.

<div align="center">
  <img src="screenshots/screenshot1.png" width="30%" alt="SafeHer Screenshot 1" />
  <img src="screenshots/screenshot2.png" width="30%" alt="SafeHer Screenshot 2" />
  <img src="screenshots/screenshot3.png" width="30%" alt="SafeHer Screenshot 3" />
</div>

<div align="center">
  <img src="screenshots/screenshot4.png" width="30%" alt="SafeHer Screenshot 4" />
  <img src="screenshots/screenshot5.png" width="30%" alt="SafeHer Screenshot 5" />
  <img src="screenshots/screenshot6.png" width="30%" alt="SafeHer Screenshot 6" />
</div>

## Further Enhancement Ideas

1. **Community Engagement Campaigns:** Organize workshops and awareness campaigns to educate women about personal safety.
2. **Government Partnerships:** Collaborate with government authorities to access street lighting and crime data for safer route recommendations.
3. **Local Authority Partnerships:** Integrate the application with local emergency services and safety infrastructure.
4. **Gamification:** Encourage community participation in reporting unsafe areas and identifying safe zones.
5. **Real-Time Safety Alerts:** Provide location-based alerts about potential safety risks.
6. **Peer Support Networks:** Help users connect with nearby trusted individuals for assistance during travel.

## Impact and UN Sustainable Development Goals

### Goal 4: Quality Education

- Promotes self-defense knowledge and personal safety awareness.
- Encourages self-empowerment and confidence.

### Goal 5: Gender Equality

- Empowers women through SOS alerts, safety tools, and guidance.
- Supports safer travel and improved participation in public life.

### Goal 11: Sustainable Cities and Communities

- Promotes safer public spaces.
- Encourages community participation in safety reporting.

### Goal 16: Peace, Justice and Strong Institutions

- Helps users access emergency assistance.
- Encourages collaboration between communities and authorities.

## How to Contribute

Contributions to SafeHer are welcome! If you have ideas for new features, improvements, or bug fixes, feel free to submit a pull request.

## About the Original Development Team

- [Apoorv Yash](https://www.linkedin.com/in/apoorv-yash-75b130230/)
- [Priyanshu Agrawal](https://www.linkedin.com/in/priyanshu-agrawal-5a00651b1/)
- [Yuvraj Singh](https://www.linkedin.com/in/yuvraj-singh-5198441aa/)
- [Agrim Saxena](https://www.linkedin.com/in/agrim-saxena-29529b223/)

## License

This project is licensed under the [MIT License](LICENSE).
