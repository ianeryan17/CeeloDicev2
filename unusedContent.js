// import React from 'react';
// import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, Button } from 'react-native';
// import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions } from 'react-native/Libraries/NewAppScreen';

// type SectionProps = {
//   title: string;
// };

// function Section({ title, children }: React.PropsWithChildren<SectionProps>): React.ReactElement {
//   const isDarkMode = useColorScheme() === 'dark';
//   const sectionColor = isDarkMode ? Colors.light : Colors.dark;
//   return (
//     <View style={styles.sectionContainer}>
//       <Text style={[styles.sectionTitle, { color: isDarkMode ? Colors.white : Colors.black }]}>{title}</Text>
//       <Text style={[styles.sectionDescription, { color: sectionColor }]}>{children}</Text>
//     </View>
//   );
// }

// function App(): React.ReactElement {
//   const isDarkMode = useColorScheme() === 'dark';
//   const backgroundColor = isDarkMode ? Colors.darker : Colors.lighter;

//   return (
//     <SafeAreaView style={[styles.safeAreaView, { backgroundColor }]}>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ backgroundColor }}>
//         <Header />
//         <View style={[styles.body, { backgroundColor }]}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.tsx</Text> to change this screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//           <View style={styles.buttonContainer}>
//             <Button
//               title="Press Me"
//               onPress={() => {
//                 console.log('Button Pressed');
//               }}
//             />
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeAreaView: {
//     flex: 1,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   buttonContainer: {
//     marginVertical: 20,
//     alignItems: 'center',
//   },
// });
