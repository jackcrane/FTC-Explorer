import { StyleSheet } from "react-native"

export default StyleSheet.create({
  body:{
    backgroundColor:'white',
  },
  container:{
    marginTop:50,
    paddingTop:10,
    paddingBottom:20,
    minHeight:'90%'
  },
  containernotop:{
    paddingBottom:20,
    minHeight:'90%'
  },
  containerBody:{
    padding:24
  },
  titleContainer:{
    paddingBottom:30
  },
  title:{
    fontSize:40,
    fontWeight:'bold',
    color:'black'
  },
  subtitle:{
    fontSize:20,
    textTransform:'uppercase',
    fontWeight:'bold',
    color:'#808080'
  },
  titleUnderline:{
    backgroundColor:'#DA3152',
    height:10,
    width:'100%'
  },
  input:{
    // height:50,
    fontSize:20,
    color:'#808080',
    fontWeight:'bold',
    padding:10,
    marginTop:10,
    borderLeftColor:'#DA3152',
    borderLeftWidth:2,
    width:'100%',
    backgroundColor:'#F3F3F3'
  },
  inputSubtitle:{
    fontSize:10,
    fontWeight:'bold',
    color:'#808080'
  },
  tif:{
    color:'#808080',
    textAlign:'center',
    paddingTop:10,
    fontSize:18
  },
  eventContainer:{
    flexDirection:'row',
    alignItems:'center',
    flexWrap:'wrap',
  },
  eventName:{
    fontSize:18,
    paddingBottom:10,
    width:'90%',
    color:'black'
  },
  eventBullet:{
    height:10,
    width:10,
    backgroundColor:'#DA3152',
    borderRadius:5,
    marginRight:15
  },
  detailsContainer:{
    paddingBottom:20
  },
  detailsTitle:{
    fontSize:18,
    fontWeight:'bold',
    color:'#808080',
    textTransform:'uppercase'
  },
  detailsContent:{
    fontSize:28
  },
  debug:{
    backgroundColor:'red',
    color:'white'
  },
  teamNumber:{
    fontSize:24,
    paddingTop:10
  },
  oops:{
    fontSize:18,
    fontStyle:'italic'
  },
  supporting:{
    fontSize:16,
    color:'#808080'
  }
})
