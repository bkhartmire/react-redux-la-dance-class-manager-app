require 'nokogiri'
require 'open-uri'
require_relative './dance_class.rb'

class DanceClassScraper
  #wrote all this code for Playground website. Unfortunately the schedule is rendered with JS, so cannot use Nokogriri to scrape. For now let's scrape Millenium then figure out if I can scrape JS elements later
  #def get__page
  #  doc = Nokogiri::HTML(open('https://www.playgroundla.dance/schedule/'))
  #end
#
#date is span.hc_date
#  def get_schedule
#    self.get__page.css("tr.schedule_header")
#  end

#  def make_dance_classes
#    self.get_schedule.each do |day_row|
#      date = day_row.css(".hc_date").text
#      row.css("tr").each do |class_row|
#        dance_class = DanceClass.new
#        dance_class.date = date
#        console.log('inside method')
        #there are two inner spans for start time and ending time. Do I need to break this up?
#        dance_class.time = class_row.css(".hc_time").text
#        dance_class.name = class_row.css(".classname").text
#        instructor_name = class_row.css(".trainer").text
#        class_instructor = Instructor.find_or_create_by(name: instructor_name)
#        dance_class.instructor_id = class_instructor.id
#        dance_class.save
#      end
#    end
#  end
  def get__page
    doc = Nokogiri::HTML(open('http://millenniumdancecomplex.com/schedule/'))
  end

#this only works for single class element on page, not all the others
  def make_first_item_dance_classes
    list = self.get__page.css(".first-table-item")
    time = list[0].text
    name = list[1].text
    instructor = Instructor.find_or_create_by(name: list[3].text)
    studio_id = Studio.find_by(name: 'Millennium Dance Complex').id
    #day??
    #check if this exact dance class already exists in the database
    if !DanceClass.find_by(name: name, instructor_id: instructor.id, time: time, studio_id: studio_id)
      dance_class = DanceClass.create(name: name, time: time, instructor_id: instructor.id, studio_id: studio_id)
    end
  end

  def make_dance_classes

    times = self.get__page.css(".pricing_table")[0]
    names = self.get__page.css(".pricing_table")[1]
    instructors = self.get__page.css(".pricing_table")[3]
    count = 0
    until count == times.length
      dance_class = DanceClass.create(
        name: names[count],
        studio_id: Studio.find_by(name: 'Millennium Dance Complex').id,
        time: times[count],
        instructor_id: Instructor.find_or_create_by(name: instructors[count])
      )
      count += 1
    end
  end

end
