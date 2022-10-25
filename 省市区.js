const dataInfo = [
  {
   id:'100',
   name:'上海',
   child:[
    {
     id:'101',
     name:'浦东',
     child:[]
    },
    {
     id:'102',
     name:'浦西',
     child:[]
    }
   ]},
   {
   id:'200',
   name:'山西',
   child:[
    {
     id:'201',
     name:'太原',
     child:[
      {
        id:'221',
        name:'阳曲县',
        child:[]
      },
      {
        id:'222',
        name:'迎泽区',
        child:[]
      }
     ]
    },
    {
     id:'202',
     name:'阳泉',
     child:[]
    }
   ]}
]
function getName(arr,code){
  for(let i = 0;i<arr.length;i++){
    if(arr[i].id === code){
      return arr[i].name
    }else if(arr[i].child!==[]){
      return arr[i].name + getName(arr[i].child,code)
    }
  }
}
function get(code){
  let res = '';
  for(let i=0;i < dataInfo.length;i++){
    // debugger
    if(dataInfo[i].id===code){
      return dataInfo[i].name;
    }else if(dataInfo[i].id < code && dataInfo[i].id[0] === code[0] && dataInfo[i].child!=[]){
      res += dataInfo[i].name + getName(dataInfo[i].child,code)
      return res
    }
  }
  // return res
}
console.log(get('221'));