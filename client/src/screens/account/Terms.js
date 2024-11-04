import { View, ScrollView, Text } from 'react-native'
import { BaseTitle, ScreenWrapper } from '../../components/base/base'

const Terms = () => {
  return (
    <ScreenWrapper>
      <View className="mt-8 mb-4">
        <BaseTitle>Regulamin</BaseTitle>
      </View>
      <ScrollView>
        <Text className="text-xl font-semibold mb-2 text-darkGray">I. Definicje</Text>
        <Text className=" mb-2">
          1. Regulamin – niniejszy dokument, określający zasady korzystania z aplikacji mobilnej Taxi Gow, dostępnej na urządzeniach mobilnych.
        </Text>
        <Text className=" mb-2">
          2. Aplikacja – oprogramowanie dostępne na urządzenia mobilne, stworzone w celu umożliwienia korzystania z usług przewozu pasażerskiego.
        </Text>
        <Text className=" mb-2">
          3. Taxi Gow – firma świadcząca usługi przewozu pasażerskiego, której działalność jest obsługiwana za pośrednictwem aplikacji.
        </Text>
        <Text className=" mb-2">4. Usługodawca – Artur Baskevych z siedzibą w Rynek 5/9, Kępno, 63-500; NIP: 6192044314; REGON: 528639101</Text>
        <Text className=" mb-2">
          5. Pasażer – każda osoba fizyczna, która korzysta z aplikacji w celu zamówienia usług przewozowych, założenia konta lub przeglądania ofert
          dostępnych w aplikacji.
        </Text>
        <Text className="text-xl font-semibold mb-2 text-darkGray">II. Ogólne Uwagi</Text>
        <Text className=" mb-2">
          1. Pasażer, korzystając z aplikacji, ma możliwość zamówienia przejazdu poprzez wskazanie punktu odbioru oraz punktu docelowego. Wybór metody
          płatności oraz potwierdzenie zamówienia oznacza wyrażenie woli zawarcia umowy przewozu. Kierowca może następnie przyjąć przejazd poprzez
          naciśnięcie przycisku „Rozpocznij”. W chwili przyjęcia zlecenia przez kierowcę, aplikacja udostępnia mu numer telefonu pasażera, wyłącznie w
          celu umożliwienia realizacji przejazdu. Kierowca, który zaakceptował zlecenie, jest zobowiązany stawić się na miejscu wskazanym przez
          pasażera.
        </Text>
        <Text className=" mb-2">
          2. Odinstalowanie aplikacji z urządzenia mobilnego pasażera nie jest równoznaczne z usunięciem jego konta użytkownika. Aby trwale usunąć
          swoje konto, pasażer powinien skontaktować się z obsługą klienta.
        </Text>
        <Text className=" mb-2">
          3. Aplikacja może być wykorzystywana wyłącznie do celów prywatnych, w zakresie zamawiania usług przewozowych. Zabrania się korzystania z
          aplikacji w celach komercyjnych.
        </Text>
        <Text className=" mb-2">
          4. Korzystanie z aplikacji jest dozwolone jedynie w sposób zgodny z postanowieniami niniejszego regulaminu. Pasażer zobowiązuje się do
          przestrzegania wszystkich zasad i ograniczeń określonych przez Taxi Gow.
        </Text>
        <Text className=" mb-2">
          5. Usługodawca świadczy usługi drogą elektroniczną zgodnie z przepisami ustawy z dnia 18 lipca 2002 r. o świadczeniu usług drogą
          elektroniczną. Korzystanie z aplikacji oznacza akceptację warunków regulaminu oraz zasad świadczenia usług drogą elektroniczną.
        </Text>
        <Text className="text-xl font-semibold mb-2 text-darkGray">III. Dostępność Aplikacji</Text>
        <Text className=" mb-2">
          1. Taxi Gow dokłada wszelkich starań, aby aplikacja była dostępna dla pasażerów przez całą dobę, siedem dni w tygodniu. W przypadku
          wystąpienia awarii lub przerw technicznych, firma będzie podejmować działania mające na celu jak najszybsze przywrócenie jej pełnej
          funkcjonalności.
        </Text>
        <Text className=" mb-2">
          2. Pasażer nie ma prawa do roszczeń odszkodowawczych związanych z przerwami w działaniu aplikacji, które mogą wynikać z konieczności
          przeprowadzania prac konserwacyjnych, awarii technicznych lub innych niezależnych od firmy okoliczności.
        </Text>
        <Text className=" mb-2">
          3. Taxi Gow zastrzega sobie prawo do wprowadzania zmian w aplikacji, zarówno w zakresie funkcjonalności, jak i wyglądu interfejsu. Zmiany te
          mogą być wprowadzane bez wcześniejszego powiadomienia pasażerów.
        </Text>
        <Text className=" mb-2">
          4. Firma ma prawo do tymczasowego zawieszenia działania aplikacji, w tym świadczenia usług przewozowych, bez konieczności indywidualnego
          informowania pasażerów o przyczynach takiej decyzji.
        </Text>
        <Text className="text-xl font-semibold mb-2 text-darkGray">IV. Opłaty i Płatności</Text>
        <Text className=" mb-2">1. Pasażerowie nie ponoszą żadnych opłat za dostęp do rejestracji konta oraz przeglądania ofert.</Text>
        <Text className=" mb-2">
          2. Pasażer może dokonać opłaty za usługę przewozu bezpośrednio za pośrednictwem aplikacji, zgodnie z wybraną formą płatności dostępną w
          aplikacji.
        </Text>
        <Text className=" mb-2">3. Rozliczenie za wykonane usługi przewozu następuje bezpośrednio pomiędzy pasażerem a usługodawcą.</Text>
        <Text className=" mb-2">
          4. Czas oczekiwania na pasażera oraz konsekwencje jego przekroczenia są określane zgodnie z obowiązującym cennikiem, dostępnym w aplikacji.
        </Text>
        <Text className=" mb-2">
          5. Po dokonaniu płatności, pasażer otrzymuje potwierdzenie transakcji na adres e-mail podany podczas rejestracji.
        </Text>
        <Text className="text-xl font-semibold mb-2 text-darkGray">V. Ogólne Prawa i Obowiązki Pasażera</Text>
        <Text className=" mb-2">
          1. Pasażer musi potwierdzić zaznajomienie się z niniejszym regulaminem, który jest dostępny w aplikacji przed rozpoczęciem korzystania z
          usług.
        </Text>
        <Text className=" mb-2">
          2. Korzystanie z aplikacji wymaga założenia konta użytkownika, co wiąże się z koniecznością podania adresu e-mail, hasła oraz numeru
          telefonu.
        </Text>
        <Text className=" mb-2">3. Pasażer zobowiązuje się do podawania prawdziwych danych podczas rejestracji i korzystania z aplikacji.</Text>
        <Text className=" mb-2">
          4. Pasażer ma prawo do aktualizacji oraz usunięcia swoich danych osobowych w dowolnym momencie, kontaktując się z obłsugą klienta.
        </Text>
        <Text className=" mb-2">
          5. Zabronione jest kopiowanie, modyfikowanie, rozpowszechnianie oraz reprodukowanie oprogramowania aplikacji bez zgody właściciela.
        </Text>
        <Text className=" mb-2">6. Pasażer jest zobowiązany do dbania o poufność swojego konta, w tym hasła i innych danych logowania.</Text>
        <Text className=" mb-2">
          7. Taxi Gow może zawiesić konto pasażera w przypadkach naruszenia regulaminu, nieprawidłowego korzystania z aplikacji lub innych działań
          sprzecznych z polityką firmy.
        </Text>
        <Text className=" mb-2">8. Pasażer nie ma prawa do roszczeń związanych z brakiem stałego dostępu do aplikacji.</Text>
        <Text className=" mb-2">
          9. Pasażer odpowiada za zabezpieczenie danych na swoim urządzeniu mobilnym. Taxi Gow nie ponosi odpowiedzialności za utratę danych
          spowodowaną przez niewłaściwe zabezpieczenie urządzenia.
        </Text>
        <Text className=" mb-2">
          10. W przypadku gdy przejazd nie został rozpoczęty, pasażer może go anulować poprzez kontakt telefoniczny z kierowcą.
        </Text>
        <Text className="text-xl font-semibold mb-2 text-darkGray">VI. Reklamacje</Text>
        <Text className=" mb-2">
          Pasażer ma prawo do składania reklamacji dotyczących funkcjonowania aplikacji oraz świadczonych usług przewozowych. Reklamacje powinny być
          zgłaszane w ciągu 14 dni od daty wystąpienia zdarzenia, które stało się podstawą reklamacji. W reklamacji należy podać dane pasażera oraz
          opis zdarzenia.
        </Text>
        <Text className="text-xl font-semibold mb-2 text-darkGray">VII. Odpowiedzialność Firmy</Text>
        <Text className=" mb-2">
          1. Taxi Gow nie bierze odpowiedzialności za dokładność, kompletność oraz aktualność danych zawartych w aplikacji.
        </Text>
        <Text className=" mb-2">
          2. Taxi Gow nie ponosi odpowiedzialności za szkody powstałe w wyniku wprowadzenia do aplikacji danych fałszywych, niepełnych lub
          niejednoznacznych przez pasażerów.
        </Text>
        <Text className=" mb-2">3. Taxi Gow nie gwarantuje stałej dostępności podmiotów uprawnionych do wykonywania usług przewozu.</Text>
        <Text className="text-xl font-semibold mb-2 text-darkGray">VIII. Postanowienia Końcowe</Text>
        <Text className=" mb-2">
          1. Firma zastrzega sobie prawo do zmiany regulaminu. Umowy zawarte przed aktualizacją regulaminu są realizowane na podstawie regulaminu
          obowiązującego w dniu zawarcia umowy.
        </Text>
        <Text className=" mb-2">2. Prawem właściwym dla stosowania regulaminu jest prawo polskie.</Text>
        <Text className=" mb-2">3. Regulamin wchodzi w życie z dniem xxxx.</Text>
      </ScrollView>
    </ScreenWrapper>
  )
}

export default Terms
