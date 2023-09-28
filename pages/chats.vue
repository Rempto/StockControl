<template>
  <div>
    <v-row justify="space-between">
      <v-col :cols="$vuetify.breakpoint.smAndDown ? '12' : '4'">
        <v-card v-if="chatSelector" style="background-color: #f5f5f5">
          <v-list>
            <div class="d-flex justify-space-between pa-0 ma-0">
              <span class="text-h6 pa-2"> Mensagens </span>

              <div class="text-center pa-2" style="justify-content: left">
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      dark
                      v-bind="attrs"
                      v-on="on"
                      @click="UserList()"
                    >
                      <v-icon color="blue">mdi-account-plus-outline</v-icon>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-container style="height: 470px; overflow-y: auto">
                      <v-list-item
                        v-for="user in users"
                        :key="user.id"
                        router
                        exact
                        @click="setChat(user)"
                      >
                        <v-list-item-action>
                          <v-avatar color="#f5f5f5" size="48">
                            <v-img
                              v-if="user.avatar"
                              :src="user.avatar"
                              style="
                                border-radius: 80px;

                                background-position: center center;

                                background-position: center center;
                              "
                            >
                            </v-img>
                            <span v-else class="black--text text-h5">{{
                              user.name[0]
                            }}</span>
                          </v-avatar>
                        </v-list-item-action>
                        <v-list-item-content>
                          <v-list-item-title>{{ user.name }}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-container>
                  </v-list>
                </v-menu>
              </div>
            </div>

            <v-divider></v-divider>
            <v-container style="height: 470px; overflow-y: auto">
              <v-list-item
                v-for="chat in chats"
                :key="chat.id"
                router
                exact
                @click="setChat(chat.recipientUser)"
              >
                <v-list-item-action>
                  <v-avatar color="#f5f5f5" size="48">
                    <v-img
                      v-if="chat.recipientUser.avatar"
                      :src="chat.recipientUser.avatar"
                      style="
                        border-radius: 80px;

                        background-position: center center;

                        background-position: center center;
                      "
                    >
                    </v-img>
                    <span v-else class="black--text text-h5">{{
                      chat.recipientUser.name[0]
                    }}</span>
                  </v-avatar>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{
                    chat.recipientUser.name
                  }}</v-list-item-title>

                  <v-list-item-subtitle
                    v-if="chat.messages"
                    :style="
                      !chat.messages[chat.messages.length - 1].isVisualized &&
                      chat.messages[chat.messages.length - 1].userId != user.id
                        ? 'font-weight: bold'
                        : ''
                    "
                    class="d-flex justify-space-between pa-2"
                  >
                    {{ chat.messages[chat.messages.length - 1].messageContent }}
                    <v-badge
                      v-if="
                        !chat.messages[chat.messages.length - 1].isVisualized &&
                        chat.messages[chat.messages.length - 1].userId !=
                          user.id
                      "
                      inline
                      dot
                      color="green"
                    ></v-badge>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-container>
          </v-list>
          <div class="pa-2 primary-card">
            <v-btn class="d-flex white--text" color="blue" to="/listaproduto">
              <v-icon dark left> mdi-arrow-left </v-icon>Back
            </v-btn>
          </div>
        </v-card>
      </v-col>

      <v-col :cols="$vuetify.breakpoint.smAndDown ? '12' : '8'" class="pt-2">
        <v-card v-if="selectedChat">
          <div>
            <v-card color="blue">
              <v-avatar
                v-if="selectedChat"
                color="#f5f5f5"
                class="ma-2"
                size="48"
              >
                <v-img
                  v-if="chatUser.avatar"
                  :src="chatUser.avatar"
                  style="
                    border-radius: 80px;

                    background-position: center center;
                  "
                >
                </v-img>
                <span v-else class="black--text text-h5">{{
                  chatUser.name[0]
                }}</span>
              </v-avatar>
              <span class="white--text text-h6">{{ chatUser.name }}</span>
            </v-card>
          </div>

          <div id="scroll-div" style="height: 450px; overflow-y: scroll">
            <div class="ma-1" style="display: flex; justify-content: center">
              <v-btn
                v-if="this.moreToSee"
                class="ma-1 elevation-0"
                @click="seeMore()"
              >
                ver mais
              </v-btn>
            </div>
            <v-list>
              <v-list-item v-for="(file, i) in messages" :key="i" router exact>
                <v-list-item-content
                  :class="
                    file.userId === user.id ? 'd-flex justify-end' : 'd-flex'
                  "
                >
                  <div
                    style="
                      max-width: min-content;
                      display: flex;
                      justify-content: right;
                    "
                  >
                    <div
                      class="pa-2"
                      v-bind:style="
                        file.userId === user.id
                          ? ' background-color: dodgerblue;'
                          : ' background-color:grey;'
                      "
                      style="border-radius: 20px; max-width: 400px"
                    >
                      <v-img
                        v-if="file.filePath && file.isImage"
                        :src="file.filePath"
                        @click="dowloadFile(file.filePath)"
                        class="ma-2"
                        style="
                          border-radius: 20px;
                          padding: 5px;
                          max-width: 350px;
                        "
                      ></v-img>
                      <v-img
                        v-if="
                          file.filePath &&
                          !file.isImage &&
                          file.messageType == 1
                        "
                        :key="updateImage"
                        src="/pdf-to-pdfa.svg"
                        @click="dowloadFile(file.filePath)"
                        class="ma-2"
                        style="
                          border-radius: 20px;
                          padding: 5px;
                          max-width: 350px;
                        "
                      ></v-img>

                      <audio
                        v-if="file.filePath && file.messageType == 2"
                        :src="file.filePath"
                        controls
                      ></audio>

                      <span
                        v-else
                        class="ma-2 white--text"
                        style="justify-content: right"
                      >
                        {{ file.messageContent }}
                      </span>
                      <div
                        :class="
                          file.userId === user.id
                            ? 'd-flex justify-space-between pa-1'
                            : 'd-flex justify-right pa-1'
                        "
                      >
                        <span
                          :class="
                            file.userId === user.id
                              ? 'd-flex justify-left white--text'
                              : 'd-flex justify-right white--text'
                          "
                          style="font-size: small"
                        >
                          {{
                            $moment(file.createdAt)
                              .locale('pt-br')
                              .format(' h:mm')
                          }}
                        </span>
                        <v-icon
                          v-if="file.userId === user.id"
                          class="d-flex justify-right"
                          color="white"
                          style="
                            font-size: small;
                            justify-content: left;
                            padding-left: 10px;
                          "
                          >{{
                            file.isVisualized ? 'mdi-check-all' : 'mdi-check'
                          }}</v-icon
                        >
                      </div>
                    </div>
                  </div>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
          <div class="pa-2 ma-1">
            <v-row justify="space-between">
              <v-col :cols="$vuetify.breakpoint.smAndDown ? '1' : '1'">
                <v-file-input
                  id="input"
                  v-model="selectedFile"
                  @change="convertToBase64"
                  prepend-icon=""
                  hide-input
                >
                  <template #append-outer>
                    <v-btn
                      icon
                      style="height: 20px; width: 20px; border-radius: 20px"
                      color="grsy"
                      @click="inputfile"
                    >
                      <v-icon size="30">mdi-paperclip</v-icon>
                    </v-btn>
                  </template>
                </v-file-input>
              </v-col>
              <v-col :cols="$vuetify.breakpoint.smAndDown ? '11' : '11'">
                <div class="d-flex justify-space-between pa-1">
                  <v-text-field
                    v-model="message"
                    :append-icon="'mdi-send'"
                    :append-inner-icon="
                      marker ? 'mdi-map-marker' : 'mdi-map-marker-off'
                    "
                    clear-icon="mdi-close-circle"
                    clearable
                    label="Message"
                    type="text"
                    @click:append-inner="toggleMarker"
                    @click:append="callService()"
                    @click:clear="clearMessage"
                    @keyup.enter="callService()"
                    filled
                    rounded
                    dense
                    hide-details="auto"
                  ></v-text-field>

                  <v-btn
                    class="white--text ml-2"
                    :fab="true"
                    :color="recording ? 'green' : 'blue'"
                    style="width: 50px; height: 50px"
                    @click="toggleRecording"
                  >
                    <v-icon> mdi-microphone </v-icon>
                  </v-btn>
                  <!--  -->
                </div>
              </v-col>
            </v-row>
          </div>
        </v-card>
        <v-container v-if="!chatSelector" class="pa-2 primary-card">
          <v-btn class="d-flex white--text" color="blue" @click="resetChatList">
            <v-icon dark left> mdi-arrow-left </v-icon>Back
          </v-btn>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  destroy() {
    this.socketInstance.close()
  },

  created() {
    this.user.id = this.$store.state.user.user.id

    this.userSocket()
    this.ChatList()
  },
  data() {
    return {
      recording: false,
      mediaRecorder: null,
      audioBlob: null,

      moreToSee: true,
      updateImage: 0,
      page: 1,
      itens: 30,
      chatSelector: true,
      selectedChat: false,
      fileExtention: null,
      selectedFile: null,
      base64Data: null,
      messageType: 0,
      alreadyHasSocket: false,
      message: null,
      marker: true,
      messages: [],
      chats: [],
      users: [],
      notifications: [],
      user: {
        id: null,
      },
      chatUser: {
        chatId: null,
        id: null,
        avatar: null,
        name: null,
        initials: null,
      },
      fixed: false,

      miniVariant: false,
      right: true,
      rightDrawer: false,

      userSocketInstance: null,
      socketInstance: null,
      isNotification: false,
    }
  },
  methods: {
    async ChatList() {
      await this.$axios
        .$get(`chat/get-chats?userId=${this.user.id}`)
        .then((response) => {
          this.chats = response

          this.verifyRecipientUser()
        })
        .catch(() => {})
    },
    verifyRecipientUser() {
      this.chats = this.chats.map((x) => {
        if (x.recipientUserId === this.user.id) {
          const recipientUserAux = { ...x.recipientUser }
          const recipientUserIdAux = x.recipientUserId
          x.recipientUser = { ...x.user }
          x.recipientUserId = x.userId
          x.user = { ...recipientUserAux }
          x.userId = recipientUserIdAux
        }

        return x
      })
    },
    async setVizualized() {
      await this.$axios
        .$put(
          `chat/set-visualized?userId=${this.user.id}&recipientId=${this.chatUser.id}`
        )
        .then(() => {
          this.ChatList()
        })
        .catch(() => {})
    },

    toggleRecording() {
      this.messageType = 2
      this.fileExtention = 'wav'
      if (!this.recording) {
        navigator.mediaDevices
          .getUserMedia({ audio: true })
          .then((stream) => {
            this.mediaRecorder = new MediaRecorder(stream)
            this.mediaRecorder.ondataavailable = (event) => {
              if (event.data.size > 0) {
                this.audioBlob = event.data
              }
            }
            this.mediaRecorder.onstop = () => {
              const reader = new FileReader()
              reader.onload = () => {
                this.message = reader.result.split(',')[1]
                this.sendMessage()
              }
              reader.readAsDataURL(this.audioBlob)

              this.$refs.audioElement.src = URL.createObjectURL(this.audioBlob)
            }
            this.mediaRecorder.start()
            this.recording = true
          })
          .catch((error) => {
            console.error('Erro ao acessar o microfone: ', error)
          })
      } else if (
        this.mediaRecorder &&
        this.mediaRecorder.state !== 'inactive'
      ) {
        this.mediaRecorder.stop()
        this.recording = false
      }
    },

    async seeMore() {
      this.page = this.page + 1
      await this.$axios
        .$get(
          `chat/get-messages?skip=${(this.page - 1) * this.itens}&take=${
            this.itens
          }&userId=${this.user.id}&recipientId=${this.chatUser.id}`
        )
        .then((response) => {
          this.messages.unshift(...response.messages)

          if (response.messages.length === 0) {
            this.moreToSee = false
          } else {
            this.moreToSee = true
          }
        })
        .catch(() => {})
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const chatMessages = document.getElementById('scroll-div')
        chatMessages.scrollTop = chatMessages.scrollHeight
      })
    },
    userSocket() {
      if (this.userSocketInstance) {
        this.userSocketInstance.close()
      }

      this.userSocketInstance = new WebSocket(
        `${process.env.API_KEY_SOCKET}?chatId=${this.user.id}&userId=${this.user.id}`
      )

      const $context = this
      this.userSocketInstance.onmessage = async function (e) {
        const socketMessage = await JSON.parse(e.data)

        const messageSocket = JSON.parse(socketMessage.message)

        $context.chats = $context.chats.map((x) => {
          if (x.id === messageSocket.chatId) {
            x.messages.push(messageSocket)
          }
          return x
        })
      }
    },

    messageSocket() {
      if (this.socketInstance) {
        this.socketInstance.close()
      }

      this.socketInstance = new WebSocket(
        `${process.env.API_KEY_SOCKET}?chatId=${this.chatUser.chatId}&userId=${this.user.id}`
      )

      const $context = this
      this.socketInstance.onmessage = async function (e) {
        const socketMessage = await JSON.parse(e.data)
        $context.messages.push(JSON.parse(socketMessage.message))
        $context.updateImage++
        $context.chatUpdate(JSON.parse(socketMessage.message))
      }
    },
    chatUpdate(receiveMessage) {
      for (const chat of this.chats) {
        if (chat.id === receiveMessage.chatId) {
          chat.messages.push(receiveMessage)
        }
      }
    },
    async setChat(recipientUser) {
      this.chatUser.id = recipientUser.id
      this.chatUser.avatar = recipientUser.avatar
      this.chatUser.name = recipientUser.name
      this.chatUser.initials = this.chatUser.name[0]
      this.selectedChat = true

      this.chatListHide()

      await this.getChat()
    },

    async getChat() {
      this.messages = []
      this.page = 1
      await this.$axios
        .$get(
          `chat/get-messages?skip=${(this.page - 1) * this.itens}&take=${
            this.itens
          }&userId=${this.user.id}&recipientId=${this.chatUser.id}`
        )
        .then((response) => {
          this.messages = response.messages

          if (this.messages === null || this.messages.length <= 0)
            this.messages = []
          if (this.messages.length < 30) {
            this.moreToSee = false
          } else {
            this.moreToSee = true
          }
          this.setVizualized()

          this.scrollToBottom()
          this.chatUser.chatId = response.id

          this.messageSocket()
        })
        .catch(() => {})
    },
    async UserList() {
      await this.$axios
        .$get(`user/get?id=${this.user.id}`)
        .then((response) => {
          this.users = response
        })
        .catch(() => {})
    },
    async createChats(receiveId) {
      const model = {
        recipientUserId: receiveId,
        userId: this.user.id,
      }
      await this.$axios
        .$post(`chat/create-chat`, model)
        .then(() => {})
        .catch(() => {})
    },
    async sendMessage() {
      if (this.messageType === 0 && this.message.trim() === '') {
        this.clearMessage()
      } else {
        const model = {
          messageContent: this.message,
          messageType: this.messageType,
          chatId: this.chatUser.chatId,
          userId: this.user.id,
          recipientUserId: this.chatUser.id,
          fileExtention: this.fileExtention,
        }

        await this.$axios
          .$post(`chat/create-message`, model)
          .then(() => {
            this.scrollToBottom()
            this.setVizualized()
            this.clearMessage()
          })
          .catch(() => {})
      }
    },
    callService() {
      this.sendMessage()
    },

    clearMessage() {
      this.message = null
      this.messageType = 0
      this.fileExtention = null
      this.page = 1
    },

    toggleMarker() {
      this.marker = !this.marker
    },
    convertToBase64() {
      const list = this.selectedFile.name.split('.')
      this.fileExtention = list[list.length - 1]
      this.messageType = 1

      const reader = new FileReader()

      reader.onload = () => {
        this.message = reader.result
        this.sendMessage()
      }

      reader.readAsDataURL(this.selectedFile)
    },
    inputfile() {
      const file = document.getElementById('input')
      file.click()
    },
    chatListHide() {
      if (this.$vuetify.breakpoint.smAndDown && this.selectedChat) {
        this.chatSelector = false
      }
    },
    resetChatList() {
      this.selectedChat = false
      this.chatSelector = true
    },
    dowloadFile(response) {
      const linkSource = 'data:application/vnd.ms-excel;base64,' + response
      const downloadLink = document.createElement('a')
      downloadLink.href = linkSource
      downloadLink.download = 'arquivo.' + 'xlsx'
      downloadLink.click()
    },
  },
}
</script>
