(function () {
  "use strict";
  let tasker = {
    init: function () {
      this.cacheDom();
      this.bindEvents();
      this.evalTasklist();
    },
    cacheDom: function () {
      this.taskInput = document.getElementById("input-task");
      this.addBtn = document.getElementById("add-task-btn");
      this.tasklist = document.getElementById("tasks");
      this.tasklistChildren = this.tasklist.children;
      this.errorMessage = document.getElementById("error");
    },
    bindEvents: function () {
      this.addBtn.onclick = this.addTask.bind(this);
      this.taskInput.onkeypress = this.enterKey.bind(this);
    },
    evalTasklist: function () {
      let i, chkBox, delBtn;
      //Bind Click Events to Elements
      for (i = 0; i < this.tasklistChildren.length; i += 1) {
        //Add click event to checkboxes
        chkBox = this.tasklistChildren[i].getElementsByTagName("input")[0];
        chkBox.onclick = this.completeTask.bind(
          this,
          this.tasklistChildren[i],
          chkBox
        );
        //Add click event to delete button
        delBtn = this.tasklistChildren[i].getElementsByTagName("button")[0];
        delBtn.onclick = this.delTask.bind(this, i);
      }
    },
    render: function () {
      let taskLi, taskChkbx, taskVal, taskBtn, taskTrsh;
      //Build HTML
      taskLi = document.createElement("li");
      taskLi.setAttribute("class", "task");
      //Checkbox
      taskChkbx = document.createElement("input");
      taskChkbx.setAttribute("type", "checkbox");
      //User task
      taskVal = document.createTextNode(this.taskInput.value);
      //Delete Button
      taskBtn = document.createElement("button");
      //Trash Icon
      taskTrsh = document.createElement("i");
      taskTrsh.setAttribute("class", "fa fa-trash");
      //Insert trash can into button
      taskBtn.appendChild(taskTrsh);

      //Append Elements to taskLi
      taskLi.appendChild(taskChkbx);
      taskLi.appendChild(taskVal);
      taskLi.appendChild(taskBtn);

      //Add task to task list
      this.tasklist.appendChild(taskLi);
    },
    completeTask: function (i, chkBox) {
      if (chkBox.checked) {
        i.className = "task completed";
      } else {
        this.incompleteTask(i);
      }
    },
    incompleteTask: function (i) {
      i.className = "task";
    },
    enterKey: function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        this.addTask();
      }
    },
    addTask: function () {
      let value = this.taskInput.value;
      this.errorMessage.style.display = "none";

      if (value === "") {
        this.error();
      } else {
        this.render();
        this.taskInput.value = "";
        this.evalTasklist();
      }
    },
    delTask: function (i) {
      this.tasklist.children[i].remove();
      this.evalTasklist();
    },
    error: function () {
      this.errorMessage.style.display = "block";
    }
  };

  tasker.init();
})();
