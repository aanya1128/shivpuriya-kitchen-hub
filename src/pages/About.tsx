import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Globe, Heart } from "lucide-react";
import logo from "@/assets/logo.png";
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  
  const milestones = [
    { year: "1985", event: "Founded Shivpuriya Patra Bhandar in Kalapipal" },
    { year: "1995", event: "Expanded to serve 50+ villages in Madhya Pradesh" },
    { year: "2005", event: "Introduced modern kitchen appliances" },
    { year: "2015", event: "Launched online presence" },
    { year: "2023", event: "Serving 10,000+ happy customers" }
  ];

  const values = [
    {
      icon: Award,
      title: t('qualityFirst'),
      description: t('qualityDesc')
    },
    {
      icon: Users,
      title: t('customerCentric'),
      description: t('customerDesc')
    },
    {
      icon: Globe,
      title: t('traditionalValues'),
      description: t('traditionalDesc')
    },
    {
      icon: Heart,
      title: t('familyBusiness'),
      description: t('familyDesc')
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 text-center mb-16">
          <div className="flex justify-center mb-8">
            <img src={logo} alt="Shivpuriya Patra Bhandar" className="w-32 h-32 object-contain" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t('aboutTitle')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('aboutDescription')}
          </p>
        </section>

        {/* Story Section */}
        <section className="container mx-auto px-4 mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">{t('ourStory')}</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>{t('storyPara1')}</p>
                <p>{t('storyPara2')}</p>
                <p>{t('storyPara3')}</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">{t('whyChooseUs')}</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                  {t('whyPoint1')}
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                  {t('whyPoint2')}
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                  {t('whyPoint3')}
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                  {t('whyPoint4')}
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                  {t('whyPoint5')}
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">{t('ourValues')}</h2>
              <p className="text-xl text-muted-foreground">
                {t('valuesPrinciples')}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-elegant transition-shadow">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                      <value.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">{t('ourJourney')}</h2>
            <p className="text-xl text-muted-foreground">
              {t('journeyMilestones')}
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-primary"></div>
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center mb-8 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                  <div className="w-1/2 px-8">
                    <Card className={`${index % 2 === 0 ? 'ml-auto' : ''} max-w-md hover:shadow-elegant transition-shadow`}>
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-primary mb-2">{milestone.year}</div>
                        <p className="text-muted-foreground">{milestone.event}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="w-6 h-6 bg-primary rounded-full border-4 border-background shadow-lg z-10"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;