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
        chkBox = this.tasklistChildren[i].getElementById("input")[0];
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
    }
  };
});
