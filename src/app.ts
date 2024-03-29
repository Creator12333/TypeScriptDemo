import { ITodoData } from './js/type';
import TodoEvent from './js/TodoEvent';

;((document) => {
    const oInput : HTMLInputElement = document.querySelector('input')
    const oAddBtn : HTMLElement = document.querySelector('button');
    const oTodoList : HTMLElement = document.querySelector('.todo-list');

    const todoData: ITodoData [] = [];
    const todoEvent : TodoEvent = new TodoEvent(todoData, oTodoList);

    const init = () : void => {
        bindEvent();
    }

    function bindEvent () : void {
        oAddBtn.addEventListener('click', handleAddBtnClick, false);
        oTodoList.addEventListener('click', handleListClick, false);
    }

    function handleAddBtnClick () : void {
        const val : string = oInput.value.trim();

        if(val.length) {
            const ret = todoEvent.addTodo(<ITodoData>{
                id : new Date().getTime(),
                content : val,
                completed : false
            });

            if(ret && ret == -1) {
                alert('列表项已存在');
                return;
            }

            oInput.value = '';

        }
        // todoEvent.addTodo(<ITodoData>{
        //     id : 4,
        //     content : '999',
        //     completed : false
        // })
        // console.log(todoData);
    }

    function handleListClick (e : MouseEvent) : void {
        const tar = e.target as HTMLElement;
        const tagName = tar.tagName.toLowerCase();

        if(tagName === 'input' || tagName === 'button') {
            const id = parseInt(tar.dataset.id);
            switch(tagName) {
                case 'input':
                    todoEvent.toggleComplete(tar, id);
                    break;
                case 'button':
                    todoEvent.removeTodo(tar, id);
                    break;
                default:
                    break;
            }
        }
    }
 
    init();

})(document)
