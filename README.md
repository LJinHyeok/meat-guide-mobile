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
- **JDK 21** 설치 및 `JAVA_HOME` 환경 변수 설정
- **Android Studio** 및 **Android SDK** 설치 및 `ANDROID_HOME` 환경 변수 설정
  - 예 (리눅스 기준):
    ```bash
    export JAVA_HOME=$HOME/.local/jdks/jdk-21
    export ANDROID_HOME=$HOME/Android/Sdk
    export PATH=$PATH:$JAVA_HOME/bin:$ANDROID_HOME/platform-tools
    ```

### 2. 빌드 및 동기화 명령어
```bash
# 1) React 웹 리소스 배포 파일 생성 및 Android 프로젝트 동기화
npm run android:sync

# 2) Android Studio로 프로젝트 열기 (선택 사항)
npm run android:open
```

### 3. 로컬 디버그 APK 파일 빌드 (CLI 명령어)
Android Studio를 켜지 않고 터미널에서 즉시 디버그용 `.apk` 파일을 생성할 수 있습니다.
```bash
# package.json 스크립트 이용 (시스템 환경변수 활용)
npm run android:apk
```
또는 직접 Gradle 명령을 활용할 수도 있습니다.
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
3. JDK 21 및 Android Gradle 빌드 환경 구성
4. `npx cap sync android` 실행
5. `gradlew assembleDebug` 명령어로 디버그 APK 컴파일
6. 완성된 `app-debug.apk` 파일을 GitHub Artifacts로 업로드

> **다운로드 방법**: GitHub 저장소의 **Actions** 탭 ➔ 가장 최근 워크플로우 실행 결과 클릭 ➔ 최하단의 **Artifacts** 영역에서 `app-debug-apk` 압축 파일을 다운로드하여 내부 APK 파일을 모바일 기기에 바로 설치해 테스트할 수 있습니다.

---

## 🌐 GitHub 업로드 / 무료 웹 공개

Google Play 등록 없이 GitHub에만 올릴 경우 GitHub Pages로 무료 웹 배포할 수 있습니다.

### 1. GitHub에서 새 저장소 생성
- 추천 저장소 이름: `meat-guide-mobile`
- Public/Private는 원하는 대로 선택
- README, .gitignore, license 자동 생성은 선택하지 마세요. 이미 로컬 프로젝트에 있습니다.

### 2. 로컬 저장소를 GitHub 원격에 연결하고 푸시
```bash
cd /home/jinhy/projects/meat-guide-mobile
git remote add origin https://github.com/<GitHub아이디>/meat-guide-mobile.git
git push -u origin main
```

### 3. GitHub Pages 활성화
- GitHub 저장소 페이지 → Settings → Pages
- Source를 `GitHub Actions`로 선택
- 이후 `.github/workflows/pages.yml`의 `Deploy Web App to GitHub Pages` 워크플로가 `dist/`를 자동 배포합니다.

배포 주소는 보통 아래 형식입니다.
```text
https://<GitHub아이디>.github.io/meat-guide-mobile/
```

주의: `android/local.properties`, `android/keystores/`, `node_modules/`, `dist/`, Android 빌드 산출물은 Git에 올라가지 않도록 제외되어 있습니다.

---

## 🛒 Google Play Store 출시 및 릴리즈 빌드 (Release Signing & AAB)

Google Play Store에 배포하기 위해 릴리즈용 App Bundle(AAB)을 빌드하고 안전하게 서명하는 방법입니다.

### 1. 앱 서명 키(Keystore) 생성 및 보관
출시용 앱은 고유한 업로드 키로 서명되어야 합니다. 현재 로컬 개발 장치에는 아래 업로드 키가 생성되어 있습니다.

- Keystore: `android/keystores/meatguide-upload.jks`
- Alias: `meatguide-upload`
- 설정 파일: `android/local.properties`
- SHA-256: `7D:2F:6D:7C:B6:34:4E:F1:78:2C:CD:25:17:04:9D:BA:A4:BD:F9:CE:3A:0F:10:C8:1A:A1:5A:FE:45:BD:EE:25`

> ⚠️ **중요 (보안 경고)**: `android/keystores/`와 `android/local.properties`는 `.gitignore`로 제외되어 있습니다. 이 파일들과 비밀번호는 절대 Git 저장소에 커밋하지 말고, 별도 안전한 장소에 백업하십시오. 분실하면 Google Play 앱 업데이트가 어려워질 수 있습니다.

### 2. 빌드 스크립트 보안 서명 설정 (Secret Injection)
프로젝트 내의 비밀 값을 코드에 넣지 않으면서 릴리즈 빌드 시점에 자동 서명되도록 `android/app/build.gradle`이 구성되어 있습니다.

#### 방법 A: `local.properties` 사용 (현재 로컬 설정)
`android/local.properties`는 아래 형식입니다. 비밀번호 값은 로컬 파일에만 두고 커밋하지 않습니다.
```properties
sdk.dir=/home/jinhy/Android/Sdk
RELEASE_STORE_FILE=keystores/meatguide-upload.jks
RELEASE_STORE_PASSWORD=로컬에만_보관
RELEASE_KEY_ALIAS=meatguide-upload
RELEASE_KEY_PASSWORD=로컬에만_보관
```

