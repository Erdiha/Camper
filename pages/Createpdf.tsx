import Navbar from '../components/Navbar';
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
  },
  section: {
    flexGrow: 1,
  },
});

function Createpdf() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-row w-screen">
        <section> </section>
      </div>
    </div>
  );
}

export default Createpdf;
