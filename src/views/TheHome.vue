<template>
  <div class="all">
    <div class="label">Список Заявок</div>
    <div class="body">
      <div class="create">
        <button @click="createAppeal">СОЗДАТЬ</button>
      </div>
      <div class="filters">
        <TheSearch @prompted="handleSearch" />
        <TheDropdown name="Адрес" @Адрес-selected="handleSelect" />
      </div>
      <div class="table">
        <table>
          <thead>
            <tr>
              <th style="width: 6%">&#8470;</th>
              <th style="width: 8%">Создана</th>
              <th>Адрес</th>
              <th>Заявитель</th>
              <th>Описание</th>
              <th>Срок</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody v-if="!loading">
            <tr v-for="(appeal, index) in appeals" :key="index" @click="editAppeal(index)">
              <td><div class="num">{{ appeal.number }}</div></td>
              <td>{{ new Date(appeal.created_at).toLocaleDateString() }}</td>
              <td>{{ appeal.premise?.address }}, {{ appeal.apartment?.label }}</td>
              <td>{{ appeal.applicant?.last_name }} {{ appeal.applicant?.first_name[0] }}.{{ appeal.applicant?.patronymic_name[0] }}.</td>
              <td>{{ appeal.description }}</td>
              <td>{{ new Date(appeal.due_date).toLocaleDateString() }}</td>
              <td>{{ appeal.status?.name }}</td>
            </tr>
          </tbody>
          <tbody v-if="loading">
            <tr v-for="i of pageSize" :key="i">
              <td v-for="j of 7" :key="j">
                <div class="loading"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="settings">
        <PageSize :page="this.page" :pages="this.pages" :count="this.count" :pageSize="this.pageSize" @page-size-change="changePageSize" />
        <PageScroll v-if="!loading" :page="this.page" :pages="this.pages" :pageSize="this.pageSize" @switch-page="switchPage" />
      </div>
    </div>
    <PopUp v-if="popUp" @close="closeSuccess" @loading="$emit('loading')" />
    <PopUp v-if="popUpEdit" :data="editData" @close="closeSuccess" @loading="$emit('loading')" />
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapMutations } from 'vuex'
import PageSize from '../components/PageSize.vue'
import PageScroll from '../components/PageScroll.vue'
import TheSearch from '../components/TheSearch.vue'
import TheDropdown from '../components/TheDropdown.vue'
import PopUp from '../components/PopUp.vue'

export default {
  computed: {
    ...mapGetters(['key'])
  },
  methods: {
    ...mapMutations(['setAppeals', 'setPremises']),

    fetchAppeals() {
      this.loading = true
      axios.get(`https://dev.moydomonline.ru/api/appeals/v1.0/appeals/?page_size=${this.pageSize}&page=${this.page}${this.search!==""?"&search="+this.search:""}${this.premiseId!==""?"&premise_id="+this.premiseId:""}`, { 
        headers: { 'Authorization' : `Token ${this.key}` }
      })
      .then(response => {
        this.pages = response.data.pages
        this.count = response.data.count
        this.appeals = response.data.results
        this.setAppeals(this.appeals)
        this.loading = false
      })
      .catch(response => {
        if (response.status === 403) 
          this.$emit('message', { message: 'Вы не авторизованы!', warning: true })
          this.$router.replace('/login')
      })
    },

    fetchUserPremises() {
      axios.get(`https://dev.moydomonline.ru/api/geo/v2.0/user-premises/`, { 
        headers: { 'Authorization' : `Token ${this.key}` }
      })
      .then(response => {
        this.premises = response.data.results
        this.setPremises(this.premises)
      })
      .catch(error => {
        console.log(error)
      })
    },

    createAppeal()  {
      this.editData = { }
      this.popUp = true
    },

    editAppeal(index) {
      this.editData = this.appeals[index]
      this.popUpEdit = true
    },

    closeSuccess(msg) {
      this.popUp = false
      this.popUpEdit = false
      if(msg) {
        this.$emit('message', msg)
        this.$emit('loading')
        this.fetchAppeals()
      }
    },

    switchPage(page) {
      this.page = page
      this.fetchAppeals()
    },

    changePageSize(size) {
      this.pageSize = size
      this.fetchAppeals()
    },
    
    handleSearch(prompt) {
      this.search = prompt
      this.fetchAppeals()
    },

    handleSelect(premiseId) {
      this.premiseId = premiseId
      this.fetchAppeals()
    }
  },
  data() {
    return {
      loading: true,
      page: 1,
      pages: null,
      count: null,
      pageSize: 40,
      appeals: [],
      search: '',
      premiseId: '',
      premises: [],
      popUp: false,
      popUpEdit: false,
      editData: {}
    }
  },
  mounted() {
    this.fetchAppeals()
    this.fetchUserPremises()
  },
  components: {
    PageSize,
    PageScroll,
    TheSearch,
    TheDropdown,
    PopUp
  }
}
</script>

<style lang="scss" scoped>
$green: rgb(66, 177, 66);
$green-light: rgba(66, 177, 66, 0.3);
$red: rgb(222, 64, 64);

.all {
  background-color: #ddd;
  position: absolute;
  display: flex;
  flex-direction: column;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  color: #222;
  padding: 20px 40px;

  .label {
    font-size: 20px;
    margin-left: 12px;
    height: 10vh;
  }

  .body {
    border-radius: 8px;
    padding: 20px;
    box-sizing: border-box;
    background-color: #fff;
    display: flex;
    gap: 30px;
    max-height: 76vh;
    flex-direction: column;

    .create {
      display: flex;
      button {
        margin-left: auto;
      }
    }

    .filters {
      display: flex;
      gap: 14px;
    }

    .settings {
      display: flex;
      justify-content: space-between;
    }
    
  }
}

.table {
  max-height: 100%;
  overflow: scroll;

  table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
  }

  thead, th {
    padding: 10px;
    position: sticky;
    top: 0;
    text-align: left;
    font-weight: normal;
    background-color: white;
    color: $green;
  }

  tr:hover {
    cursor: pointer;
    background-color: #eeeeee99;
  }

  td {
    padding: 0 10px;
    height: 60px;
    border-bottom: 1px solid #ccc;
    word-break: break-all;
  }

  .loading {
    background-color: #ddd;
    width: 90%;
    height: 20px;
    border-radius: 4px;
    animation: blink 2s infinite linear;
  }
  
  .num {
    background-color: $green;
    text-align: center;
    width: 50px;
    color: white;
    border-radius: 4px;
    padding: 5px 2px;
  }
}

@keyframes blink {
  0% { opacity: 1 }
  50% { opacity: 0.4 }
  100% { opacity: 1 }
}

</style>
