const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector('#result');
const endPoint = 7;
const select = [];
const resMem = [];

function calcResult(){
    var pointArray = [
        { name: 'right',value: 0, key: 1},
        { name: 'wrong', value: 0, key: 0}
    ];
    var resultBg = document.querySelectorAll('.resultA01');
    var resImgElements = document.querySelectorAll('.resImg');

    for(let i = 0; i< endPoint; i++){
        var target = qnaList[i].a[select[i]];
        for(let j = 0; j<target.type.length; j++){
            for(let k = 0; k< pointArray.length; k++){
                    if(target.type[j] === pointArray[k].name){
                        pointArray[k].value+=1;
                        if(target.key[j] == 1){
                            resultBg[i].style.backgroundColor = '#70A56E';
                        }
                    }
                }
        }
        
    }
    for(let o = 0; o < resultBg.length; o++){
        if(resMem[o] == 1){
            resImgElements[o].style.backgroundImage = 'url("' + resultImgRoot[o].uu + '")';
        }


    }

    var resultNum = document.querySelector('.resultName');
    var vU = document.querySelector('.resultName');
    if(3 > pointArray[0].value){
        console.log('못함');
        vU.style.backgroundImage = "url('q_Img/aa01.png')";
    }else if(2 < pointArray[0].value && pointArray[0].value < 7 ){
        console.log('중간은함');
        vU.style.backgroundImage = "url('q_Img/aa02.png')";
    }else if(6 < pointArray[0].value ){
        console.log('굳');
        vU.style.backgroundImage = "url('q_Img/aa03.png')";
    }

}

function goResult(){
    qna.style.display = "none";
    result.style.display = "block";
    console.log(select);
    calcResult();
}
function reStart(){
    result.style.display = "none";
    main.style.display = "block";
}

function addAnswer(answerText, qIndex ,index){
    var a = document.querySelector('.answerBox');
    var answer = document.createElement('Button');
    answer.classList.add('answerList');
    a.appendChild(answer);
    answer.innerHTML = answerText;
    //console.log(answerText);
    
    answer.addEventListener("click",function(){
        var children = document.querySelectorAll('.answerList');
        for(let i = 0; i < children.length; i++){
            children[i].disabled = true;
            children[i].style.display = 'none';
        }
        select[qIndex] = index;
        resMem[qIndex] = index;
        goNext(++qIndex);
    }, false);
}

function goNext(qIndex){
    if((qIndex) === endPoint){
        goResult();
        return;
    }
    var q = document.querySelector('.qBox');
    var q2 = document.querySelector('.qBox2');
    var q3 = document.querySelector('.qBox3');
    q.innerHTML = qnaList[qIndex].q;
    q.style.backgroundImage = "url('" + qnaList[qIndex].url + "')";
    q2.style.backgroundImage = "url('" + qnaList[qIndex].url2 + "')";
    q3.style.backgroundImage = "url('" + qnaList[qIndex].url3 + "')";

    for(let i in qnaList[qIndex].a){
        addAnswer(qnaList[qIndex].a[i].answer, qIndex, i);
    }

    var status = document.querySelector('.statusBar1');
    status.style.width = (50/endPoint) * (qIndex+1) +'%';
}

function begin(){
    main.style.display = "none";
    qna.style.display = "block";
    let qIndex = 0;
    goNext(qIndex);
    
}

