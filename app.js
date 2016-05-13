angular
   .module("todolist", [])  //[] 有無依賴的項目
   .controller('ListCtrl',function(List){  //注入service叫做List
      //.controller('ListCtrl', function(List1,List2,List3)....
        var self = this;

        self.tasks = [];

        self.auth = function(listName) {
            List.auth(listName) //透過List的service 會做promise並做回傳等待
            .then(function(res){
                self.tasks = List.tasks = res.data.tasks; //呼叫service的api 回傳值tasks值 指派給list.tasks的值
              //同時也指派給self.tasks 為了給綁到view的controller上
                console.log(self.tasks);
            }), function(err){
                console.log("broken");
            };
        };

        self.getTasks = function(){
            List.getTasks()
            .then(function(res){
                self.tasks = List.tasks = res.data.tasks;
            }),function(err){
                   console.log(err);
               }
        };

        self.addTask = function(newTaskText){
            List.addTask(newTaskText)
            .then(function(res){
                alert("新增成功");
                self.getTasks();
             }),function(err){
                    console.log(err);
                }
          //  self.tasks.push(newTask);
        };

        self.updateTask = function(taskId,status){
            List.updateTask(taskId, status)
            .then(function(res){
                self.getTasks();
            }),function(err){
                console.log(err);
            }
        };

        self.deleteTask = function(taskId){
            List.deleteTask(taskId)
            .then(function(res){
                alert("刪除成功");
                self.getTasks();
            }),function(err){
                   console.log(err);
               }
        }
});
//service負責控制API 跟他拿資料
angular
    .module("todolist")  //module不用重複宣告
    .service('List', function($http){
        this.baseURL = "https://richegg.top";
        this.tasks = [];
        this.auth = function(listName) {
            var data = {
                listName : listName
            };
            var config = {
                withCredentials : true
            };
            return $http.post(this.baseURL + '/lists',data,config);
        }

    this.addTask = function(newTaskText){
        var config = {
            withCredentials : true
        };

        var data = {
            text:newTaskText
        };
        return $http.post(this.baseURL +'/tasks', data, config);
    }

    this.getTasks = function(){
        var config = {
           withCredentials : true
        };
        return $http.get(this.baseURL + '/tasks', config);
    }

    this.updateTask = function(taskId,status){

      var config = {
         withCredentials : true
      };

      var data = {
         isDone: status
      };

      return $http.patch(this.baseURL + '/tasks/' + taskId, data, config)
    }

    this.deleteTask = function(taskId){
      var config = {
         withCredentials : true
      };

      return $http.delete(this.baseURL +'/tasks/' + taskId,config);
    }


  });
