class DanceClassesController < ApplicationController
  def index
    #only scrape from millennium website once. check to see if there are already dance classes created from millennium website.
    if DanceClass.all.none?{|dance_class| dance_class.studio_id == Studio.find_by(name: 'Millennium Dance Complex').id}
      DanceClassScraper.new.make_dance_classes
    end
    classes = DanceClass.sort_chronologically
    #include associated instructor and studio in json object
    #going to have to reformat dance_class object to fit into calendar component...
    reformat_classes = classes.each do |dance_class|
      dance_class.reformat
    end

    render json: classes
  end

end
