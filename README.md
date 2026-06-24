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

GitHub 저장소에 올려 두 가지 방식으로 사용할 수 있습니다.

- 웹: GitHub Pages 주소로 바로 접속
- Android: 저장소에 포함된 APK 파일을 다운로드해서 직접 설치

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

### 4. APK 파일 바로 설치

GitHub 저장소에서 아래 파일을 다운로드해 Android 폰에 설치하면 됩니다.

```text
release/meat-guide-mobile.apk
```

설치 순서:
1. GitHub 저장소에서 `release/meat-guide-mobile.apk` 파일을 누릅니다.
2. 우측 상단 또는 파일 화면의 `Download raw file` / `Raw` / 다운로드 버튼으로 APK를 받습니다.
3. Android 폰에서 APK를 열면 “알 수 없는 앱 설치” 허용 안내가 나올 수 있습니다.
4. 브라우저 또는 파일 관리자에 대해 “이 출처 허용”을 켠 뒤 설치합니다.
5. 설치 후 앱 이름 `고기 도감`을 실행합니다.

이 APK는 스토어 배포용이 아니라 직접 설치용 debug APK입니다. 개인 테스트/공유용으로 쓰면 됩니다.

주의: `node_modules/`, `dist/`, Android 중간 빌드 산출물은 Git에 올라가지 않도록 제외되어 있습니다. 배포용으로 복사한 APK만 `release/meat-guide-mobile.apk` 경로에 포함합니다.

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
