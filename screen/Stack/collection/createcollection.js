import { useEffect, useState } from "react";
import { View, Text, StyleSheet,TextInput, TouchableOpacity,Dropdown  } from "react-native";
import { GlobalStyle } from "../../../constants/globalstyle";
import { insertCollection } from "../../../utils/collection_controller";
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-native-date-picker';
import { getFullDate, GetDateCustom } from "../../../constants/helper";
import CustomSelect from '../../../components/customSelect';
import { useIsFocused } from "@react-navigation/native";
import { fetchMember } from "../../../utils/members_controller";

const reviewSchema = yup.object({
  name: yup.string().required().min(2).max(50),
  amount: yup.number().required().min(2).max(50000000),
});



const CreateMemberCollection = ({navigation, route}) => {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [mid, setMember] = useState("");
    const [allMember, setAllMember] = useState([]);

    const [admissiondate, setAdmissionDate] = useState(new Date())
    const [openAdmission, setOpenAdmission] = useState(false)
    const useFocused = useIsFocused();
    
    async function saveItem(values){
      await insertCollection({values, amount, mid});
       navigation.goBack();
    }

    let initialdata = {
      name:"",
      amount:"",
      member: "",
      date: ""
    }

    async function getData(){
      const data = await fetchMember();
      setAllMember(data);
      console.log(data);
    }

    useEffect(() => {
        navigation.setOptions({
          title: "Add member Collection"
        });
        
        console.log('rendured');
        if(useFocused){
          getData();
        }
        
    },[useFocused])




    return(
        <View style={styles.container}>

        <Formik
            initialValues={initialdata}
            ini
            validationSchema={reviewSchema}
            onSubmit={ async (values, action) =>{
              console.log(values)
              await insertCollection({title: values.name, amount: values.amount, mid: values.member});
              navigation.goBack();
            }}
          >

            {(props, setFieldValue) =>(
            <View>
              <Text style={styles.text}>Name </Text>
              <TextInput 
                  placeholder='Name' style={styles.input}
                  onChangeText={props.handleChange('name')}
                  value={props.values.name}/>
              <Text style={styles.errorText}>{props.touched.name && props.errors.name}</Text>


              <Text style={styles.text}>Amount </Text>
              <TextInput 
                  placeholder='Amount' style={styles.input}
                  onChangeText={props.handleChange('amount')}
                  value={props.values.amount}
                  keyboardType='numeric'
                  />
              <Text style={styles.errorText}>{props.touched.amount && props.errors.amount}</Text>

                        
              <View>
                <>
                  <DatePicker
                    modal mode='date' open={openAdmission} date={admissiondate}
                    onConfirm={(date) => {
                      setOpenAdmission(false)
                      setAdmissionDate(date)
                      console.log("date string :" + date.getDate());
                      props.values.admitiondate = getFullDate(admissiondate);
                    }}
                    onCancel={() => {
                      setOpenAdmission(false)
                    }}
                    />
                </>
              </View>
              <View style={styles.monthDateHolder}>
                      <GetDateCustom setOpen={setOpenAdmission} date={admissiondate ? getFullDate(admissiondate) : 'Day'} type={'Admission Date'} />
              </View>
              <Text style={styles.errorText}>{props.touched.admitiondate && props.errors.admitiondate}</Text>

              <Text style={styles.text}>Select Member </Text>
              <CustomSelect label={"Member"} 
                planList={allMember} 
                selecteds={(val) => props.values.member = val}
                onChangeText = {props.handleChange("member")}
                />
                <Text style={styles.errorText}>{props.touched.member && props.errors.member}</Text>
              
              <TouchableOpacity style={styles.btn} onPress={props.handleSubmit}>
                  <Text style={styles.btntext}>Save</Text>
              </TouchableOpacity>
              </View>
            )}
            </Formik>
        </View>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginTop: 8,
    marginBottom: 0
  },
  btn: {
    backgroundColor: GlobalStyle.colors.primary300,
    alignItems: 'center',
    borderRadius: 8, 
    padding: 10
  },
  btntext: {
    color: GlobalStyle.colors.whitecolor
  },
  errorText: {
    color: '#f00', 
    fontWeight: 'bold',
    marginTop: 0,
    marginBottom: 0
  },
  
});


export default CreateMemberCollection;