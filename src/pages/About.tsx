import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Globe, Heart } from "lucide-react";
import logo from "@/assets/logo.png";

const About = () => {
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
      title: "Quality First",
      description: "Every product is carefully selected and tested for durability and authenticity."
    },
    {
      icon: Users,
      title: "Customer Centric",
      description: "Our customers are at the heart of everything we do. Your satisfaction is our priority."
    },
    {
      icon: Globe,
      title: "Traditional Values",
      description: "Preserving Indian cultural heritage through authentic brass and copper utensils."
    },
    {
      icon: Heart,
      title: "Family Business",
      description: "A legacy passed down through generations with the same commitment to excellence."
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
            About Shivpuriya Patra Bhandar
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Established in 1985 in the heart of Kalapipal, Madhya Pradesh, we've been serving 
            families with authentic brass, copper, and steel utensils for nearly four decades.
          </p>
        </section>

        {/* Story Section */}
        <section className="container mx-auto px-4 mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  What started as a small shop in Kalapipal has grown into a trusted name 
                  across Madhya Pradesh. Our founder's vision was simple: provide every 
                  household with quality utensils that combine traditional craftsmanship 
                  with modern functionality.
                </p>
                <p>
                  Today, we continue this legacy by offering an extensive range of products 
                  from authentic brass and copper cookware to contemporary kitchen appliances, 
                  lunch boxes, and water bottles. Each product reflects our commitment to 
                  quality and customer satisfaction.
                </p>
                <p>
                  Our deep roots in Indian culture and traditions guide us in selecting 
                  products that not only serve your daily needs but also connect you to 
                  our rich heritage.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">Why Choose Us?</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                  Authentic products sourced directly from trusted manufacturers
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                  Quality assurance with rigorous testing standards
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                  Competitive pricing without compromising on quality
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                  Excellent customer service and support
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                  Fast and reliable delivery across India
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
              <p className="text-xl text-muted-foreground">
                The principles that guide our business and relationships
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
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Journey</h2>
            <p className="text-xl text-muted-foreground">
              Key milestones in our growth story
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