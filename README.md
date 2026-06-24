# 🥩 고기 부위 도감 모바일 앱 (Meat Guide Mobile)

이 프로젝트는 Vite, React, TypeScript, Capacitor를 기반으로 제작된 모바일 맞춤형 소고기 및 돼지고기 부위 정보 안내 도감 앱입니다.
사용자는 인터랙티브한 소/돼지 실루엣 다이어그램을 탭하여 해당 부위의 상세 정보(구매 가이드, 세부 명칭, 추천 요리 용도, 보관 및 요리 꿀팁)를 한국어 UI로 쉽게 탐색할 수 있습니다.

---

## 🚀 주요 기능

- **인터랙티브 부위 다이어그램**: SVG 기반의 소/돼지 부위별 다이어그램 제공 (선택 시 하이라이트 및 글로우 효과).
- **요리 용도별 필터링**: 구이, 국거리, 불고기, 찜, 육회용 부위를 요리 카테고리 탭을 통해 다이어그램 상에 노란색으로 하이라이트 표시.
- **실시간 검색**: 부위명, 영어 이름, 세부 부위, 요리 용도를 기준으로 실시간 매칭 기능 제공.
- **모바일 퍼스트 반응형 디자인**: 모바일 세로 화면을 최우선으로 하되, 태블릿 및 데스크톱 환경에서는 좌우 2분할 화면으로 자동 조절되는 프리미엄 레이아웃 구현.
- **Capacitor Android 탑재**: 네이티브 Android 빌드 및 실행 지원.

---

## 💻 로컬 개발 환경 실행 방법

### 1. 패키지 설치
프로젝트 루트 디렉토리에서 아래 명령어를 실행하여 필요한 패키지를 설치합니다.
```bash
npm install
```

### 2. 웹 브라우저 개발 서버 실행
Vite 기반의 로컬 개발 서버를 기동하여 실시간 반영(HMR) 브라우저 모드에서 개발 및 디버깅할 수 있습니다.
```bash
npm run dev
```
기본 주소: `http://localhost:5173`

---

## 📱 Android APK 로컬 빌드 방법

Capacitor를 사용하여 로컬 환경에서 Android 디버그 APK를 빌드하고 에뮬레이터나 실기기에 연동하는 방법입니다.

### 1. 전제 조건
- **JDK 17** 설치 및 `JAVA_HOME` 환경 변수 설정
- **Android Studio** 및 **Android SDK** 설치

### 2. 빌드 및 동기화 명령어
```bash
# 1) React 웹 리소스 배포 파일 생성 (dist 디렉토리 생성)
npm run build

# 2) Capacitor를 통해 배포된 웹 에셋을 Android 프로젝트로 복사 및 동기화
npx cap sync android

# 3) Android Studio로 프로젝트 열기 (선택 사항)
npx cap open android
```

### 3. 로컬 디버그 APK 파일 빌드 (CLI 명령어)
Android Studio를 켜지 않고 터미널에서 즉시 디버그용 `.apk` 파일을 생성할 수 있습니다.
```bash
cd android
./gradlew assembleDebug
```
빌드된 디버그 APK 경로:
`android/app/build/outputs/apk/debug/app-debug.apk`

---

## 🤖 GitHub Actions 자동 빌드 및 업로드 (CI/CD)

본 프로젝트는 GitHub Actions 워크플로우를 포함하고 있습니다.
`.github/workflows/android-debug-apk.yml` 설정 파일이 구성되어 있어 코드를 GitHub 저장소에 푸시(Push)하거나 Pull Request를 생성할 때마다 클라우드(Ubuntu) 상에서 자동으로 빌드를 수행합니다.

### 워크플로우 동작 과정
1. 코드 체크아웃 및 Node.js 패키지 설치
2. React 웹 프로젝트 빌드 (`npm run build`)
3. JDK 17 및 Android Gradle 빌드 환경 구성
4. `npx cap sync android` 실행
5. `gradlew assembleDebug` 명령어로 디버그 APK 컴파일
6. 완성된 `app-debug.apk` 파일을 GitHub Artifacts로 업로드

> **다운로드 방법**: GitHub 저장소의 **Actions** 탭 ➔ 가장 최근 워크플로우 실행 결과 클릭 ➔ 최하단의 **Artifacts** 영역에서 `app-debug-apk` 압축 파일을 다운로드하여 내부 APK 파일을 모바일 기기에 바로 설치해 테스트할 수 있습니다.

---

## 🛒 Google Play Store 출시 체크리스트 (Release Checklist)

프로덕션 환경(출시용)으로 빌드하여 Google Play Store에 배포하기 위한 상세 프로세스 목록입니다.

### 1. 앱 서명 키(Keystore) 생성
출시용 앱은 고유한 보안 키로 서명되어야만 배포 및 업데이트가 가능합니다. Keytool을 이용해 암호키를 발급받습니다.
```bash
keytool -genkey -v -keystore meat-guide-release.keystore -alias meat-guide-alias -keyalg RSA -keysize 2048 -validity 10000
```
> ⚠️ **중요**: 생성된 `keystore` 파일과 비밀번호는 절대 분실하거나 분실 위험이 있는 곳에 공개해서는 안 되며, 별도 백업 장치에 안전하게 저장해야 합니다.

### 2. 프로덕션 빌드 (AAB - Android App Bundle)
Google Play Store는 이제 AAB 포맷 업로드를 권장합니다. 빌드 시 아래 명령을 사용합니다.
```bash
# 1) 웹 컴파일 및 동기화
npm run build
npx cap sync android

# 2) Android 폴더로 이동하여 출시용 App Bundle 빌드
cd android
./gradlew bundleRelease
```
생성된 AAB 경로:
`android/app/build/outputs/bundle/release/app-release.aab`

### 3. AAB 파일 정렬 및 서명
생성된 App Bundle 파일에 위 1단계에서 발급받은 Keystore 키를 사용해 서명합니다.
```bash
apksigner sign --ks meat-guide-release.keystore android/app/build/outputs/bundle/release/app-release.aab
```
*(또는 Android Studio 내 `Build > Generate Signed Bundle / APK` 메뉴를 이용하면 GUI를 통해 수동 서명 및 빌드가 편리합니다.)*

### 4. Google Play Console 등록 절차
1. **Google 개발자 계정 가입** (등록비 25달러 소요)
2. **새 앱 생성**: 기본 언어(한국어) 선택, 앱 이름("고기부위 가이드") 설정.
3. **설문조사 완료**: 타겟층 설정, 개인정보처리방침 URL 등록, 콘텐츠 등급 평가 설문 작성.
4. **출시 트랙 선택**:
   - **내부 테스트(Internal Testing)**: 신뢰할 수 있는 소수의 테스터(최대 100명) 대상 즉시 배포 및 작동 확인 트랙. (권장)
   - **공개 테스트(Open/Closed Testing)**: 정식 출시 전 피드백을 수집하기 위한 베타 테스트 트랙.
   - **프로덕션(Production)**: 일반 사용자들이 다운로드할 수 있는 마켓 정식 배포 트랙.
5. **App Bundle 업로드**: 서명된 `app-release.aab` 파일을 릴리스 대시보드에 업로드.
6. **스토어 등록 정보 설정**: 앱 스크린샷(휴대폰/태블릿), 그래픽 이미지(1024x500), 고해상도 앱 아이콘(512x512) 및 짧은/자세한 앱 설명 등록.
7. **검토 및 심사 요청**: 모든 요구사항 제출 완료 후 Google 담당자의 검토를 거쳐 최대 수일 내 승인 후 스토어에 라이브 배포됩니다.
