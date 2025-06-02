function chart2(itemsList){

    for (let key in itemsList) {
    let obj = itemsList[key];
    console.log(obj)
}
let chart = c3.generate({
    data: {

        
        x : 'x',
        columns: [
            ['x', 'grocerry', 'travel', 'helathcare', 'entertainment'],
            ['', 1500, 2000, 1500, 1400],
            
        ],
        groups: [
            ['download', 'loading']
        ],
        type: 'bar'
    },
    axis: {
        x: {
            type: 'category' // this needed to load string x value
        }
    }
});

}
function chart1(itemsList,price){

    let nameArray=["name1","name2","name3"]
  let countArray=[20,34,12]
  
  price.unshift('data1');
  
  let data = [itemsList,price];
  
  let chart = c3.generate({
    data: {
          columns:[
                price
            ],
            type:'bar'
    },
    axis:{
      x:{
        type: 'category',
        categories: itemsList
      }
    }
});
}

function chart(items,itemsList, price) {

  //  let nameArray = ["name1", "name2", "name3"]
//    let countArray = [20, 34, 12]

    price.unshift('');

    let data = [itemsList, price];
    console.log(itemsList)
    console.log(price)

    let chart = c3.generate({
        //bindto:'#chart1',
        data: {
            columns: [
                price
            ],

            onclick: function (d) { 
            console.log(itemsList[d.index]); 

            showChartOnItems(items,itemsList[d.index])
            
        },
            type: 'bar'
        },
        axis: {
            x: {
                type: 'category',
                categories: itemsList
            }
        }
    });
}

function showChartOnItems(itemsdata,category){

    var filterdCategoryData=[];

    for(let i=0;i<itemsdata.length;i++){
        if(itemsdata[i].category==category){
            filterdCategoryData.push(itemsdata[i]);
        }
    }

    const dates = [...new Set(filterdCategoryData.map(d => d.date))];

const items = [...new Set(filterdCategoryData.map(d=> d.item))];


const columns =items.map(cat => {
const values = dates.map(date => {
const entry = filterdCategoryData.find(d=> d.date ===date && d.item===cat);
return entry ? entry.price:0;
});
return [cat,...values];
});

c3.generate({
bindto:"#chart",
data:{
columns:columns,
type:'bar',
 onclick:function(d){
}
},

axis:{
x:{
type:'category',
categories:dates,
lable:'Date'
},

y:{
label:'price'
}
},

        legend: {
          position: 'right'
        }
});



}



function chart3() {
      // Step 1: Extract unique dates and categories
     let data= [
      { date: '01-Jun-25', price: 30, category: 'Electronics' },
      { date: '01-Jun-25', price: 20, category: 'Grocery' },
      { date: '01-Jun-25', price: 50, category: 'Fashion' },
      { date: '02-Jun-25', price: 40, category: 'Electronics' },
      { date: '02-Jun-25', price: 25, category: 'Grocery' },
      { date: '02-Jun-25', price: 60, category: 'Fashion' }
    ];
      const dates = [...new Set(data.map(item => item.date))];
      const categories = [...new Set(data.map(item => item.category))];

      // Step 2: Prepare columns for C3
      const columns = categories.map(cat => {
        const values = dates.map(date => {
          const entry = data.find(item => item.date === date && item.category === cat);
          return entry ? entry.price : 0;
        });
        return [cat, ...values];
      });

      // Step 3: Generate the chart

      c3.generate({
        bindto: '#chart',
        data: {
          columns: columns,
          type: 'bar',
          onclick: function (d) {
            console.log("Clicked Category:", d.id);
            console.log("Date:", dates[d.index]);
            console.log("Value:", d.value);
          }
        },
        axis: {
          x: {
            type: 'category',
            categories: dates,
            label: 'Date'
          },
          y: {
            label: 'Price'
          }
        },
        legend: {
          position: 'right'
        }
      });
    }

    // Sample data
    

    // Call chart function
   