#### 방법 B: 시스템 환경 변수 사용 (CI/CD 환경 설정)
CI에서 빌드할 경우 아래 값을 GitHub Actions Secrets 등으로 주입할 수 있습니다.
```bash
export RELEASE_STORE_FILE="/absolute/or/android-relative/path/to/upload-key.jks"
export RELEASE_STORE_PASSWORD="사용자가지정한스토어비밀번호"
export RELEASE_KEY_ALIAS="meatguide-upload"
export RELEASE_KEY_PASSWORD="사용자가지정한키비밀번호"
```

> ℹ️ **참고**: `local.properties`나 환경 변수가 없는 협업 환경에서는 서명되지 않은 AAB 빌드가 생성될 수 있습니다. Google Play 업로드에는 현재 로컬처럼 서명값이 설정된 환경에서 만든 AAB를 사용하십시오.

### 3. 프로덕션 빌드 (AAB - Android App Bundle)
Google Play Store 업로드용 `.aab` 파일을 생성하려면 아래 명령을 사용합니다.
```bash
# package.json 스크립트 실행 (환경변수나 local.properties가 로드되어 서명됨)
npm run android:aab
```
또는 직접 빌드할 수 있습니다.
```bash
cd android
./gradlew bundleRelease
```
서명된 릴리즈 AAB 파일 경로:
`android/app/build/outputs/bundle/release/app-release.aab`
이 AAB 파일을 Google Play Console에 업로드하시면 됩니다.

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

### 5. 이 저장소에 준비된 Play Store 제출 자료

아래 파일을 Play Console 입력값과 개인정보처리방침 웹페이지 초안으로 사용하십시오.

- `play-store/store_listing_ko.md`: 앱 이름, 짧은 설명, 자세한 설명
- `play-store/privacy_policy.md`: 개인정보처리방침 웹 게시용 초안
- `play-store/data_safety_answers.md`: 데이터 보안 설문 답변
- `play-store/play_store_assets.md`: 콘텐츠 등급, 20인 테스트, 출시 전 체크리스트 포함 통합 문서
- `play-store/assets/app_icon_512.png`: Play Console 고해상도 앱 아이콘 초안
- `play-store/assets/feature_graphic_1024x500.png`: 피처 그래픽 초안
- `play-store/assets/screenshot_1_1080x1920.png`, `screenshot_2_1080x1920.png`: 휴대폰 스크린샷 초안

현재 앱은 오프라인 도감 정책에 맞게 외부 폰트 호출, 외부 링크, Android `INTERNET` 권한을 제거했습니다. 회원가입, 로그인, 광고 SDK, 분석 SDK, 위치/카메라/연락처/저장소 권한도 사용하지 않습니다.

---

## 📶 오프라인 작동 설명 (Offline Mode & PWA Guide)

본 고기 부위 도감 모바일 앱은 사용자가 네트워크(Wi-Fi, 데이터 등)가 완전히 단절된 **오프라인 환경에서도 100% 정상 작동**하도록 설계되었습니다.

### 1. 오프라인 작동 기술 원리
* **로컬 데이터 세트**: 모든 소고기, 돼지고기 정보(`meatData.ts`)와 부위별 다이어그램(SVG Vector)은 외부 API나 외부 서버로부터 다운로드하지 않고 앱 코드에 내장(Bundled)되어 있습니다.
* **PWA Service Worker 캐싱**: `vite-plugin-pwa`를 통하여 빌드 시 서비스 워커(`sw.js`)와 파일 목록이 자동 생성됩니다. 첫 웹 브라우저 접속 후 HTML, CSS, JS, SVG 등의 핵심 정적 자산이 브라우저의 Cache Storage에 저장(Pre-caching)되므로 네트워크가 단절되어도 즉시 로드됩니다.
* **Capacitor 자산 번들링**: Capacitor 모바일 빌드 시 웹 에셋(`dist/` 폴더) 전체가 APK 바이너리 내부 디렉토리에 함께 담깁니다. 기기 내부의 로컬 웹뷰(`http://localhost` 또는 `capacitor://`)에서 구동되므로 통신 환경과 무관하게 언제나 즉각 실행됩니다.
* **실시간 오프라인 감지**: 네트워크 연결 상태를 모니터링하여, 통신 불능 상태가 감지될 시 앱 상단 로고 옆에 실시간 **'오프라인'** 상태 배지가 부착됩니다.

### 2. 브라우저/PWA 환경 오프라인 설치 방법
1. 모바일 기기의 브라우저(크롬, 사파리 등)로 웹 앱 주소에 접속합니다.
2. 브라우저 주소창 우측의 **'설치'** 아이콘 또는 더보기 메뉴의 **'홈 화면에 추가'**를 터치합니다.
3. 기기 홈 화면에 추가된 '고기 도감' 아이콘을 통해 실행하면, 네트워크(인터넷) 연결이 없는 비행기 모드에서도 완벽하게 실행 및 조회할 수 있습니다.

### 3. Capacitor Android 빌드 테스트
```bash
# 1) 웹 에셋 빌드 & 안드로이드 프로젝트 동기화
npm run android:sync

# 2) 기기 테스트 또는 APK 생성
npm run android:apk
```
빌드된 APK 파일을 기기에 수동 설치한 뒤 **데이터와 와이파이를 모두 끈 상태(비행기 모드)**에서 앱을 구동하여 오프라인 작동성을 확인할 수 있습니다.
