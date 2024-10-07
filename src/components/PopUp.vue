<template>
  <div class="overlay" @click.self="$emit('close')">
    <form class="card" @submit.prevent="submit">
      <div class="row header">
        <b>{{ label }}</b>
        <span>{{ data ? data.status.name ?? 'Новая' : 'Новая' }}</span>
      </div>
      <div class="row">
        <DropdownCustom :value="data?.premise?.full_address" :setter="setPremiseId" name="Дом" :options="premises.map(obj => obj.full_address)" />
        <DropdownCustom :value="data?.apartment?.number" :setter="setApartmentId" name="Квартира" :options="apartments.map(obj => obj.number)" />
        <InputCustom :value="data?.due_date.split('T')[0]" name="Срок" type="date" :setter="(value) => setField('dueDate', value)" />
      </div>
      <div class="row">
        <InputCustom :value="data?.applicant?.last_name" name="Фамилия" :setter="(value) => setField('lastName', value)" />
        <InputCustom :value="data?.applicant?.first_name" name="Имя" :setter="(value) => setField('firstName', value)" />
        <InputCustom :value="data?.applicant?.patronymic_name" name="Отчество" :setter="(value) => setField('patronymicName', value)" />
        <InputCustom :value="data?.applicant?.username" name="Телефон" type="tel" :setter="(value) => setField('username', value)" />
      </div>
      <div class="row">
        <InputCustom :value="data?.description" textarea name="Описание заявки" :setter="(value) => setField('description', value)" />
      </div>
      <div class="row footer">
        <button type="submit">{{ data ? 'Сохранить' : 'Создать' }}</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import DropdownCustom from './DropdownCustom.vue'
import InputCustom from './InputCustom.vue'

export default {
  name: 'PopUp',
  props: {
    data: Object
  },
  components: {
    DropdownCustom,
    InputCustom
  },
  computed: {
    ...mapGetters(['key', 'premises']),
    label() {
      if (this.data) return `Заявка №${this.data.number} (от ${new Date(this.data.created_at).toLocaleDateString()})`
      else return 'Создание заявки'
    }
  },
  data() {
    return {
      premiseId: '',
      apartmentId: '',
      lastName: '',
      firstName: '',
      patronymicName: '',
      username: '',
      dueDate: '',
      description: '',
      apartments: []
    }
  },
  mounted() {
    if (this.data) {
      this.premiseId = this.data.premise.id
      this.fetchApartments()
    }
  },
  methods: {

    async setPremiseId(address) {
      const response = await axios.get(`https://dev.moydomonline.ru/api/geo/v2.0/user-premises/?search=${address}`, {
        headers: { 'Authorization' : `Token ${this.key}` }
      })
      this.premiseId = response.data.results[0].id
      this.fetchApartments()
    },

    async fetchApartments() {
      const response = await axios.get(`https://dev.moydomonline.ru/api/geo/v1.0/apartments/?premise_id=${this.premiseId}`, {
        headers: { 'Authorization' : `Token ${this.key}` }
      })
      this.apartments = response.data.results.map(obj => { 
        return { number: obj.number, id: obj.id }
      })
    },

    setApartmentId(number) {
      for (let obj of this.apartments) {
        if (obj.number === number) { 
          this.apartmentId = obj.id 
          break 
        }
      }
    },

    setField(field, value) { this[field] = value },

    formatDate: (date) => new Date(date).toISOString(),

    payload(patch = false) {
      var data = {
        "premise_id": this.premiseId || this.data.premise.id,
        "apartment_id": this.apartmentId || this.data.apartment.id,
        "applicant": {
          "first_name": this.firstName || this.data.applicant.first_name,
          "last_name": this.lastName || this.data.applicant.last_name,
          "patronymic_name": this.patronymicName || this.data.applicant.patronymic_name,
          "username": this.username || this.data.applicant.username,
        },
        "description": this.description || this.data.description,
        "due_date": this.formatDate(this.dueDate || this.data.due_date),
        "status_id": 1
      }
      if(patch) data = { 
        ...data, 
        "number" : this.data.number,
        "created_at" : this.formatDate(this.data.created_at),
        "status_id": 3
      }
      return data
    },

    submit() {
      this.$emit('loading')
      if (this.data) this.edit()
      else this.create()
    },

    async create() {
      const response = await axios.post('https://dev.moydomonline.ru/api/appeals/v1.0/appeals/', this.payload(), {
        headers: { 'Authorization' : `Token ${this.key}` }
      })
      if (response.status === 201) this.$emit('close', { message: 'Новая заявка опубликована!', warning: false })
    },

    async edit() {
      const response = await axios.patch(`https://dev.moydomonline.ru/api/appeals/v1.0/appeals/${this.data.id}/`, this.payload(true), {
        headers: { 'Authorization' : `Token ${this.key}` }
      })
      if (response.status === 200) this.$emit('close', { message: 'Заявка отредактирована!', warning: false })
    }
  }
}
</script>

<style lang="scss" scoped>
$green: rgb(66, 177, 66);
$green-light: rgba(66, 177, 66, 0.3);

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #00000030;
  display: flex;
}

.card {
  width: 800px;
  margin: auto;
  padding: 30px;
  border-radius: 8px;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  gap: 40px;

  .row {
    display: flex;
    gap: 20px

  }  

  .header {
    justify-content: space-between;
  }

  .footer button {
    margin-left: auto;
  }
}

</style>


