import React from "react"
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native"
import { Entypo } from "@expo/vector-icons"
import { PRIVACY } from "../../constants/stringsConstants"
const ModalPrivacy = (props) => {
  return (
    <Modal animationType='fade' transparent={true} visible={props.modalVisible}>
      <View style={styles.centeredView}>
        <ScrollView contentContainerStyle={styles.modalView}>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-around",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Privacy Policy
              </Text>
            </View>

            <View>
              <TouchableOpacity
                onPress={() => {
                  props.setModalVisible(false)
                }}
              >
                <Entypo name='cross' size={32} color='green' />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.modalText}>
            Privacy Policy of Sari Square {"\n"} {"\n"}LLC Sari Square LLC
            operates the Garage Sales Map application, which provides the
            SERVICE. This page is used to inform application visitors regarding
            our policies with the collection, use, and disclosure of Personal
            Information if anyone decided to use our Service, the Garage Sales
            Map application. If you choose to use our Service, then you agree to
            the collection and use of information in relation with this policy.
            The Personal Information that we collect are used for providing and
            improving the Service. We will not use or share your information
            with anyone except as described in this Privacy Policy. {"\n"}
            {"\n"}Information Collection and Use {"\n"}
            {"\n"}For a better experience while using our Service, we may
            require you to provide us with certain personally identifiable
            information, including but not limited to your name, phone number,
            and postal address. The information that we collect will be used to
            contact or identify you. Log Data We want to inform you that
            whenever you visit our Service, we collect information that your
            browser sends to us that is called Log Data. This Log Data may
            include information such as your computer's Internet Protocol (“IP”)
            address, browser version, pages of our Service that you visit, the
            time and date of your visit, the time spent on those pages, and
            other statistics.{"\n"}
            {"\n"}Cookies{"\n"}
            {"\n"}Cookies are files with small amount of data that is commonly
            used an anonymous unique identifier. These are sent to your browser
            from the application that you visit and are stored on your
            computer's hard drive. Our application uses these “cookies” to
            collection information and to improve our Service. You have the
            option to either accept or refuse these cookies, and know when a
            cookie is being sent to your computer. If you choose to refuse our
            cookies, you may not be able to use some portions of our Service.
            {"\n"}
            {"\n"}Service Providers{"\n"}
            {"\n"}We may employ third-party companies and individuals due to the
            following reasons: To facilitate our Service; To provide the Service
            on our behalf; To perform Service-related services; or To assist us
            in analyzing how our Service is used. We want to inform our Service
            users that these third parties have access to your Personal
            Information. The reason is to perform the tasks assigned to them on
            our behalf. However, they are obligated not to disclose or use the
            information for any other purpose.{"\n"}
            {"\n"}Security{"\n"}
            {"\n"}We value your trust in providing us your Personal Information,
            thus we are striving to use commercially acceptable means of
            protecting it. But remember that no method of transmission over the
            internet, or method of electronic storage is 100% secure and
            reliable, and we cannot guarantee its absolute security. {"\n"}
            {"\n"}Links to Other Sites{"\n"}
            {"\n"}Our Service may contain links to other sites. If you click on
            a third-party link, you will be directed to that site. Note that
            these external sites are not operated by us. Therefore, we strongly
            advise you to review the Privacy Policy of these applications. We
            have no control over, and assume no responsibility for the content,
            privacy policies, or practices of any third-party sites or services.
            Children's Privacy Our Services do not address anyone under the age
            of 13. We do not knowingly collect personal identifiable information
            from children under 13. In the case we discover that a child under
            13 has provided us with personal information, we immediately delete
            this from our servers. If you are a parent or guardian and you are
            aware that your child has provided us with personal information,
            please contact us so that we will be able to do necessary actions.{" "}
            {"\n"}
            {"\n"}Changes to This Privacy Policy{"\n"}
            {"\n"}We may update our Privacy Policy from time to time. Thus, we
            advise you to review this page periodically for any changes. We will
            notify you of any changes by posting the new Privacy Policy{"\n"}
            on this page. These changes are effective immediately, after they
            are posted on this page. {"\n"}
            {"\n"}Contact{"\n"}
            {"\n"}Us If you have any questions or suggestions about our Privacy
            Policy, do not hesitate to contact us. You can reach us through the
            app or by emailing garagesalesmap1@gmail.com.
          </Text>
        </ScrollView>
      </View>
    </Modal>
  )
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    marginTop: 50,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    marginTop: 15,
    fontSize: 15,
    textAlign: "justify",
  },
})

export default ModalPrivacy
