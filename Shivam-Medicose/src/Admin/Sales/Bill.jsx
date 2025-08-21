import React from 'react';
import { Page, Document, StyleSheet, Text, View } from '@react-pdf/renderer';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return date.toLocaleDateString('en-CA', options);
};

const borderColor = "#3778C2";
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
  },
  receipt: {
    width: '100%',
    border: `1px solid ${borderColor}`,
    borderRadius: 5,
    padding: 10,
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 12,
  },
  billDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  customerDetails: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tableContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderColor: borderColor,
  },
  container: {
    flexDirection: 'row',
    borderBottomColor: borderColor,
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 24,
    textAlign: 'center',
    fontStyle: 'bold',
    flexGrow: 1,
  },
  headerContainer: {
    backgroundColor: '#f0f0f0',
  },
  name: { width: "20%", borderRightWidth: 1, borderRightColor: borderColor },
  batch: { width: "15%", borderRightWidth: 1, borderRightColor: borderColor },
  company: { width: "15%", borderRightWidth: 1, borderRightColor: borderColor },
  tabs: { width: "15%", borderRightWidth: 1, borderRightColor: borderColor },
  units: { width: "10%", borderRightWidth: 1, borderRightColor: borderColor },
  mrp: { width: "10%", borderRightWidth: 1, borderRightColor: borderColor },
  expiry: { width: "15%" },

  total: { marginTop: 20, marginBottom: 20 },
  totalText: { fontWeight: 'bold' },
  footer: { textAlign: 'center', marginTop: 20 },
  footerTitle: { fontSize: 14, fontWeight: 'bold' },
});

const UserAddress = () => (
  <View style={styles.header}>
    <Text style={styles.headerTitle}>Shivam Medicose (D.L.No: N-0193 B/OB)</Text>
    <Text style={styles.headerText}>Bassai Road, Akoda (Near Neem ka ped)</Text>
    <Text style={styles.headerText}>Phone: +91-9896441684</Text>
  </View>
);

const CustomerDetails = ({ customer }) => (
  <>
    <View style={styles.billDetails}>
      <Text>Bill No: {customer.billNo}</Text>
      <Text>Date: {formatDate('2024-06-25')}</Text>
    </View>
    <View style={styles.customerDetails}>
      <Text>Name: {customer.customerName}</Text>
      <Text>Doctor: {customer.doctorName}</Text>
    </View>
  </>
);

const MedicineListTable = ({ medicineList }) => (
  <View>
    <View style={[styles.container, styles.headerContainer]}>
      <Text style={styles.name}>Medicine Name</Text>
      <Text style={styles.batch}>Batch</Text>
      <Text style={styles.company}>Company</Text>
      <Text style={styles.tabs}>Tablets/Units</Text>
      <Text style={styles.units}>Units</Text>
      <Text style={styles.mrp}>MRP</Text>
      <Text style={styles.expiry}>Expiry Date</Text>
    </View>
    {medicineList.map((item, index) => (
      <View style={styles.container} key={index}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.batch}>{item.batch}</Text>
        <Text style={styles.company}>{item.company}</Text>
        <Text style={styles.tabs}>{item.tab}</Text>
        <Text style={styles.units}>{item.units}</Text>
        <Text style={styles.mrp}>{item.mrp}</Text>
        <Text style={styles.expiry}>{formatDate(item.expiry)}</Text>
      </View>
    ))}
  </View>
);

const calculateTotal = (medicineList) => {
  return medicineList.reduce((total, medicine) => total + parseFloat(medicine.mrp), 0).toFixed(2);
};

const Total = ({ medicineList }) => (
  <View style={styles.total}>
    <Text style={styles.totalText}>Total Amount: ${calculateTotal(medicineList)}</Text>
  </View>
);

const Footer = () => (
  <View style={styles.footer}>
    <Text style={styles.footerTitle}>Thank you for your purchase!</Text>
    <Text>Get well soon!</Text>
  </View>
);

const Bill = ({ customer, medicineList }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.receipt}>
        <UserAddress />
        <CustomerDetails customer={customer} />
        <MedicineListTable medicineList={medicineList} />
        <Total medicineList={medicineList} />
        <Footer />
      </View>
    </Page>
  </Document>
);

export default Bill;
