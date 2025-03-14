# 🌐 Web B

SSUMC 8기 Web 스터디 B조


## 👥 Member

|세그|주디|오즈|제이|
| :-------------------------------------: | :-----------------------------------: | :-------------------------------: | :-------------------------------: |
|[진민성](https://github.com/m4ushold)|[배지영](https://github.com/qowldud)|[이영주](https://github.com/oortmealy)|[남궁석](https://github.com/namgungseok12)|

<br/>

## ⭐️ 스터디 규칙
✅ 워크북 노션 채우기 <br />
✅ 스터디 전까지 해당 주차 PR 올리기

<br/>

## 🌳 branch 규칙

```bash
├─main
    ├─joy/main
    │  └─joy/#1
```

1. `닉네임/main 브랜치`가 기본 브랜치로 pr 보낼 때 root 브랜치(main 브랜치)가 아닌 닉네임/main 브랜치로 올립니다.
2. 매주 워크북, 실습, 그리고 미션은 각자의 닉네임/main 브랜치를 base 브랜치로 삼아 `닉네임/이슈번호 브랜치`를 생성하여 관련 파일을 업로드합니다.
3. 모든 스터디원의 approve를 받으면, pr을 머지하고 해당 pr을 생성한 브랜치(닉네임/이슈번호 브랜치)는 삭제합니다. approve와 merge는 스터디 진행 중에 이루어집니다.

<br/>

## 📂 디렉터리 규칙

```bash
├─닉네임
    ├─Week1
    │  └─미션이름
    │    ├─index.html
    │    ├─index.ts
    │    └─style.css
    ├─Week2
    │  └─Week2_Mission
```

<br/>

## 🔖 커밋 컨벤션 --

| Message  | 설명                |
| :------: | :------------------ |
| mission  | 미션 수행           |
| practice | 실습 수행           |
| workbook | 워크북 정리         |
| refactor | 코드 리팩토링        |
|   fix    | 버그 수정           |
|   docs   | 문서 수정           |
| comment  | 주석 추가 및 변경   |
|  remove  | 파일 혹은 폴더 삭제 |
|  chore   | 기타 변경사항       |

```bash 
// 커밋 메시지
[week1/mission] 미션 제목
```