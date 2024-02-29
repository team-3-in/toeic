## Doit-Toeic Server

배포 URL - <https://api.doit-toeic.xyz/>

## ERD

![toeic-erd](https://github.com/team-3-in/toeic/assets/96982072/b29a9d54-20a1-4846-af9b-9792d6fb8257)

## 인프라 아키텍처

![toeic-app-infra](https://github.com/team-3-in/toeic/assets/96982072/fdc6c8db-1c7b-47b1-82bd-6da6df15ac1e)

## 구현 과정 및 설명

- **이메일 인증 회원 가입 적용**

  - Supabase 인증 기능을 활용하여 JWT 및 이메일 인증 적용
    - <https://supabase.com/docs/guides/auth>

- **JWT 인증 및 인가**

  - DB 조회 횟수를 줄이기 위해 JWT를 도입
  - 매니저 or 일반 유저로 권한을 나누고 문제 업로드, 수정 및 삭제에 대한 권한은 매니저에게 위임
    - [Supabase Custom Claims](https://github.com/supabase-community/supabase-custom-claims)
      를 이용하여 Supabase의 대시보드에서 특정 유저에게 매니저 권한을 설정할 수 있게 적용

- **문제 즐겨찾기**

  - bookmark 모듈로 각 회원별 틀린 문제 및 즐겨찾기를 저장할 수 있습니다.
  - 클라이언트에서 받은 jwt 토큰을 서버에서 decode해 유저 아이디로 틀린 문제 및 즐겨찾기 내용을 조회, 수정, 삭제
    - 토큰 새로고침 시 사용했던 ReqToken 데코레이터를 재활용해 token을 decode하는 pipe 작성

- **토익 문제 업로드 및 수정**

  - PDF를 파싱하고 문제로 만들어 DB에 저장하는 방법에 대해 고민했습니다.
    - PDF를 문제로 매핑하기는 어려워, 액셀 형식으로 문제를 업로드 했습니다.
    - 로컬환경의 static폴더에서 어떤 문제를 업로드했는지 확인하고 관리할 수 있도록 만들었습니다.
  - 문제 업로드 및 수정, 삭제 권한은 매니저 권한만 가능하게 적용했습니다.

<br/>
