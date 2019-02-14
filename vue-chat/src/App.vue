<template>
  <div id="app">
    <nav class="navbar has-background-info">
      <div class="navbar-brand">
        <a class="navbar-item has-test-white" href="#">
          Vue-Firebase-Chat
        </a>
      </div>
    </nav>
    <!-- 名前の入力欄 -->
    <section class="section">
      <div class="container">
        <!-- 名前の入力欄 -->
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input id="nameInput" v-model="name" class="input" type="text" placeholder="名前" />
          </p>
        </div>
        <!-- メッセージの入力欄 -->
        <div class="field">
          <p class="control has-icons-left">
            <input
              id="messageInput"
              v-model="message"
              class="input"
              type="text"
              placeholder="メッセージ"
            />
          </p>
        </div>
        <!-- ボタン類 -->
        <div class="field">
          <p class="control">
            <button class="button is-success" type="button" @click="sendMessage">
              送信
            </button>
          </p>
        </div>
        <!-- リスト -->
        <div>
          <ul>
            <li v-for="item in list" :key="item.message">{{ item.name }} / {{ item.message }}</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      list: [], // 最新状態はここにコピーされる
      name: '', // 名前
      message: '', // 送信メッセージ
    };
  },
  created() {
    this.listen();
  },
  methods: {
    // データベースの変更を購読、最新状態をlistにコピーする
    listen() {
      firebase
        .database()
        .ref('myBoard/')
        .on('value', snapshot => {
          if (snapshot) {
            const rootList = snapshot.val();
            const list = [];
            Object.keys(rootList).forEach((val, key) => {
              rootList[val].id = val;
              list.push(rootList[val]);
            });
            this.list = list;
          }
        });
    },
    sendMessage() {
      // 空欄の場合は実行しない
      if (!this.name || !this.message) return;
      // 送信
      firebase
        .database()
        .ref('myBoard/')
        .push({
          name: this.name,
          message: this.message,
        });
      // 送信後inputを空にする
      this.message = '';
    },
  },
};
</script>

<style></style>
