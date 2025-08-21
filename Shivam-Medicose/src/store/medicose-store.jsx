import React, { createContext, useEffect, useState } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { focusFilter, focusToday, blurFilter, blurToday } from "./date-to-text";
import { FcExpired } from "react-icons/fc";
import { FaRupeeSign } from "react-icons/fa";
import { MdOutlineEventAvailable } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";
export const ContextObj = createContext();


const MedicoseProvider = ({ children }) => {
  const dispatch = useDispatch();

  // utils
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  function calculateTotalPrice(medicines) { return medicines.reduce((total, medicine) => total + medicine.mrp, 0).toFixed(2); }
  const generateBillNumber = () => {
    const prefix = 'SM2024';
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${prefix}${randomPart}`;
  };

  // flash for items
  const [flash, setFlash] = useState('');
  const handleCloseAlert = () => { setFlash(''); };

  // header
  const [isOpen, setIsOpen] = useState(false);
  const toggleCollapse = () => { setIsOpen(!isOpen); };

  // filter type
  const filterDatetype = useSelector(state => state.dateToText.filterDate);
  const handleInputFocusFilter = () => { dispatch(focusFilter()); };
  const handleInputBlurFilter = () => { dispatch(blurFilter()); };


  // Purchase tab
  // toggle
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setSelectedPurchase(null);
    setSelectedMedicine(null);
    setItemSale(null);
    setCustomerSale(null);
    setMedicineItemSale(null);
  };
  const handleShow = () => setShow(true);

  // toggle button
  const [expandedItem, setExpandedItem] = useState(null);
  const handleToggleCollapse = (itemId) => { setExpandedItem((prevItem) => (prevItem === itemId ? null : itemId)); };

  // today date type
  const today = useSelector(state => state.dateToText.today);
  const handleInputFocusToday = () => { dispatch(focusToday()); };
  const handleInputBlurToday = () => { dispatch(blurToday()); };

  // filter by date
  const [filterBatch, setFilterBatch] = useState(null);
  const [filteredDataPurchase, setFilteredDataPurchase] = useState([]);
  const handleFilterPurchase = (e) => {
    setFilterBatch(e.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      const allBatch = data.flatMap(item => item.medicine);
      try {
        const filtered = allBatch.filter(item => (
          item.batch.toLowerCase().startsWith(filterBatch.toLowerCase())
        ));
        setFilteredDataPurchase(filtered);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [filterBatch]);
  const handleCancelButtonBatch = () => {
    setFilterBatch(null);
    document.getElementById("filterBatch").value = "";
    setFilteredDataPurchase([]);
    toggleCollapse();
  }

  // handle add and remove row for purchase
  const [medicines, setMedicines] = useState([{ name: '', company: '', tab: '', units: '', packages: '', batch: '', rate: '', mrp: '', counter: '', expiry: '' }]);
  const handleAddRow = () => { setMedicines([...medicines, { name: '', company: '', tab: '', units: '', packages: '', batch: '', rate: '', mrp: '', counter: '', expiry: '' }]); };
  const handleRemoveRow = (index) => { const newMedicines = medicines.filter((_, i) => i !== index); setMedicines(newMedicines); };

  // show purchase data
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/purchases', {
          method: 'GET',
        });
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [flash]);


  // add purchase
  const handleAddHistoryApi = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const vendorName = formData.get('vendorName');
    const purchaseDate = formData.get('purchaseDate');
    const medicine = [];
    medicines.forEach((medicinee, index) => {
      const name = formData.get(`medicines[${index}].name`);
      const company = formData.get(`medicines[${index}].company`);
      const tab = formData.get(`medicines[${index}].tab`);
      const units = formData.get(`medicines[${index}].units`);
      const packages = formData.get(`medicines[${index}].packages`);
      const batch = formData.get(`medicines[${index}].batch`)
      const rate = formData.get(`medicines[${index}].rate`);
      const mrp = formData.get(`medicines[${index}].mrp`);
      const counter = formData.get(`medicines[${index}].mrp`);
      const expiry = formData.get(`medicines[${index}].expiry`);
      medicine.push({ name, company, tab, units, packages, batch, rate, mrp, counter, expiry });
    });
    const data = { vendorName, purchaseDate, medicine };
    try {
      const response = await fetch('http://localhost:5000/api/purchases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (responseData) {
        setFlash(responseData.message);
      }
      handleClose();
    } catch (error) {
      setFlash(responseData.message);
    }
  };

  // delete purchase
  const handleDeleteMedicine = async (purchaseId, medicineId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/purchases/${purchaseId}/medicines/${medicineId}`, {
        method: 'DELETE',
      });
      const responseData = await response.json();
      if (responseData) {
        setFlash(responseData.message);
      } else {
        console.error(`Failed to delete item with id ${id}. Status: ${response.status}`);
      }
    } catch (error) {
      console.error(`An error occurred while deleting the item: ${error}`);
    }
  };
  // edit purchase 
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const handleEditMedicine = (purchase, medicine) => {
    setSelectedPurchase(purchase);
    setSelectedMedicine(medicine);
    setMedicines([medicine]);
    handleShow();
  };
  const handleEditHistoryApi = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const purchaseId = formData.get('purchase_id');
    const vendorName = formData.get('vendorName');
    const purchaseDate = formData.get('purchaseDate');
    const medicine = [];
    medicines.forEach((_, index) => {
      const medicineId = formData.get(`medicines[${index}].medicine_id`);
      const name = formData.get(`medicines[${index}].name`);
      const company = formData.get(`medicines[${index}].company`);
      const tab = formData.get(`medicines[${index}].tab`);
      const units = formData.get(`medicines[${index}].units`);
      const packages = formData.get(`medicines[${index}].packages`);
      const batch = formData.get(`medicines[${index}].batch`)
      const rate = formData.get(`medicines[${index}].rate`);
      const mrp = formData.get(`medicines[${index}].mrp`);
      const counter = formData.get(`medicines[${index}].counter`);
      const expiry = formData.get(`medicines[${index}].expiry`);
      medicine.push({ _id: medicineId, name, company, tab, units, packages, batch, rate, mrp, counter, expiry });
    });
    const data = { vendorName, purchaseDate, medicine };
    try {
      const response = await fetch(`http://localhost:5000/api/purchases/${purchaseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (responseData) {
        setFlash(responseData.message);
      }
      handleClose();
    } catch (error) {
      setFlash(error);
    }
  };












  // medicine tab
  // filter medicine by name in medicine tab
  const [filterMedicine, setFilterMedicine] = useState("");
  const [filteredMedicine, setFilteredMedicine] = useState([]);
  const handleFilterChangeMedicine = (e) => {
    setFilterMedicine(e.target.value);
  };
  const allMedicines = data.flatMap(item => item.medicine);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const filtered = allMedicines.filter(item => (
          item.name.toLowerCase().startsWith(filterMedicine.toLowerCase())
        ));
        setFilteredMedicine(filtered);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [filterMedicine]);

  // delete medicine by id in medicine tab
  const handleDeleteMedicineMain = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/medicine/${id}`, {
        method: 'DELETE',
      });
      const responseData = await response.json();
      if (responseData) {
        setFlash(responseData.message);
      } else {
        console.error(`Failed to delete item with id ${id}. Status: ${response.status}`);
      }
    } catch (error) {
      console.error(`An error occurred while deleting the item: ${error}`);
    }
  }

















  // Sale tab
  // header and toggle
  const [expandedVendors, setExpandedVendors] = React.useState([]);
  const [expandedCustomers, setExpandedCustomers] = React.useState([]);
  const toggleVendorCollapse = (vendorId) => {
    setExpandedVendors(prevExpanded => prevExpanded.includes(vendorId) ? prevExpanded.filter(id => id !== vendorId) : [...prevExpanded, vendorId]);
  };
  const toggleCustomerCollapse = (customerId) => {
    setExpandedCustomers(prevExpanded => prevExpanded.includes(customerId) ? prevExpanded.filter(id => id !== customerId) : [...prevExpanded, customerId]);
  };
  const handleToggleCollapseSale = (id, type) => {
    if (type === "vendor") {
      toggleVendorCollapse(id);
    } else if (type === "customer") {
      toggleCustomerCollapse(id);
    }
  };

  // Show sale
  const [saleData, setSaleData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/sales/bills', {
          method: 'GET',
        });
        const responseData = await response.json();
        setSaleData(responseData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [flash]);

  // filter sale by customer name
  const [filterName, setFilterName] = useState(null);
  const [filterDataSale, setFilterDataSale] = useState([]);
  const handleFilterNameSale = (event) => {
    setFilterName(event.target.value);
  }
  useEffect(() => {
    const fetchData = async () => {
      const allSale = saleData.flatMap(item => item.customers);
      try {
        const filtered = allSale.filter(item => (
          item.customerName.toLowerCase().startsWith(filterName.toLowerCase())
        ));
        setFilterDataSale(filtered);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [filterName]);
  const handleCancelButton = () => {
    setFilterName(null);
    document.getElementById("filterName").value = "";
    setFilterDataSale([]);
    toggleCollapse();
  }

  // adding sale
  const handleSubmitSale = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const billNo = generateBillNumber();
      const customerName = formData.get("customerName");
      const doctorName = formData.get("doctorName");
      const todayDate = formData.get("todayDate");
      const medicinesData = [];
      medicines.forEach((medicine, index) => {
        medicinesData.push({
          typeofmedicine: formData.get(`medicinesSale[${index}].typeofmedicine`),
          name: formData.get(`medicinesSale[${index}].name`),
          batch: formData.get(`medicinesSale[${index}].batch`),
          company: formData.get(`medicinesSale[${index}].company`),
          tab: formData.get(`medicinesSale[${index}].tab`),
          units: formData.get(`medicinesSale[${index}].units`),
          mrp: formData.get(`medicinesSale[${index}].mrp`),
          expiry: formData.get(`medicinesSale[${index}].expiry`),
        });
      });
      const data = {
        todayDate,
        customers: [
          {
            billNo,
            customerName,
            doctorName,
            medicine: medicinesData,
          },
        ],
      };

      const response = await fetch("http://localhost:5000/api/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to add sale");
      }
      const responseData = await response.json();
      if (responseData) {
        setFlash(responseData.message);
      }
      handleClose();
    } catch (error) {
      console.error("Error adding sale:", error);
    }
  };

  // delete sale
  const handleDeleteMedicineSale = async (saleId, customerId, medicineId) => {
    console.log("id is", saleId, customerId, medicineId);
    try {
      const response = await fetch(`http://localhost:5000/api/sale/${saleId}/${customerId}/${medicineId}`, {
        method: 'DELETE',
      });
      const responseData = await response.json();
      if (responseData) {
        setFlash(responseData.message);
      } else {
        console.error(`Failed to delete item with id ${id}. Status: ${response.status}`);
      }
    } catch (error) {
      console.error(`An error occurred while deleting the item: ${error}`);
    }
  }
  // edit sale
  const [customerSale, setCustomerSale] = useState(null);
  const [medicineItemSale, setMedicineItemSale] = useState(null);
  const [itemSale, setItemSale] = useState(null);
  const [medicinesSale, setMedicinesSale] = useState([{ typeofmedicine: '', name: '', batch: '', company: '', tab: '', units: '', mrp: '', expiry: '' }]);
  const handleAddRowSale = () => { setMedicinesSale([...medicinesSale, { typeofmedicine: '', name: '', batch: '', company: '', tab: '', units: '', mrp: '', expiry: '' }]); };
  const handleRemoveRowSale = (index) => { const newMedicines = medicinesSale.filter((_, i) => i !== index); setMedicinesSale(newMedicines); };
  const handleEditMedicineSale = (item, customer, medicineItem) => {
    setItemSale(item);
    setCustomerSale(customer);
    setMedicineItemSale(medicineItem);
    setMedicinesSale([medicineItem]);
    handleShow();
  };
  const handleEditSubmitSale = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const billNo = generateBillNumber();
    const saleId = formData.get('sale_id');
    const customerId = formData.get('customer_id');
    const customerName = formData.get('customerName');
    const doctorName = formData.get('doctorName');
    const todayDate = formData.get('todayDate');
    const medicine = [];
    medicines.forEach((_, index) => {
      const medicineId = formData.get(`medicinesSale[${index}].medicine_id`);
      const typeofmedicine = formData.get(`medicinesSale[${index}].typeofmedicine`);
      const name = formData.get(`medicinesSale[${index}].name`);
      const batch = formData.get(`medicinesSale[${index}].batch`);
      const company = formData.get(`medicinesSale[${index}].company`);
      const tab = formData.get(`medicinesSale[${index}].tab`);
      const units = formData.get(`medicinesSale[${index}].units`);
      const mrp = formData.get(`medicinesSale[${index}].mrp`);
      const expiry = formData.get(`medicinesSale[${index}].expiry`);
      medicine.push({ _id: medicineId, typeofmedicine, name, batch, company, tab, units, mrp, expiry });
    });
    const data = { saleId, customerId, billNo, customerName, doctorName, todayDate, medicine };
    try {
      const response = await fetch(`http://localhost:5000/api/sales/${saleId}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (responseData) {
        setFlash(responseData.message);
      }
      handleClose();
    } catch (error) {
      setFlash(error);
    }
  }














  // dashboard
  // medicine total
  const total_med = allMedicines.length;

  //  medicine expiry
  const currentDate = new Date();
  const twoMonthsLater = new Date();
  twoMonthsLater.setMonth(currentDate.getMonth() + 2);
  const expiringMedicines = allMedicines.filter(medicine => {
    const expiryDate = new Date(medicine.expiry);
    return expiryDate <= twoMonthsLater || expiryDate <= currentDate;
  });

  // shortage medicine
  const threshold = 3;
  const shortageMedicines = allMedicines.filter(medicine => {
    return medicine.unitsLeft < threshold || medicine.packagesLeft < threshold;
  });

  // sale price 
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const todayDateString = currentDate.toISOString().split('T')[0];
  let totalMonthPrice = 0;
  let todaySalePrice = 0;
  saleData.forEach(record => {
    const recordDate = new Date(record.todayDate);
    const recordMonth = recordDate.getMonth();
    const recordYear = recordDate.getFullYear();
    const recordDateString = recordDate.toISOString().split('T')[0];

    record.customers.forEach(customer => {
      customer.medicine.forEach(medicine => {
        if (recordYear === currentYear && recordMonth === currentMonth) {
          totalMonthPrice += medicine.mrp;
        }
        if (recordDateString === todayDateString) {
          todaySalePrice += medicine.mrp;
        }
      });
    });
  });

  const cardsData = [
    {
      border: "border-warning",
      text: "text-warning",
      logo: <FcExpired />,
      title: expiringMedicines.length,
      body: "Medicines Expiry",
      footer: "View Detailed Report"
    },
    {
      border: "border-success",
      text: "text-success",
      logo: <FaRupeeSign />,
      title: `Rs. ${todaySalePrice}`,
      body: `Month: ${totalMonthPrice}`,
      footer: "View Detailed Report"
    },
    {
      border: "border-primary",
      text: "text-primary",
      logo: <MdOutlineEventAvailable />,
      title: total_med,
      body: "Medicines Available",
      footer: "View Detailed Report"
    },
    {
      border: "border-danger",
      text: "text-danger",
      logo: <IoIosWarning />,
      title: shortageMedicines.length,
      body: "Medicine Shortage",
      footer: "View Detailed Report"
    }
  ];

















  // request tab
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMedicineUser, setSelectedMedicineUser] = useState('');
  const [requestClick, setRequestClick] = useState(false);
  const handleRequestClick = () => {
    setShowModal(true);
    setRequestClick(true);
  }
  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);

    if (value) {
      const filteredSuggestions = allMedicines.filter((medicine) =>
        medicine.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions.length > 0 ? filteredSuggestions : [{ name: value }]);
    } else {
      setSuggestions([]);
    }
  };
  const handleSuggestionClick = (medicine) => {
    setSelectedMedicineUser(medicine);
    setShowModal(true);
    setSuggestions([]);
    setSearchTerm('');
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setRequestClick(false);
    setSelectedMedicineUser('');
  };
  const [showLoginModal, setshowLoginModal] = useState(false);
  const handleLoginModel = () => {
    setshowLoginModal(true);
  }
  const handleCloseLoginModal = () => {
    setshowLoginModal(false);
  }
  // show requsts
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/request', {
          method: 'GET',
        });
        const responseData = await response.json();
        setRequests(responseData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [flash]);
  // delete requests
  const handleDeleteRequest = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/request/${id}`, {
        method: 'DELETE',
      });
      const responseData = await response.json();
      if (responseData) {
        setFlash(responseData.message);
      } else {
        console.error(`Failed to delete item with id ${id}. Status: ${response.status}`);
      }
    } catch (error) {
      console.error(`An error occurred while deleting the item: ${error}`);
    }
  }
  // add requests
  const handleSubmitRequest = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const name = formData.get("name");
      const address = formData.get("address");
      const phoneNo = formData.get("phoneNo");
      const tab = formData.get("tab");
      const medName = formData.get("medName");
      const data = { name, address, phoneNo, tab, medName };
      const response = await fetch("http://localhost:5000/api/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      handleCloseModal();
      setFlash(responseData.message);
      alert(responseData.message);
    } catch (error) {
      console.error("Error adding request:", error);
    }
  }
  const handleSubmitRequestFile = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const response = await fetch('http://localhost:5000/api/requestMed', {
        method: 'POST',
        body: formData
      });
      const responseData = await response.json();
      setFlash(responseData.message)
      if (response.ok) {

        handleCloseModal();
        alert("Request sent successfully")

      }
    } catch (error) {
      console.error('Error signing up:', error);
      setError('Error signing up. Please try again.');
    }
  }


  // session maangement
  const [sessionCheck, setSessionCheck] = useState(null);
  useEffect(() => {
    setSessionCheck(sessionStorage.getItem('userId'));
  });




  return (
    <ContextObj.Provider value={{
      isOpen, setIsOpen, toggleCollapse, handleInputBlurFilter, handleInputFocusFilter, show, handleClose, handleShow, today, handleInputFocusToday, handleInputBlurToday, medicines, handleAddRow, handleRemoveRow, showLoginModal, handleLoginModel, handleCloseLoginModal,
      handleAddHistoryApi, flash, handleCloseAlert, data, formatDate, calculateTotalPrice, handleToggleCollapse, expandedItem, handleDeleteMedicine, handleEditMedicine, selectedPurchase, selectedMedicine, handleEditHistoryApi, filterDatetype, saleData, handleSubmitSale, handleToggleCollapseSale, expandedCustomers, expandedVendors, handleEditMedicineSale, handleFilterChangeMedicine, filteredMedicine, filterMedicine, handleDeleteMedicineMain, allMedicines, handleDeleteMedicineSale, customerSale, medicineItemSale, handleAddRowSale, handleRemoveRowSale, medicinesSale, itemSale, handleEditSubmitSale, handleFilterNameSale, filterDataSale, handleCancelButton,
      handleFilterPurchase, filteredDataPurchase, handleCancelButtonBatch, total_med, cardsData, handleSubmitRequest,
      searchTerm, suggestions, showModal, selectedMedicineUser, handleSearchChange, handleSuggestionClick, handleCloseModal, requests, handleDeleteRequest, requestClick, handleRequestClick, sessionCheck, handleSubmitRequestFile
    }}>
      {children}
    </ContextObj.Provider>
  );
};

export default MedicoseProvider;
