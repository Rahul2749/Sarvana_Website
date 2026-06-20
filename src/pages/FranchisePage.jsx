import Franchise from '../components/sections/Franchise';
import ProcessJourney from '../components/sections/ProcessJourney';
import OutletOptions from '../components/sections/OutletOptions';
import InvestmentProcess from '../components/sections/InvestmentProcess';

const FranchisePage = () => {
  return (
    <div className="page franchise-page" style={{ paddingTop: '80px', backgroundColor: 'var(--color-surface)' }}>
      <Franchise />
      <ProcessJourney />
      <OutletOptions />
      <InvestmentProcess />
    </div>
  );
};

export default FranchisePage;
