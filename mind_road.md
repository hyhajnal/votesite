## 投票逻辑
``` js
1.到达投票截止日期;
2.判断投票类型

//如果是不需要选出结果的，或者是已经选择最终结果了的
if(multi === -1 && result === multi){
  //直接展示投票结果;
  show vote result;
}else{
  //发消息给owner需不需要进行下一轮投票
  msg(owner);
  if(need){
    give a new deadline;
    round ++;
  }else{
    show vote result;
  }
}
```