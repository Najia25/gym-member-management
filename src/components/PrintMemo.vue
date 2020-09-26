<template>
  <v-btn
    color='primary'
    small
    outlined
    @click='printMemo'
  >
    Print
  </v-btn>
</template>

<script>
import JsPDF from 'jspdf'
export default {
  name: 'print-memo',
  props: ['item'],
  data () {
    return {
      date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
    }
  },
  // computed: {
  //   member_id () {
  //     if (this.item.member_id) {
  //       return this.item.member_id
  //     } else {
  //       return this.item.id
  //     }
  //   }
  // },
  methods: {
    printMemo () {
      const doc = new JsPDF()
      doc.rect(5, 10, 100, 80)
      doc.setFontSize(8)
      doc.text('Office copy', 7, 13)
      doc.text(`${this.item.id}`, 85, 13)
      doc.text(`${this.item.id}`, 85 + 104, 13)
      doc.setFontSize(10)
      doc.setFont('helvetica', 'bold')
      doc.text('Iron Warriors Gym', 55, 15, null, null, 'center')
      doc.setFontSize(8)
      doc.setFont('helvetica', 'normal')
      doc.text('Ambarkhana Point, Sylhet. Contact number: 01312-321456', 55, 19, null, null, 'center')

      // horizontal lines
      doc.rect(5, 21, 100, 32)
      doc.rect(5, 29, 100, 16)
      doc.line(5, 37, 105, 37)

      doc.line(5, 70, 105, 70)
      doc.line(12, 83, 62, 83)
      doc.line(67, 80, 105, 80)

      // Vertical lines
      doc.line(68, 21, 68, 29)
      doc.line(45, 29, 45, 37)
      doc.line(57, 37, 57, 45)
      doc.line(20, 45, 20, 53)
      doc.line(67, 45, 67, 53)
      doc.line(67, 70, 67, 90)

      doc.text(`Name: ${this.item.name}`, 6, 26)
      doc.text(`Date: ${this.item.reg_date ? this.item.reg_date : this.date}`, 69, 26) // system date here
      doc.text(`ID: ${this.item.member_id ? this.item.member_id : this.item.id}`, 6, 34)
      doc.text(`Contact: ${this.item.contact}`, 46, 34)
      doc.text(`Monthly Fee Paid Date: ${this.item.paid_date ? this.item.paid_date : '---'}`, 6, 42)
      doc.text(`Expiry Date: ${this.item.expire_date ? this.item.expire_date : '---'}`, 58, 42)
      doc.text('No.', 8, 50)
      doc.text('1.', 8, 58)
      doc.text('Description', 25, 50)
      doc.text(`${this.item.description ? this.item.description : 'Admission Fee'}`, 25, 58)
      doc.text('Amount', 70, 50)
      doc.text(`${this.item.reg_amount ? this.item.reg_amount : this.item.amount}`, 75, 58)
      doc.text('Authorized Signature', 25, 88)
      doc.text(`Paid: ${this.item.reg_amount ? this.item.reg_amount : this.item.amount}`, 68, 75)
      // doc.text('Due: ---', 68, 81)
      doc.text(`Total: ${this.item.reg_amount ? this.item.reg_amount : this.item.amount}`

        , 68, 87)

      doc.rect(109, 10, 100, 80)
      doc.setFontSize(8)
      doc.text('Customer copy', 7 + 104, 13)
      doc.setFontSize(10)
      doc.setFont('helvetica', 'bold')
      doc.text('Iron Warriors Gym', 55 + 104, 15, null, null, 'center')
      doc.setFontSize(8)
      doc.setFont('helvetica', 'normal')
      doc.text('Ambarkhana Point, Sylhet. Contact number: 01312-321456', 55 + 104, 19, null, null, 'center')

      // horizontal lines
      doc.rect(5 + 104, 21, 100, 32)
      doc.rect(5 + 104, 29, 100, 16)
      doc.line(5 + 104, 37, 105 + 104, 37)

      doc.line(5 + 104, 70, 105 + 104, 70)
      doc.line(12 + 104, 83, 62 + 104, 83)
      doc.line(67 + 104, 80, 105 + 104, 80)

      // Vertical lines
      doc.line(68 + 104, 21, 68 + 104, 29)
      doc.line(45 + 104, 29, 45 + 104, 37)
      doc.line(57 + 104, 37, 57 + 104, 45)
      doc.line(20 + 104, 45, 20 + 104, 53)
      doc.line(67 + 104, 45, 67 + 104, 53)
      doc.line(67 + 104, 70, 67 + 104, 90)

      doc.text(`Name: ${this.item.name}`, 6 + 104, 26)
      doc.text(`Date: ${this.item.reg_date ? this.item.reg_date : this.date}`, 69 + 104, 26)
      doc.text(`ID: ${this.item.member_id ? this.item.member_id : this.item.id}`, 6 + 104, 34)
      doc.text(`Contact: ${this.item.contact}`, 46 + 104, 34)
      doc.text(`Monthly Fee Paid Date: ${this.item.paid_date ? this.item.paid_date : '---'}`, 6 + 104, 42)
      doc.text(`Expiry Date: ${this.item.expire_date ? this.item.expire_date : '---'}`, 58 + 104, 42)
      doc.text('No.', 8 + 104, 50)
      doc.text('1.', 8 + 104, 58)
      doc.text('Description', 25 + 104, 50)
      doc.text(`${this.item.description ? this.item.description : 'Admission Fee'}`, 25 + 104, 58)
      doc.text('Amount', 70 + 104, 50)
      doc.text(`${this.item.reg_amount ? this.item.reg_amount : this.item.amount}`, 75 + 104, 58)
      doc.text('Authorized Signature', 25 + 104, 88)
      doc.text(`Paid: ${this.item.reg_amount ? this.item.reg_amount : this.item.amount}`, 68 + 104, 75)
      doc.text(`Total: ${this.item.reg_amount ? this.item.reg_amount : this.item.amount}`, 68 + 104, 87)
      doc.autoPrint()
      window.open(doc.output('bloburl'), '_blank')
    }
  }
}
</script>
