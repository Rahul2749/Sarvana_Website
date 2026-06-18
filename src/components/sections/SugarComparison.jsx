import { useRef } from 'react';
import { useScrollReveal } from '../../hooks/useGSAPAnimations';
import SectionTitle from '../ui/SectionTitle';
import './SugarComparison.css';

const SugarComparison = () => {
  const containerRef = useRef(null);
  useScrollReveal(containerRef);

  return (
    <section ref={containerRef} className="sugar-comparison section">
      <div className="container">
        <SectionTitle 
          subtitle="Mindful Sweetness"
          title="Thati Bellam vs. Refined White Sugar"
          description="A scientific breakdown of why traditional palm jaggery is the ultimate choice for your health."
          align="center"
        />

        <div className="comparison-table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th className="highlight-column">Thati Bellam (Palm Jaggery)</th>
                <th>Refined White Sugar</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="feature-name">Glycemic Index (GI)</td>
                <td className="highlight-column positive">
                  <strong>Low GI (~35)</strong>
                  <p>Slow absorption, prevents insulin spikes and sudden energy crashes.</p>
                </td>
                <td className="negative">
                  <strong>High GI (68 - 70)</strong>
                  <p>Rapid spike in blood sugar, leading to lethargy and fat storage.</p>
                </td>
              </tr>
              <tr>
                <td className="feature-name">Mineral Richness</td>
                <td className="highlight-column positive">
                  <strong>Abundant</strong>
                  <p>Packed with Iron, Potassium, Magnesium, Calcium, and Zinc.</p>
                </td>
                <td className="negative">
                  <strong>Zero (Empty Calories)</strong>
                  <p>Stripped of all vitamins and minerals during factory processing.</p>
                </td>
              </tr>
              <tr>
                <td className="feature-name">Chemical Processing</td>
                <td className="highlight-column positive">
                  <strong>100% Raw & Unrefined</strong>
                  <p>Simply boiled and solidified tree sap with zero chemical additives.</p>
                </td>
                <td className="negative">
                  <strong>Chemically Bleached</strong>
                  <p>Processed using Sulfur Dioxide, Phosphoric Acid, and Calcium Hydroxide.</p>
                </td>
              </tr>
              <tr>
                <td className="feature-name">Digestive Power</td>
                <td className="highlight-column positive">
                  <strong>Alkalizing & Cleansing</strong>
                  <p>Activates digestive enzymes, prevents acidity, and cleanses the respiratory tract.</p>
                </td>
                <td className="negative">
                  <strong>Acid-Forming</strong>
                  <p>Disrupts gut microbiome balance, causing bloating and inflammation.</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Highlight Card */}
        <div className="jaggery-highlight-card">
          <div className="highlight-card-icon">⚡</div>
          <div className="highlight-card-text">
            <h4>The Tapper's Golden Secret</h4>
            <p>
              Unlike cane jaggery, true palm jaggery (Thati Bellam) is alkalizing in nature, meaning it cools the body and neutralizes acid buildup. In traditional Siddha and Ayurveda medicine, it is recommended as a throat cleanser and immunity booster.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SugarComparison;
