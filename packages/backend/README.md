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

- **문제 즐겨찾기**

  - bookmark 모듈로 각 회원별 틀린 문제 및 즐겨찾기를 저장할 수 있습니다.

- **토익 문제 업로드 및 수정**

  - 토익 문제를 엑셀 파일 형식으로 받아서 문제를 업로드 합니다.
  - 문제 업로드 및 수정, 삭제 권한은 매니저 권한만 가능하게 적용했습니다.

<br/>
