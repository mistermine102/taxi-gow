import { View, Text, ScrollView } from 'react-native'
import { ScreenWrapper } from '../../components/base/base'
import { BaseTitle } from '../../components/base/base'

const PrivacyPolicyScreen = () => {
  return (
    <ScreenWrapper>
      <View className="mt-8 mb-4">
        <BaseTitle>Polityka Prywatności</BaseTitle>
      </View>
      <ScrollView>
        <Text className="text-xl font-semibold mb-2 text-darkGray">Administrator Danych</Text>
        <Text className="mb-2">Administratorem danych osobowych jest Szymon Jarosz, z siedzibą pod adresem: Borówkowa 9, Potaśnia 63-500.</Text>

        <Text className="text-xl font-semibold mb-2 text-darkGray">Jak zbieramy dane?</Text>
        <Text className="mb-2">1. W celu rejestracji konta użytkownik podaje adres email, hasło oraz numer telefonu.</Text>
        <Text className="mb-2">2. Podczas zamawiania usługi przewozu użytkownik ma możliwość podania lokalizacji urządzenia końcowego.</Text>
        <Text className="mb-2">3. Aplikacja pobiera lokalizację zamawiającego jedynie w momencie zamawiania usługi.</Text>

        <Text className="text-xl font-semibold mb-2 text-darkGray">Jak wykorzystujemy zebrane dane?</Text>
        <Text className="mb-2">1. Zebrane dane wykorzystywane są w celu realizacji usług świadczonych drogą elektroniczną.</Text>
        <Text className="mb-2">
          2. Informacje o numerze telefonu użytkownika oraz lokalizacji urządzenia przekazywane są podmiotowi wybranemu do zrealizowania usługi
          przewozu.
        </Text>
        <Text className="mb-2">
          3. W przypadku dokonania płatności za pośrednictwem aplikacji, adres email użytkownika zostanie przekazany do usługodawcy w zakresie
          realizacji płatności.
        </Text>

        <Text className="text-xl font-semibold mb-2 text-darkGray">Dostęp do danych oraz zabezpieczenia</Text>
        <Text className="mb-2">
          1. Administrator przetwarza dane osobowe zgodnie z przepisami Ustawy z dnia 10 maja 2018 r. o ochronie danych osobowych oraz Rozporządzeniem
          Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych
          osobowych (RODO).
        </Text>
        <Text className="mb-2">2. Dostęp do danych osobowych mają jedynie podmioty uprawnione przez administratora.</Text>
        <Text className="mb-2">
          3. Każdy użytkownik ma możliwość zmiany lub żądania usunięcia swoich danych poprzez kontakt z obsługą klienta aplikacji.
        </Text>

        <Text className="text-xl font-semibold mb-2 text-darkGray">Zmiany w polityce prywatności</Text>
        <Text className="mb-2">
          Administrator zastrzega sobie prawo do wprowadzania zmian w polityce prywatności w odpowiedzi na zmiany w przepisach prawa, wymagania
          rynkowe lub rozwój usług. O wszelkich istotnych zmianach użytkownicy będą informowani za pośrednictwem ogłoszenia w aplikacji lub poprzez
          wiadomości e-mail.
        </Text>
      </ScrollView>
    </ScreenWrapper>
  )
}

export default PrivacyPolicyScreen
