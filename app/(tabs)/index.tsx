import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const BLUE = "#1E90FF";
const PURPLE = "#800080";

export default function Landing() {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={[styles.pill, styles.pillOutline]}>
            <Text style={[styles.pillText, { color: BLUE }]}>Our Team</Text>
          </TouchableOpacity>

          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <TouchableOpacity style={[styles.pill, styles.pillOutline]}>
            <Text style={[styles.pillText, { color: BLUE }]}>Contact Us</Text>
          </TouchableOpacity>
        </View>

        {/* Feature band with images */}
        <View style={styles.band}>
          <View style={styles.featuresRow}>
            <Feature
              label="Local Services"
              img={require("../../assets/images/local.png")}
            />
            <Feature
              label="Qualified Experts"
              img={require("../../assets/images/experts.png")}
            />
            <Feature
              label="Established Networks"
              img={require("../../assets/images/network.png")}
            />
            <Feature
              label="NDIS Registered"
              img={require("../../assets/images/ndis.png")}
            />
          </View>
        </View>

        {/* Headline */}
        <View style={styles.headlineWrap}>
          <Text style={styles.headline}>
            The ability to choose, the ability to change
          </Text>

        <View style={styles.factList}>
          <Text style={styles.fact}>Do you have an NDIS plan?</Text>
          <Text style={styles.fact}>Have you been funded for Support Coordination?</Text>
          <Text style={styles.fact}>Do you want an expert that can help you navigate NDIS?</Text>
          <Text style={styles.fact}>Do you want value for money?</Text>
        </View>

          <TouchableOpacity style={styles.cta}>
            <Text style={styles.ctaText}>Contact Us</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Floating purple help button */}
      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabText}>?</Text>
      </TouchableOpacity>
    </View>
  );
}

function Feature({ label, img }: { label: string; img: any }) {
  return (
    <View style={styles.feature}>
      {}
      <View style={styles.circle}>
        {}
        <Image source={img} style={styles.circleImg} />
      </View>
      <Text style={styles.featureText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 80,
  },

  header: {
  paddingTop: 12, 
  paddingBottom: 8,
  paddingHorizontal: 16,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
},
  pill: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  pillOutline: {
    borderWidth: 2,
    borderColor: BLUE,
    backgroundColor: "#fff",
  },
  pillText: {
    fontWeight: "700",
    fontSize: 12,
  },
  logo: {
    width: 200,
    height: 100,
    marginVertical: 10,
  },

  band: {
  backgroundColor: BLUE,
  paddingVertical: 40,  
  paddingHorizontal: 16, 
  marginTop: 16,        
},

feature: {
  width: "24%",          
  alignItems: "center",
},

featuresRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},

circle: {
  width: 64,             // ⬆ was 48
  height: 64,            // ⬆ was 48
  borderRadius: 32,
  backgroundColor: "#fff",
  overflow: "hidden",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 8,      
},
circleImg: {
  width: "100%",
  height: "100%",
  resizeMode: "cover",
},

featureText: {
  color: "#fff",
  fontSize: 12,          // ⬆ was 10
  fontWeight: "700",
  textAlign: "center",
},

  headlineWrap: {
    paddingHorizontal: 18,
    paddingTop: 20,
    alignItems: "center",
  },
  headline: {
    color: BLUE,
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
  },
  checklist: {
    marginTop: 14,
    alignSelf: "stretch",
  },
  checkRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 6,
    paddingHorizontal: 6,
  },
  tick: {
    color: BLUE,
    fontWeight: "900",
    marginRight: 8,
    lineHeight: 18,
  },
  checkText: {
    color: "#2f2f2f",
    fontSize: 13,
    flexShrink: 1,
  },

  cta: {
    marginTop: 16,
    backgroundColor: "#333",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  ctaText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },

  factList: {
  marginTop: 20,
  alignItems: "center", 
},

fact: {
  fontSize: 16,
  textAlign: "center",
  marginBottom: 8,
  color: "#333",
},

  fab: {
    position: "absolute",
    right: 18,
    bottom: 18,
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: PURPLE,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  fabText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
  },
});

