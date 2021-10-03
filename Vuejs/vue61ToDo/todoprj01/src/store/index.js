import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// Vuex 인스턴스 만들기
export default new Vuex.Store({
    actions: {
        /* 왜 actions를 사용하나? 비동기로 외부 함수 호출하기 위해서
         * actions 에는 메서드만 등록 가능하다.
         * 첫번째인자: 무조건 mutations로 고정.
         * 두번째인자: 값. store.dispatch()호출시 넘겨지는 값.
         */
        clearAll: function( mutations/* 고정 */ ){
            mutations.commit("clearAll" );
        },
        addTodo: function( mutations/* 고정 */, newTodoItem ){
            mutations.commit("addTodo", newTodoItem );
        },
        doneToggle: function( mutations /* 고정 */, id  ){
            mutations.commit("doneToggle", id);
        },
        removeTodo: function( mutations /* 고정 */ , id){
            mutations.commit("removeTodo", id );
        },
    },
    mutations: {
        /* 왜 mutations 를 사용하나? state 를 바꾸기 위해서
         * mutations 에는 메서드만 등록 가능하다.
         * 첫번째인자: 무조건 state 로 고정.
         * 두번째인자: 값. mutations.commit() 호출시 넘겨지는 값.
         * */
        doneToggle: function(state/* 고정 */, id){
            const findIndex = state.todoItems.findIndex(
                (item) => id === item.id
            );
            state.todoItems[findIndex].done =
                !state.todoItems[findIndex].done;
        },
        removeTodo: function(state/* 고정 */, id){
            const findIndex = state.todoItems.findIndex((item) => {
                return item.id === id;
            });
            state.todoItems.splice(findIndex, 1);
        },
        clearAll: function(state/* 고정 */){
            debugger;
            state.todoItems = [];
            // this.$set(this.$data, "todoItems", []);
        },
        addTodo: function(state/* 고정 */, newTodoItem/* mutations.commit 호출시 넘겨지는 값 */){
            // state.인자 = param;
            // todoItems에서 최대 id 값을 구하는 방법.
            // 방법1. todoItems.map()과 todoItems.reduce()를 사용하여 max id를 찾는 방법
            // 방법2. todoItems.reduce() 를 사용하여 newId를 구하는 방법
            // 방법3. todoItems.reduce() 를 사용하여 최대 id 값을 찾기
            let maxid = 0;
            if (state.todoItems.length > 0) {
                maxid = state.todoItems
                    .map((item) => item.id)
                    .reduce((prev, curt) => (prev >= curt ? prev : curt));
            } else {
                maxid = 0;
            }
            const newid = maxid + 1;

            const todo = {
                id: newid,
                todo: newTodoItem,
                done: false
            };

            state.todoItems.push( todo );
            // state.todoItems[ state.todoItems.length] = todo;
        },
    },
    state: {
        /* vue인스턴스나 컴포넌트의 data 프로퍼티에 해당 */
        // 인자: "STORE STATE",
        todoItems: [
            { id: 1, todo: "영화보기", done: false },
            { id: 2, todo: "주말 산책", done: true },
            { id: 3, todo: "ES6 학습", done: false }
        ]
    },
    getters: {
        /* state 변경 정보를 컴포넌트에 전달하는 역활.
         * 메서드로 만들어야 하며 메서드명은 state 의 이름을 그대로 사용
         * 첫번째인자: 무조건 state
         * 컴포넌트에서는 computed를 사용하여 store의 state 변경 정보를 자동으로 가져오게 된다.
         * 예시) message()=> store.getters.인자;
         */
        todoItems: function(state/* 고정 */){
            return state.todoItems;
        },
    },
});