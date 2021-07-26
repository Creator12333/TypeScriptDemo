import { ITodoData } from './type';
import $ from 'jquery';

export function getTodoList(target : any, methodName : string, descriptor : PropertyDescriptor) : void {
    // 保存原有的init函数
    const _origin = descriptor.value;

    // 重写init函数
    descriptor.value = function(todoData : ITodoData[]) {
        $.get('http://localhost:8888/todoList').then((res:string) => {
            if(!res) {
                return;
            }else {
                todoData = JSON.parse(res);

            }
        }).then(() => {
            _origin.call(this, todoData);
        })
    }
}

export function removeTodo (target : any, methodName : string, descriptor : PropertyDescriptor) : void {
    const _origin = descriptor.value;

    descriptor.value = function(target : HTMLElement, id : number) {
        $.post('http://localhost:8888/remove', { id }).then(res => {
            _origin.call(this, target, id);
        })
    }
}

export function toggleTodo (target : any, methodName : string, descriptor : PropertyDescriptor) : void {
    const _origin = descriptor.value;

    descriptor.value = function (target : HTMLElement, id : number) {   
        $.post('http://localhost:8888/toggle', { id }).then(res => {
            _origin.call(this, target, id);
        })
    }
}

export function addTodo (target : any, methodName : string, descriptor : PropertyDescriptor) : void {
    const _origin = descriptor.value;
    descriptor.value = function(todo : ITodoData) {
        $.post('http://localhost:8888/add', { todo : JSON.stringify(todo) }).then(res => {
            if (res.statusCode == '100') {
                alert('该项已存在')
            }else {
                _origin.call(this, todo);
            }
        })
    }
}